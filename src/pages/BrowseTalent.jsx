// FILE: BrowseTalent.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\BrowseTalent.jsx
// PURPOSE: Organizations browse and search all talent on the platform
 
import { useState, useEffect } from 'react';
import { getAllVisibleTalent, getTalentProfile } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function BrowseTalent() {
  const [talent, setTalent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [viewingTalent, setViewingTalent] = useState(null);
 
  useEffect(() => {
    async function load() {
      const data = await getAllVisibleTalent();
      setTalent(data);
      setLoading(false);
    }
    load();
  }, []);
 
  const filtered = talent.filter(t => {
    const matchSearch = !search || t.fullName?.toLowerCase().includes(search.toLowerCase()) || t.city?.toLowerCase().includes(search.toLowerCase());
    const matchGender = !filterGender || t.gender === filterGender;
    const matchCity = !filterCity || t.city?.toLowerCase().includes(filterCity.toLowerCase());
    return matchSearch && matchGender && matchCity;
  });
 
  if (viewingTalent) {
    return (
      <div className="dash-page">
        <div className="container-narrow">
          <button className="dash-back" onClick={() => setViewingTalent(null)}>← Back to Browse</button>
          <div className="talent-view">
            <div className="talent-view-header">
              {viewingTalent.profilePhotoURL && <img src={viewingTalent.profilePhotoURL} alt="" className="talent-view-photo" />}
              <div>
                <h2 className="talent-view-name serif">{viewingTalent.fullName}</h2>
                <p className="talent-view-meta">{viewingTalent.gender} · {viewingTalent.city}, {viewingTalent.state} · {viewingTalent.experience || 'Fresher'}</p>
                <p className="talent-view-meta" style={{ color: '#aaa', fontSize: 12 }}>Contact info visible only after they apply to your casting</p>
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
              </div>
            </div>
            {viewingTalent.skills?.length > 0 && (
              <div className="talent-view-section">
                <h3>Skills</h3>
                <div className="talent-view-tags">{viewingTalent.skills.map(s => <span key={s} className="talent-tag">{s}</span>)}</div>
              </div>
            )}
            {viewingTalent.bio && (
              <div className="talent-view-section"><h3>About</h3><p className="talent-view-bio">{viewingTalent.bio}</p></div>
            )}
            {viewingTalent.photos?.length > 0 && (
              <div className="talent-view-section">
                <h3>Portfolio</h3>
                <div className="talent-view-gallery">
                  {viewingTalent.photos.map((url, i) => <img key={i} src={url} alt="" className="talent-view-gallery-img" />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
 
  if (loading) return <div className="dash-loading">Loading talent...</div>;
 
  return (
    <div className="dash-page">
      <div className="container">
        <div className="dash-page-header">
          <h1 className="serif">Browse Talent</h1>
          <p className="dash-page-sub">{filtered.length} profiles found</p>
        </div>
 
        <div className="browse-filters">
          <input type="text" className="form-input" placeholder="Search by name or city..."
            value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
          <select className="form-select" value={filterGender} onChange={e => setFilterGender(e.target.value)} style={{ maxWidth: 160 }}>
            <option value="">All Genders</option>
            <option>Male</option><option>Female</option><option>Non-Binary</option>
          </select>
        </div>
 
        {filtered.length === 0 ? (
          <div className="dash-empty"><p>No talent found matching your criteria.</p></div>
        ) : (
          <div className="talent-grid">
            {filtered.map(t => (
              <div key={t.id} className="talent-card" onClick={() => setViewingTalent(t)}>
                <div className="talent-card-photo">
                  {t.profilePhotoURL ? (
                    <img src={t.profilePhotoURL} alt="" />
                  ) : (
                    <div className="talent-card-placeholder">{(t.fullName || '?').charAt(0)}</div>
                  )}
                </div>
                <div className="talent-card-info">
                  <h4 className="talent-card-name">{t.fullName}</h4>
                  <p className="talent-card-meta">{t.gender} · {t.city}</p>
                  <p className="talent-card-meta">{t.height} · {t.bodyType}</p>
                  {t.skills?.length > 0 && (
                    <p className="talent-card-skills">{t.skills.slice(0, 3).join(', ')}{t.skills.length > 3 ? '...' : ''}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}