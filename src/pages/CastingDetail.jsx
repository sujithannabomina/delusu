// FILE: CastingDetail.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\CastingDetail.jsx
// PURPOSE: View a single casting + list of applicants. Org can shortlist/reject/select.
 
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCasting, getCastingApplications, updateApplicationStatus, closeCasting, getTalentProfile } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function CastingDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [casting, setCasting] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingTalent, setViewingTalent] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
 
  useEffect(() => {
    async function load() {
      const [c, apps] = await Promise.all([
        getCasting(id),
        getCastingApplications(id),
      ]);
      setCasting(c);
      setApplications(apps);
      setLoading(false);
    }
    load();
  }, [id]);
 
  const handleStatusChange = async (appId, newStatus) => {
    await updateApplicationStatus(appId, newStatus);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  };
 
  const handleClose = async () => {
    if (window.confirm('Close this casting? No new applications will be accepted.')) {
      await closeCasting(id);
      setCasting(prev => ({ ...prev, status: 'closed' }));
    }
  };
 
  const handleViewTalent = async (talentId) => {
    const profile = await getTalentProfile(talentId);
    setViewingTalent(profile);
  };
 
  if (loading) return <div className="dash-loading">Loading casting details...</div>;
  if (!casting) return <div className="dash-loading">Casting not found.</div>;
 
  const filteredApps = statusFilter === 'all' ? applications : applications.filter(a => a.status === statusFilter);
 
  // Talent profile modal
  if (viewingTalent) {
    return (
      <div className="dash-page">
        <div className="container-narrow">
          <button className="dash-back" onClick={() => setViewingTalent(null)}>← Back to Applicants</button>
          <div className="talent-view">
            <div className="talent-view-header">
              {viewingTalent.profilePhotoURL && (
                <img src={viewingTalent.profilePhotoURL} alt="" className="talent-view-photo" />
              )}
              <div>
                <h2 className="talent-view-name serif">{viewingTalent.fullName}</h2>
                <p className="talent-view-meta">{viewingTalent.gender} · {viewingTalent.city}, {viewingTalent.state} · {viewingTalent.experience || 'No experience listed'}</p>
                <p className="talent-view-meta">Phone: {viewingTalent.phone} · Email: shown after shortlisting</p>
              </div>
            </div>
 
            <div className="talent-view-section">
              <h3>Physical Attributes</h3>
              <div className="talent-view-attrs">
                <span>Height: {viewingTalent.height}</span>
                <span>Body: {viewingTalent.bodyType}</span>
                <span>Skin: {viewingTalent.skinTone}</span>
                <span>Hair: {viewingTalent.hairColor}</span>
                <span>Eyes: {viewingTalent.eyeColor}</span>
                {viewingTalent.ethnicity && <span>Ethnicity: {viewingTalent.ethnicity}</span>}
                {viewingTalent.weightRange && <span>Weight: {viewingTalent.weightRange}</span>}
              </div>
            </div>
 
            {viewingTalent.skills?.length > 0 && (
              <div className="talent-view-section">
                <h3>Skills</h3>
                <div className="talent-view-tags">{viewingTalent.skills.map(s => <span key={s} className="talent-tag">{s}</span>)}</div>
              </div>
            )}
 
            {viewingTalent.languages?.length > 0 && (
              <div className="talent-view-section">
                <h3>Languages</h3>
                <div className="talent-view-tags">{viewingTalent.languages.map(l => <span key={l} className="talent-tag">{l}</span>)}</div>
              </div>
            )}
 
            {viewingTalent.bio && (
              <div className="talent-view-section">
                <h3>About</h3>
                <p className="talent-view-bio">{viewingTalent.bio}</p>
              </div>
            )}
 
            {viewingTalent.photos?.length > 0 && (
              <div className="talent-view-section">
                <h3>Portfolio ({viewingTalent.photos.length} photos)</h3>
                <div className="talent-view-gallery">
                  {viewingTalent.photos.map((url, i) => (
                    <img key={i} src={url} alt={`Photo ${i + 1}`} className="talent-view-gallery-img" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="dash-page">
      <div className="container">
        <button className="dash-back" onClick={() => navigate('/dashboard/castings')}>← Back to My Castings</button>
 
        {/* Casting Info */}
        <div className="casting-detail-card">
          <div className="casting-detail-top">
            <div>
              <h1 className="casting-detail-title serif">{casting.title}</h1>
              <p className="casting-detail-meta">
                {casting.castingTypeLabel} · {casting.location} · {casting.ageRange} · {casting.gender}
              </p>
              <p className="casting-detail-meta">Budget: {casting.budget} · Duration: {casting.shootDuration || 'Not specified'}</p>
            </div>
            <span className={`dash-casting-status dash-casting-status--${casting.status}`}>{casting.status}</span>
          </div>
          <p className="casting-detail-desc">{casting.description}</p>
          {casting.requirements && <p className="casting-detail-req"><strong>Requirements:</strong> {casting.requirements}</p>}
 
          {casting.status === 'active' && (
            <button className="btn btn-outline" onClick={handleClose} style={{ marginTop: 16 }}>Close This Casting</button>
          )}
        </div>
 
        {/* Applicants */}
        <div className="dash-section" style={{ marginTop: 32 }}>
          <div className="dash-section-header">
            <h2 className="dash-section-title">Applicants ({applications.length})</h2>
          </div>
 
          <div className="dash-tabs" style={{ marginBottom: 16 }}>
            {['all', 'applied', 'shortlisted', 'selected', 'rejected'].map(tab => (
              <button key={tab} className={`dash-tab ${statusFilter === tab ? 'dash-tab--active' : ''}`}
                onClick={() => setStatusFilter(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="dash-tab-count">
                  {tab === 'all' ? applications.length : applications.filter(a => a.status === tab).length}
                </span>
              </button>
            ))}
          </div>
 
          {filteredApps.length === 0 ? (
            <div className="dash-empty"><p>No {statusFilter === 'all' ? '' : statusFilter} applicants yet.</p></div>
          ) : (
            <div className="applicant-list">
              {filteredApps.map(app => (
                <div key={app.id} className="applicant-card">
                  <div className="applicant-left" onClick={() => handleViewTalent(app.talentId)} style={{ cursor: 'pointer' }}>
                    {app.talentPhoto ? (
                      <img src={app.talentPhoto} alt="" className="applicant-photo" />
                    ) : (
                      <div className="applicant-photo-placeholder">
                        {(app.talentName || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="applicant-name">{app.talentName}</h4>
                      <p className="applicant-meta">{app.talentCity} · {app.talentGender} · {app.talentAge || ''}</p>
                      <p className="applicant-view-link">View Full Portfolio →</p>
                    </div>
                  </div>
                  <div className="applicant-right">
                    <span className={`applicant-status applicant-status--${app.status}`}>{app.status}</span>
                    <div className="applicant-actions">
                      {app.status !== 'shortlisted' && app.status !== 'selected' && (
                        <button className="applicant-action-btn applicant-action--shortlist" onClick={() => handleStatusChange(app.id, 'shortlisted')}>Shortlist</button>
                      )}
                      {app.status === 'shortlisted' && (
                        <button className="applicant-action-btn applicant-action--select" onClick={() => handleStatusChange(app.id, 'selected')}>Select</button>
                      )}
                      {app.status !== 'rejected' && (
                        <button className="applicant-action-btn applicant-action--reject" onClick={() => handleStatusChange(app.id, 'rejected')}>Reject</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}