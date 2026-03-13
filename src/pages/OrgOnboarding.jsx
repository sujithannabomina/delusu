// FILE: OrgOnboarding.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\OrgOnboarding.jsx
// PURPOSE: Organization profile setup form — shown after first Google sign-in as org
// FLOW: Fill form → Submit → Save to Firestore → Mark onboarding complete → Redirect to dashboard
 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveOrgProfile, completeOrgOnboarding } from '../firebase/firestoreHelpers';
import { uploadOrgLogo } from '../firebase/storageHelpers';
import { ORG_TYPES, INDIAN_STATES } from '../utils/constants';
import './Onboarding.css';
 
export default function OrgOnboarding({ user, onComplete }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
 
  const [form, setForm] = useState({
    companyName: '',
    orgType: '',
    contactPerson: user?.displayName || '',
    designation: '',
    phone: '',
    city: '',
    state: '',
    website: '',
    about: '',
  });
 
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
 
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError('Logo must be under 2MB');
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Logo must be JPG or PNG');
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setError('');
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    // Validate
    if (!form.companyName.trim()) return setError('Company name is required');
    if (!form.orgType) return setError('Organization type is required');
    if (!form.contactPerson.trim()) return setError('Contact person name is required');
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) return setError('Valid phone number is required');
    if (!form.city.trim()) return setError('City is required');
    if (!form.state) return setError('State is required');
 
    setSaving(true);
 
    try {
      let logoURL = '';
 
      // Upload logo if selected
      if (logoFile) {
        logoURL = await uploadOrgLogo(user.uid, logoFile);
      }
 
      // Save org profile to Firestore
      await saveOrgProfile(user.uid, { ...form, logoURL });
 
      // Mark onboarding complete (orgs get active status immediately)
      await completeOrgOnboarding(user.uid);
 
      // Notify parent to refresh user data
      if (onComplete) onComplete();
 
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Onboarding error:', err);
      setError('Something went wrong. Please try again.');
      setSaving(false);
    }
  };
 
  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <span className="onboarding-icon">🏢</span>
          <h1 className="onboarding-title serif">Set Up Your Organization</h1>
          <p className="onboarding-subtitle">Complete your profile to start posting casting calls and discovering talent.</p>
        </div>
 
        {error && <div className="onboarding-error">{error}</div>}
 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Organization / Company Name *</label>
            <input type="text" className="form-input" placeholder="e.g. Sunrise Productions"
              value={form.companyName} onChange={e => updateField('companyName', e.target.value)} />
          </div>
 
          <div className="form-group">
            <label className="form-label">Organization Type *</label>
            <select className="form-select" value={form.orgType} onChange={e => updateField('orgType', e.target.value)}>
              <option value="">Select type...</option>
              {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Contact Person Name *</label>
              <input type="text" className="form-input" placeholder="Full name"
                value={form.contactPerson} onChange={e => updateField('contactPerson', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input type="text" className="form-input" placeholder="e.g. Casting Director"
                value={form.designation} onChange={e => updateField('designation', e.target.value)} />
            </div>
          </div>
 
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input type="tel" className="form-input" placeholder="+91 98765 43210"
              value={form.phone} onChange={e => updateField('phone', e.target.value)} />
          </div>
 
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input type="text" className="form-input" placeholder="Mumbai"
                value={form.city} onChange={e => updateField('city', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">State *</label>
              <select className="form-select" value={form.state} onChange={e => updateField('state', e.target.value)}>
                <option value="">Select state...</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
 
          <div className="form-group">
            <label className="form-label">Website (optional)</label>
            <input type="url" className="form-input" placeholder="https://yourcompany.com"
              value={form.website} onChange={e => updateField('website', e.target.value)} />
          </div>
 
          <div className="form-group">
            <label className="form-label">About Your Organization (optional)</label>
            <textarea className="form-textarea" placeholder="Brief description of your organization and the type of talent you typically look for..."
              value={form.about} onChange={e => updateField('about', e.target.value)} maxLength={500} />
            <span className="char-count">{form.about.length}/500</span>
          </div>
 
          <div className="form-group">
            <label className="form-label">Organization Logo (optional)</label>
            <div className="logo-upload" onClick={() => document.getElementById('logo-input').click()}>
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="logo-preview" />
              ) : (
                <div className="logo-placeholder">
                  <span>+</span>
                  <p>Upload Logo</p>
                </div>
              )}
            </div>
            <input type="file" id="logo-input" accept="image/jpeg,image/png" onChange={handleLogoChange} style={{ display: 'none' }} />
            <span className="upload-hint">JPG or PNG · Max 2MB</span>
          </div>
 
          <button type="submit" className="btn btn-primary btn-full btn-large" disabled={saving}
            style={{ marginTop: 16, opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Saving...' : 'Complete Setup & Go to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
}