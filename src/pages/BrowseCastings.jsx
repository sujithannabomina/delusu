// FILE: BrowseCastings.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\BrowseCastings.jsx
// PURPOSE: Talent browses all active casting calls with search/filter
 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActiveCastings, expireOldCastings } from '../firebase/firestoreHelpers';
import { CASTING_TIERS } from '../utils/constants';
import './Dashboard.css';
 
export default function BrowseCastings() {
  const [castings, setCastings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('');
 
  useEffect(() => {
    async function load() {
      await expireOldCastings();
      const data = await getActiveCastings();
      setCastings(data);
      setLoading(false);
    }
    load();
  }, []);
 
  const filtered = castings.filter(c => {
    const matchSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.location?.toLowerCase().includes(search.toLowerCase()) || c.castingTypeLabel?.toLowerCase().includes(search.toLowerCase());
    const matchGender = !filterGender || c.gender === filterGender || c.gender === 'Any';
    return matchSearch && matchGender;
  });
 
  if (loading) return <div className="dash-loading">Loading castings...</div>;
 
  return (
    <div className="dash-page">
      <div className="container">
        <div className="dash-page-header">
          <h1 className="serif">Browse Castings</h1>
          <p className="dash-page-sub">{filtered.length} active casting calls</p>
        </div>
 
        <div className="browse-filters">
          <input type="text" className="form-input" placeholder="Search by title, type, or city..."
            value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 350 }} />
          <select className="form-select" value={filterGender} onChange={e => setFilterGender(e.target.value)} style={{ maxWidth: 160 }}>
            <option value="">All Genders</option>
            <option>Male</option><option>Female</option><option>Non-Binary</option><option>Any</option>
          </select>
        </div>
 
        {filtered.length === 0 ? (
          <div className="dash-empty"><p>No castings match your search. Try different keywords.</p></div>
        ) : (
          <div className="dash-casting-list">
            {filtered.map(c => {
              const tier = CASTING_TIERS[c.castingTier];
              const deadlineDate = c.deadline?.toDate ? c.deadline.toDate() : new Date(c.deadline);
              const daysLeft = Math.max(0, Math.ceil((deadlineDate - Date.now()) / (1000 * 60 * 60 * 24)));
              const isUrgent = daysLeft <= 3;
 
              return (
                <Link to={`/dashboard/castings/${c.id}`} key={c.id} className="dash-casting-card">
                  <div className="dash-casting-info">
                    <div className="dash-casting-top-row">
                      <span className="dash-casting-org">{c.orgName}{c.orgVerified ? ' ✓' : ''}</span>
                      {isUrgent && <span className="dash-casting-urgent">Urgent — {daysLeft} days left</span>}
                    </div>
                    <h3 className="dash-casting-title">{c.title}</h3>
                    <p className="dash-casting-meta">{c.castingTypeLabel} · {c.location} · {c.ageRange} · {c.gender}</p>
                    <p className="dash-casting-meta">Budget: {c.budget} · Duration: {c.shootDuration || 'Not specified'}</p>
                  </div>
                  <div className="dash-casting-right">
                    <span className="dash-casting-applicants">{c.applicantCount || 0} applied</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}