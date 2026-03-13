// FILE: MyApplications.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\MyApplications.jsx
// PURPOSE: Talent views all castings they've applied to with status tracking
 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTalentApplications } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function MyApplications({ user }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
 
  useEffect(() => {
    async function load() {
      const data = await getTalentApplications(user.uid);
      setApplications(data);
      setLoading(false);
    }
    load();
  }, [user.uid]);
 
  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter);
 
  if (loading) return <div className="dash-loading">Loading applications...</div>;
 
  return (
    <div className="dash-page">
      <div className="container">
        <div className="dash-page-header">
          <h1 className="serif">My Applications</h1>
          <p className="dash-page-sub">{applications.length} total applications</p>
        </div>
 
        <div className="dash-tabs">
          {['all', 'applied', 'shortlisted', 'selected', 'rejected'].map(tab => (
            <button key={tab} className={`dash-tab ${filter === tab ? 'dash-tab--active' : ''}`}
              onClick={() => setFilter(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="dash-tab-count">
                {tab === 'all' ? applications.length : applications.filter(a => a.status === tab).length}
              </span>
            </button>
          ))}
        </div>
 
        {filtered.length === 0 ? (
          <div className="dash-empty">
            <p>No {filter === 'all' ? '' : filter} applications.</p>
            {filter === 'all' && (
              <Link to="/dashboard/castings" className="btn btn-outline" style={{ marginTop: 12 }}>Browse Castings</Link>
            )}
          </div>
        ) : (
          <div className="dash-casting-list">
            {filtered.map(app => {
              const appliedDate = app.appliedAt?.toDate ? app.appliedAt.toDate().toLocaleDateString('en-IN') : '';
              return (
                <div key={app.id} className="dash-casting-card" style={{ cursor: 'default' }}>
                  <div className="dash-casting-info">
                    <h3 className="dash-casting-title">{app.castingTitle}</h3>
                    <p className="dash-casting-meta">Applied: {appliedDate}</p>
                  </div>
                  <div className="dash-casting-right">
                    <span className={`applicant-status applicant-status--${app.status}`}>{app.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}