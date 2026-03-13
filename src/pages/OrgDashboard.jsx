// FILE: OrgDashboard.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\OrgDashboard.jsx
// PURPOSE: Organization dashboard — stats, active castings, recent applicants, quick actions
 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrgProfile, getOrgCastings, expireOldCastings } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function OrgDashboard({ user }) {
  const [orgProfile, setOrgProfile] = useState(null);
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function load() {
      try {
        await expireOldCastings(); // auto-expire past-deadline castings
        const [profile, allCastings] = await Promise.all([
          getOrgProfile(user.uid),
          getOrgCastings(user.uid),
        ]);
        setOrgProfile(profile);
        setCastings(allCastings);
      } catch (err) {
        console.error('Dashboard load error:', err);
      }
      setLoading(false);
    }
    load();
  }, [user.uid]);
 
  if (loading) return <div className="dash-loading">Loading dashboard...</div>;
 
  const activeCastings = castings.filter(c => c.status === 'active');
  const closedCastings = castings.filter(c => c.status === 'closed' || c.status === 'expired');
  const totalApplicants = castings.reduce((sum, c) => sum + (c.applicantCount || 0), 0);
 
  return (
    <div className="dash-page">
      <div className="container">
        {/* Welcome */}
        <div className="dash-welcome">
          <div>
            <h1 className="dash-welcome-title serif">
              {orgProfile?.companyName || user.displayName || 'Organization'}
            </h1>
            <p className="dash-welcome-sub">Organization Dashboard</p>
          </div>
          <Link to="/dashboard/post" className="btn btn-primary btn-large">+ Post New Casting</Link>
        </div>
 
        {/* Stats */}
        <div className="dash-stats">
          <div className="dash-stat-card">
            <span className="dash-stat-num">{activeCastings.length}</span>
            <span className="dash-stat-label">Active Castings</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">{closedCastings.length}</span>
            <span className="dash-stat-label">Closed / Expired</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">{totalApplicants}</span>
            <span className="dash-stat-label">Total Applicants</span>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-num">{castings.length}</span>
            <span className="dash-stat-label">Total Posts</span>
          </div>
        </div>
 
        {/* Quick Actions */}
        <div className="dash-actions">
          <Link to="/dashboard/post" className="dash-action-btn">📝 Post New Casting</Link>
          <Link to="/dashboard/castings" className="dash-action-btn">📋 My Castings</Link>
          <Link to="/dashboard/talent" className="dash-action-btn">🔍 Browse Talent</Link>
          <Link to="/profile" className="dash-action-btn">⚙️ Edit Profile</Link>
        </div>
 
        {/* Active Castings Preview */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Active Castings</h2>
            <Link to="/dashboard/castings" className="dash-section-link">View All →</Link>
          </div>
 
          {activeCastings.length === 0 ? (
            <div className="dash-empty">
              <p>No active casting calls.</p>
              <Link to="/dashboard/post" className="btn btn-outline" style={{ marginTop: 12 }}>Post Your First Casting</Link>
            </div>
          ) : (
            <div className="dash-casting-list">
              {activeCastings.slice(0, 5).map(c => (
                <Link to={`/dashboard/castings/${c.id}`} key={c.id} className="dash-casting-card">
                  <div className="dash-casting-info">
                    <h3 className="dash-casting-title">{c.title}</h3>
                    <p className="dash-casting-meta">
                      {c.castingTypeLabel} · {c.location} · {c.ageRange} · {c.gender}
                    </p>
                  </div>
                  <div className="dash-casting-right">
                    <span className="dash-casting-applicants">{c.applicantCount || 0} applicants</span>
                    <span className={`dash-casting-status dash-casting-status--${c.status}`}>{c.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}