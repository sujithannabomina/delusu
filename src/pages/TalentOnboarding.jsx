// FILE: TalentOnboarding.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\TalentOnboarding.jsx
// PURPOSE: 3-step talent profile setup wizard
//   Step 1: Basic info (name, DOB, gender, phone, city, state)
//   Step 2: Physical attributes + skills + languages + experience
//   Step 3: Portfolio photos (up to 10) + bio + social links
// NOTE: Category selection is NOT here — it unlocks only after payment (Phase 4)
 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTalentProfile, completeOnboarding } from '../firebase/firestoreHelpers';
import { uploadPhoto } from '../firebase/storageHelpers';
import {
  GENDERS, HEIGHTS, WEIGHT_RANGES, BODY_TYPES, SKIN_TONES,
  HAIR_COLORS, EYE_COLORS, ETHNICITIES, SKILLS, LANGUAGES,
  EXPERIENCE_LEVELS, INDIAN_STATES
} from '../utils/constants';
import './Onboarding.css';
 
export default function TalentOnboarding({ user, onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
 
  // Step 1 fields
  const [basic, setBasic] = useState({
    fullName: user?.displayName || '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    city: '',
    state: '',
  });
 
  // Step 2 fields
  const [attrs, setAttrs] = useState({
    height: '', weightRange: '', bodyType: '', skinTone: '',
    hairColor: '', eyeColor: '', ethnicity: '',
    skills: [], languages: [], experience: '',
  });
 
  // Step 3 fields
  const [bio, setBio] = useState('');
  const [instagramURL, setInstagramURL] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const [photoFiles, setPhotoFiles] = useState([]); // File objects
  const [photoPreviews, setPhotoPreviews] = useState([]); // preview URLs
  const [uploadProgress, setUploadProgress] = useState('');
 
  // Minor check
  const isMinor = () => {
    if (!basic.dateOfBirth) return false;
    const dob = new Date(basic.dateOfBirth);
    const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    return age < 18;
  };
 
  // Step 1 fields for minors
  const [parentName, setParentName] = useState('');
  const [parentRelation, setParentRelation] = useState('');
 
  const updateBasic = (field, value) => setBasic(prev => ({ ...prev, [field]: value }));
  const updateAttrs = (field, value) => setAttrs(prev => ({ ...prev, [field]: value }));
 
  const toggleArrayItem = (field, item) => {
    setAttrs(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(x => x !== item)
        : [...prev[field], item]
    }));
  };
 
  // Photo handling
  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 10 - photoFiles.length;
    const toAdd = files.slice(0, remaining);
 
    for (const file of toAdd) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Each photo must be under 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only JPG and PNG files are allowed');
        return;
      }
    }
 
    setPhotoFiles(prev => [...prev, ...toAdd]);
    setPhotoPreviews(prev => [...prev, ...toAdd.map(f => URL.createObjectURL(f))]);
    setError('');
  };
 
  const removePhoto = (index) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  };
 
  // Validation per step
  const validateStep1 = () => {
    if (!basic.fullName.trim()) return 'Full name is required';
    if (!basic.dateOfBirth) return 'Date of birth is required';
    if (!basic.gender) return 'Gender is required';
    if (!basic.phone.trim() || basic.phone.replace(/\D/g, '').length < 10) return 'Valid phone number is required';
    if (!basic.city.trim()) return 'City is required';
    if (!basic.state) return 'State is required';
    if (isMinor() && !parentName.trim()) return 'Parent/guardian name is required for minors';
    if (isMinor() && !parentRelation) return 'Parent/guardian relationship is required for minors';
    return null;
  };
 
  const validateStep2 = () => {
    if (!attrs.height) return 'Height is required';
    if (!attrs.bodyType) return 'Body type is required';
    if (!attrs.skinTone) return 'Skin tone is required';
    if (!attrs.hairColor) return 'Hair color is required';
    if (!attrs.eyeColor) return 'Eye color is required';
    return null;
  };
 
  const validateStep3 = () => {
    if (photoFiles.length === 0) return 'Please upload at least 1 photo';
    return null;
  };
 
  const nextStep = () => {
    setError('');
    if (step === 1) {
      const err = validateStep1();
      if (err) return setError(err);
    }
    if (step === 2) {
      const err = validateStep2();
      if (err) return setError(err);
    }
    setStep(prev => prev + 1);
  };
 
  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };
 
  // Final submit
  const handleSubmit = async () => {
    setError('');
    const err = validateStep3();
    if (err) return setError(err);
 
    setSaving(true);
    setUploadProgress('Uploading photos...');
 
    try {
      // Upload all photos
      const photoURLs = [];
      for (let i = 0; i < photoFiles.length; i++) {
        setUploadProgress(`Uploading photo ${i + 1} of ${photoFiles.length}...`);
        const url = await uploadPhoto('talent-photos', user.uid, photoFiles[i], i);
        photoURLs.push(url);
      }
 
      setUploadProgress('Saving profile...');
 
      // Save talent profile
      await saveTalentProfile(user.uid, {
        ...basic,
        ...attrs,
        bio,
        instagramURL,
        youtubeURL,
        photos: photoURLs,
        profilePhotoURL: photoURLs[0] || '',
        parentName: isMinor() ? parentName : '',
        parentRelation: isMinor() ? parentRelation : '',
      });
 
      // Mark onboarding complete
      await completeOnboarding(user.uid);
 
      setUploadProgress('');
      if (onComplete) onComplete();
      navigate('/dashboard');
    } catch (err) {
      console.error('Talent onboarding error:', err);
      setError('Something went wrong. Please try again.');
      setSaving(false);
      setUploadProgress('');
    }
  };
 
  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <span className="onboarding-icon">⭐</span>
          <h1 className="onboarding-title serif">Create Your Portfolio</h1>
          <p className="onboarding-subtitle">Step {step} of 3 — {step === 1 ? 'Basic Information' : step === 2 ? 'Physical Attributes & Skills' : 'Photos & Bio'}</p>
          {/* Progress bar */}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>
 
        {error && <div className="onboarding-error">{error}</div>}
        {uploadProgress && <div className="onboarding-info">{uploadProgress}</div>}
 
        {/* ═══ STEP 1: Basic Info ═══ */}
        {step === 1 && (
          <div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-input" placeholder="Your full name"
                  value={basic.fullName} onChange={e => updateBasic('fullName', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <input type="date" className="form-input"
                  value={basic.dateOfBirth} onChange={e => updateBasic('dateOfBirth', e.target.value)} />
              </div>
            </div>
 
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select className="form-select" value={basic.gender} onChange={e => updateBasic('gender', e.target.value)}>
                  <option value="">Select...</option>
                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" className="form-input" placeholder="+91 98765 43210"
                  value={basic.phone} onChange={e => updateBasic('phone', e.target.value)} />
              </div>
            </div>
 
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input type="text" className="form-input" placeholder="Mumbai"
                  value={basic.city} onChange={e => updateBasic('city', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <select className="form-select" value={basic.state} onChange={e => updateBasic('state', e.target.value)}>
                  <option value="">Select state...</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
 
            {/* Minor notice */}
            {isMinor() && (
              <div className="minor-notice">
                <p className="minor-notice-title">👶 This profile is for a minor (under 18)</p>
                <p className="minor-notice-desc">A parent or legal guardian must manage this account.</p>
                <div className="form-row" style={{ marginTop: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Name *</label>
                    <input type="text" className="form-input" placeholder="Parent's full name"
                      value={parentName} onChange={e => setParentName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Relationship *</label>
                    <select className="form-select" value={parentRelation} onChange={e => setParentRelation(e.target.value)}>
                      <option value="">Select...</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
 
            <button className="btn btn-primary btn-full btn-large" style={{ marginTop: 20 }} onClick={nextStep}>
              Next: Physical Attributes →
            </button>
          </div>
        )}
 
        {/* ═══ STEP 2: Attributes & Skills ═══ */}
        {step === 2 && (
          <div>
            <p className="form-section-title">Physical Attributes</p>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Height *</label>
                <select className="form-select" value={attrs.height} onChange={e => updateAttrs('height', e.target.value)}>
                  <option value="">Select...</option>
                  {HEIGHTS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Weight Range</label>
                <select className="form-select" value={attrs.weightRange} onChange={e => updateAttrs('weightRange', e.target.value)}>
                  <option value="">Select...</option>
                  {WEIGHT_RANGES.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Body Type *</label>
                <select className="form-select" value={attrs.bodyType} onChange={e => updateAttrs('bodyType', e.target.value)}>
                  <option value="">Select...</option>
                  {BODY_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Skin Tone *</label>
                <select className="form-select" value={attrs.skinTone} onChange={e => updateAttrs('skinTone', e.target.value)}>
                  <option value="">Select...</option>
                  {SKIN_TONES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Hair Color *</label>
                <select className="form-select" value={attrs.hairColor} onChange={e => updateAttrs('hairColor', e.target.value)}>
                  <option value="">Select...</option>
                  {HAIR_COLORS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Eye Color *</label>
                <select className="form-select" value={attrs.eyeColor} onChange={e => updateAttrs('eyeColor', e.target.value)}>
                  <option value="">Select...</option>
                  {EYE_COLORS.map(e2 => <option key={e2} value={e2}>{e2}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Ethnicity</label>
              <select className="form-select" value={attrs.ethnicity} onChange={e => updateAttrs('ethnicity', e.target.value)}>
                <option value="">Select...</option>
                {ETHNICITIES.map(et => <option key={et} value={et}>{et}</option>)}
              </select>
            </div>
 
            <p className="form-section-title" style={{ marginTop: 28 }}>Skills (select all that apply)</p>
            <div className="tag-grid">
              {SKILLS.map(skill => (
                <button key={skill} type="button"
                  className={`tag-btn ${attrs.skills.includes(skill) ? 'tag-btn--active' : ''}`}
                  onClick={() => toggleArrayItem('skills', skill)}>
                  {skill}
                </button>
              ))}
            </div>
 
            <p className="form-section-title" style={{ marginTop: 28 }}>Languages Known</p>
            <div className="tag-grid">
              {LANGUAGES.map(lang => (
                <button key={lang} type="button"
                  className={`tag-btn ${attrs.languages.includes(lang) ? 'tag-btn--active' : ''}`}
                  onClick={() => toggleArrayItem('languages', lang)}>
                  {lang}
                </button>
              ))}
            </div>
 
            <div className="form-group" style={{ marginTop: 28 }}>
              <label className="form-label">Experience Level</label>
              <select className="form-select" value={attrs.experience} onChange={e => updateAttrs('experience', e.target.value)}>
                <option value="">Select...</option>
                {EXPERIENCE_LEVELS.map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>
 
            <div className="step-buttons">
              <button className="btn btn-outline btn-large" onClick={prevStep}>← Back</button>
              <button className="btn btn-primary btn-large" onClick={nextStep}>Next: Photos & Bio →</button>
            </div>
          </div>
        )}
 
        {/* ═══ STEP 3: Photos & Bio ═══ */}
        {step === 3 && (
          <div>
            <p className="form-section-title">Portfolio Photos (up to 10)</p>
            <div className="photo-grid">
              {photoPreviews.map((url, i) => (
                <div key={i} className="photo-slot photo-slot--filled">
                  <img src={url} alt={`Photo ${i + 1}`} className="photo-slot-img" />
                  <button className="photo-remove" onClick={() => removePhoto(i)}>×</button>
                  {i === 0 && <span className="photo-label">Profile</span>}
                </div>
              ))}
              {photoFiles.length < 10 && (
                <div className="photo-slot photo-slot--add" onClick={() => document.getElementById('photo-input').click()}>
                  <span className="photo-add-icon">+</span>
                  <span className="photo-add-text">Add Photo</span>
                </div>
              )}
            </div>
            <input type="file" id="photo-input" accept="image/jpeg,image/png" multiple onChange={handlePhotoAdd} style={{ display: 'none' }} />
            <p className="upload-hint">{photoFiles.length}/10 photos · JPG or PNG · Max 5MB each · First photo = profile photo</p>
 
            <div className="form-group" style={{ marginTop: 28 }}>
              <label className="form-label">About Me / Bio</label>
              <textarea className="form-textarea" placeholder="Tell casting directors about yourself, your experience, unique qualities..."
                value={bio} onChange={e => setBio(e.target.value)} maxLength={1000} style={{ minHeight: 120 }} />
              <span className="char-count">{bio.length}/1000</span>
            </div>
 
            <p className="form-section-title" style={{ marginTop: 28 }}>Social Media (optional)</p>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Instagram URL</label>
                <input type="url" className="form-input" placeholder="https://instagram.com/yourhandle"
                  value={instagramURL} onChange={e => setInstagramURL(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">YouTube URL</label>
                <input type="url" className="form-input" placeholder="https://youtube.com/@yourchannel"
                  value={youtubeURL} onChange={e => setYoutubeURL(e.target.value)} />
              </div>
            </div>
 
            <div className="step-buttons">
              <button className="btn btn-outline btn-large" onClick={prevStep}>← Back</button>
              <button className="btn btn-primary btn-large" onClick={handleSubmit} disabled={saving}
                style={{ opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving...' : 'Complete Profile ✓'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}