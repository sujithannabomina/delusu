// FILE: TalentDashboard.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\TalentDashboard.jsx
// PURPOSE: Talent dashboard — stats, recommended castings, application status, profile nudge
 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTalentProfile, getTalentApplications, getActiveCastings, expireOldCastings } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function TalentDashboard({ user, userData }) {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function load() {
      await expireOldCastings();
      const [prof, apps, casts] = await Promise.all([
        getTalentProfile(user.uid),
        getTalentApplications(user.uid),
        getActiveCastings(),
      ]);
      setProfile(prof);
      setApplications(apps);
      setCastings(casts);
      setLoading(false);
    }
    load();
  }, [user.uid]);
 
  if (loading) return <div className="dash-loading">Loading dashboard...</div>;
 
  const isUnpaid = userData?.accountStatus === 'complete_unpaid';
  const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
  const selected = applications.filter(a => a.status === 'selected').length;
  const photoCount = profile?.photos?.length || 0;
  const hasBio = !!profile?.bio;
 
  return (
    <div className="dash-page">
      <div className="container">
        {/* Welcome */}
        <div className="dash-welcome">
          <div>
            <h1 className="dash-welcome-title serif">Hi, {profile?.fullName || user.displayName || 'Talent'}!</h1>
            <p className="dash-welcome-sub">Talent Dashboard</p>
          </div>
        </div>
 
        {/* Unpaid notice */}
        {isUnpaid && (
          <div className="dash-notice dash-notice--warning">
            <p><strong>Your profile is not yet active.</strong> To become visible to organizations and apply to castings, you need to activate your account by selecting talent categories.</p>
            <p style={{ fontSize: 13, marginTop: 8, color: '#888' }}>Category selection and payment will be available soon (Phase 4).</p>
          </div>
        )}
 
        {/* Profile completeness nudge */}
        {(photoCount < 3 || !hasBio) && (
          <div className="dash-notice dash-notice--info">
            <p><strong>Complete your profile!</strong>
              {photoCount < 3 && ` You have ${photoCount} photo${photoCount === 1 ? '' : 's'} — add at least 3 for better visibility.`}
              {!hasBio && ' Add a bio to tell casting directors about yourself.'}
            </p>
            <Link to="/profile" className="btn btn-outline" style={{ marginTop: 8 }}>Edit Profile</Link>
          </div>
        )}
 
        {/* Stats */}
        <div className="dash-stats">
          <div className="dash-stat-card">
            <span className="dash-stat-num">{applications.length}</span>
            <span className="dash-stat-label">Applications</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">{shortlisted}</span>
            <span className="dash-stat-label">Shortlisted</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">{selected}</span>
            <span className="dash-stat-label">Selected</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">{photoCount}/10</span>
            <span className="dash-stat-label">Photos</span>
          </div>
        </div>
 
        {/* Quick Actions */}
        <div className="dash-actions">
          <Link to="/dashboard/castings" className="dash-action-btn">🔍 Browse Castings</Link>
          <Link to="/dashboard/applications" className="dash-action-btn">📋 My Applications</Link>
          <Link to="/profile" className="dash-action-btn">⚙️ Edit Profile</Link>
        </div>
 
        {/* Recent Applications */}
        {applications.length > 0 && (
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">Recent Applications</h2>
              <Link to="/dashboard/applications" className="dash-section-link">View All →</Link>
            </div>
            <div className="dash-casting-list">
              {applications.slice(0, 5).map(app => (
                <div key={app.id} className="dash-casting-card" style={{ cursor: 'default' }}>
                  <div className="dash-casting-info">
                    <h3 className="dash-casting-title">{app.castingTitle}</h3>
                  </div>
                  <span className={`applicant-status applicant-status--${app.status}`}>{app.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* Browse Castings Preview */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Latest Castings</h2>
            <Link to="/dashboard/castings" className="dash-section-link">Browse All →</Link>
          </div>
          {castings.length === 0 ? (
            <div className="dash-empty"><p>No active castings right now. Check back soon!</p></div>
          ) : (
            <div className="dash-casting-list">
              {castings.slice(0, 5).map(c => (
                <Link to={`/dashboard/castings/${c.id}`} key={c.id} className="dash-casting-card">
                  <div className="dash-casting-info">
                    <h3 className="dash-casting-title">{c.title}</h3>
                    <p className="dash-casting-meta">{c.orgName} · {c.castingTypeLabel} · {c.location}</p>
                    <p className="dash-casting-meta">{c.ageRange} · {c.gender} · Budget: {c.budget}</p>
                  </div>
                  <span className="dash-casting-applicants">{c.applicantCount || 0} applied</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}