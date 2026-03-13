// FILE: CreateCasting.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\CreateCasting.jsx
// PURPOSE: Form for organizations to post a new casting call
// NOTE: For now, posts go live immediately (free). Phase 4 adds Razorpay payment gate.
 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCasting, getOrgProfile } from '../firebase/firestoreHelpers';
import { CASTING_TYPES, CASTING_TIERS, AGE_RANGES, GENDERS, SHOOT_DURATIONS, HEIGHTS, BODY_TYPES, SKIN_TONES, SKILLS } from '../utils/constants';
import { Timestamp } from 'firebase/firestore';
import './Dashboard.css';
 
export default function CreateCasting({ user }) {
  const navigate = useNavigate();
  const [orgProfile, setOrgProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
 
  const [form, setForm] = useState({
    title: '',
    castingTypeId: '',
    description: '',
    ageRange: '',
    gender: '',
    location: '',
    shootDuration: '',
    budget: '',
    deadline: '',
    requirements: '',
    preferredHeight: '',
    preferredBodyType: '',
    preferredSkinTone: '',
    preferredSkills: [],
  });
 
  useEffect(() => {
    getOrgProfile(user.uid).then(setOrgProfile);
  }, [user.uid]);
 
  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
 
  const selectedType = CASTING_TYPES.find(t => t.id === form.castingTypeId);
  const selectedTier = selectedType ? CASTING_TIERS[selectedType.tier] : null;
 
  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      preferredSkills: prev.preferredSkills.includes(skill)
        ? prev.preferredSkills.filter(s => s !== skill)
        : [...prev.preferredSkills, skill]
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    if (!form.title.trim()) return setError('Casting title is required');
    if (!form.castingTypeId) return setError('Casting type is required');
    if (!form.description.trim()) return setError('Description is required');
    if (!form.ageRange) return setError('Age range is required');
    if (!form.gender) return setError('Gender preference is required');
    if (!form.location.trim()) return setError('Location is required');
    if (!form.budget.trim()) return setError('Budget is required');
    if (!form.deadline) return setError('Deadline is required');
 
    // Validate deadline is at least 3 days from now
    const deadlineDate = new Date(form.deadline);
    const minDeadline = new Date();
    minDeadline.setDate(minDeadline.getDate() + 3);
    if (deadlineDate < minDeadline) return setError('Deadline must be at least 3 days from today');
 
    setSaving(true);
 
    try {
      const castingId = await createCasting({
        orgId: user.uid,
        orgName: orgProfile?.companyName || user.displayName || 'Organization',
        orgVerified: orgProfile?.isVerified || false,
        title: form.title.trim(),
        description: form.description.trim(),
        castingTypeId: selectedType.id,
        castingTypeLabel: selectedType.label,
        castingTier: selectedType.tier,
        castingGroup: selectedType.group,
        ageRange: form.ageRange,
        gender: form.gender,
        location: form.location.trim(),
        shootDuration: form.shootDuration,
        budget: form.budget.trim(),
        deadline: Timestamp.fromDate(new Date(form.deadline)),
        requirements: form.requirements.trim(),
        preferredHeight: form.preferredHeight,
        preferredBodyType: form.preferredBodyType,
        preferredSkinTone: form.preferredSkinTone,
        preferredSkills: form.preferredSkills,
      });
 
      navigate(`/dashboard/castings/${castingId}`);
    } catch (err) {
      console.error('Create casting error:', err);
      setError('Failed to create casting. Please try again.');
      setSaving(false);
    }
  };
 
  return (
    <div className="dash-page">
      <div className="container-narrow">
        <div className="dash-page-header">
          <h1 className="serif">Post a Casting Call</h1>
          <p className="dash-page-sub">Fill in the details. Your casting will be live immediately.</p>
        </div>
 
        {error && <div className="dash-error">{error}</div>}
 
        <form onSubmit={handleSubmit} className="dash-form">
          <div className="form-group">
            <label className="form-label">Casting Title *</label>
            <input type="text" className="form-input" placeholder="e.g. Senior Couple for Life Insurance TVC"
              value={form.title} onChange={e => updateField('title', e.target.value)} maxLength={100} />
          </div>
 
          <div className="form-group">
            <label className="form-label">Casting Type *</label>
            <select className="form-select" value={form.castingTypeId} onChange={e => updateField('castingTypeId', e.target.value)}>
              <option value="">Select casting type...</option>
              {['Advertising & Commercial', 'Film & Entertainment', 'Fashion', 'Corporate & Institutional', 'Events & Promotions', 'Digital & Influencer', 'Specialty & Niche'].map(group => (
                <optgroup key={group} label={group}>
                  {CASTING_TYPES.filter(t => t.group === group).map(t => {
                    const tier = CASTING_TIERS[t.tier];
                    return <option key={t.id} value={t.id}>{t.label} — {tier.priceDisplay}</option>;
                  })}
                </optgroup>
              ))}
            </select>
          </div>
 
          {selectedTier && (
            <div className="tier-badge" style={{ borderLeftColor: selectedTier.color }}>
              <strong>{selectedTier.label} Tier</strong> — {selectedTier.priceDisplay} for {selectedTier.duration}
              <br /><span style={{ fontSize: 12, color: '#888' }}>{selectedTier.description}</span>
            </div>
          )}
 
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea className="form-textarea" placeholder="Describe the role, what the shoot involves, tone, vision..."
              value={form.description} onChange={e => updateField('description', e.target.value)} maxLength={2000} style={{ minHeight: 120 }} />
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Age Range Required *</label>
              <select className="form-select" value={form.ageRange} onChange={e => updateField('ageRange', e.target.value)}>
                <option value="">Select...</option>
                {AGE_RANGES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Gender Required *</label>
              <select className="form-select" value={form.gender} onChange={e => updateField('gender', e.target.value)}>
                <option value="">Select...</option>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                <option value="Any">Any</option>
              </select>
            </div>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location / City *</label>
              <input type="text" className="form-input" placeholder="Where the shoot takes place"
                value={form.location} onChange={e => updateField('location', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Shoot Duration</label>
              <select className="form-select" value={form.shootDuration} onChange={e => updateField('shootDuration', e.target.value)}>
                <option value="">Select...</option>
                {SHOOT_DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Budget / Compensation *</label>
              <input type="text" className="form-input" placeholder="e.g. ₹50,000 - ₹1,00,000 or Negotiable"
                value={form.budget} onChange={e => updateField('budget', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Application Deadline *</label>
              <input type="date" className="form-input"
                value={form.deadline} onChange={e => updateField('deadline', e.target.value)} />
            </div>
          </div>
 
          <div className="form-group">
            <label className="form-label">Requirements / Special Notes</label>
            <textarea className="form-textarea" placeholder="e.g. Hindi speaking, no tattoos, available on weekends..."
              value={form.requirements} onChange={e => updateField('requirements', e.target.value)} maxLength={500} />
          </div>
 
          <p className="form-section-title" style={{ marginTop: 28 }}>Preferred Attributes (optional)</p>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Height Preference</label>
              <select className="form-select" value={form.preferredHeight} onChange={e => updateField('preferredHeight', e.target.value)}>
                <option value="">Any</option>
                {HEIGHTS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Body Type Preference</label>
              <select className="form-select" value={form.preferredBodyType} onChange={e => updateField('preferredBodyType', e.target.value)}>
                <option value="">Any</option>
                {BODY_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
 
          <div className="form-group">
            <label className="form-label">Skin Tone Preference</label>
            <select className="form-select" value={form.preferredSkinTone} onChange={e => updateField('preferredSkinTone', e.target.value)}>
              <option value="">Any</option>
              {SKIN_TONES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
 
          <div className="form-group">
            <label className="form-label">Skills Needed</label>
            <div className="tag-grid">
              {SKILLS.map(skill => (
                <button key={skill} type="button"
                  className={`tag-btn ${form.preferredSkills.includes(skill) ? 'tag-btn--active' : ''}`}
                  onClick={() => toggleSkill(skill)}>
                  {skill}
                </button>
              ))}
            </div>
          </div>
 
          <button type="submit" className="btn btn-primary btn-full btn-large" disabled={saving}
            style={{ marginTop: 24, opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Publishing...' : 'Publish Casting Call →'}
          </button>
        </form>
      </div>
    </div>
  );
}