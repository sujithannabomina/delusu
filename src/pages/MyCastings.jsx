// FILE: MyCastings.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\MyCastings.jsx
// PURPOSE: List of all casting calls posted by the organization with status tabs
 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrgCastings, expireOldCastings } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function MyCastings({ user }) {
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
 
  useEffect(() => {
    async function load() {
      await expireOldCastings();
      const data = await getOrgCastings(user.uid);
      setCastings(data);
      setLoading(false);
    }
    load();
  }, [user.uid]);
 
  const filtered = filter === 'all' ? castings : castings.filter(c => c.status === filter);
 
  if (loading) return <div className="dash-loading">Loading castings...</div>;
 
  return (
    <div className="dash-page">
      <div className="container">
        <div className="dash-page-header">
          <h1 className="serif">My Castings</h1>
          <Link to="/dashboard/post" className="btn btn-primary">+ Post New</Link>
        </div>
 
        {/* Filter tabs */}
        <div className="dash-tabs">
          {['all', 'active', 'closed', 'expired'].map(tab => (
            <button key={tab} className={`dash-tab ${filter === tab ? 'dash-tab--active' : ''}`}
              onClick={() => setFilter(tab)}>
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="dash-tab-count">
                {tab === 'all' ? castings.length : castings.filter(c => c.status === tab).length}
              </span>
            </button>
          ))}
        </div>
 
        {filtered.length === 0 ? (
          <div className="dash-empty">
            <p>No {filter === 'all' ? '' : filter} castings found.</p>
            {filter === 'all' && (
              <Link to="/dashboard/post" className="btn btn-outline" style={{ marginTop: 12 }}>Post Your First Casting</Link>
            )}
          </div>
        ) : (
          <div className="dash-casting-list">
            {filtered.map(c => (
              <Link to={`/dashboard/castings/${c.id}`} key={c.id} className="dash-casting-card">
                <div className="dash-casting-info">
                  <h3 className="dash-casting-title">{c.title}</h3>
                  <p className="dash-casting-meta">
                    {c.castingTypeLabel} · {c.location} · {c.ageRange} · {c.gender}
                  </p>
                  <p className="dash-casting-meta">Budget: {c.budget}</p>
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
  );
}