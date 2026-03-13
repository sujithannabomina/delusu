// FILE: CastingApply.jsx
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\pages\CastingApply.jsx
// PURPOSE: Talent views a single casting call detail and applies
 
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCasting, hasApplied, applyToCasting, getTalentProfile } from '../firebase/firestoreHelpers';
import './Dashboard.css';
 
export default function CastingApply({ user, userData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [casting, setCasting] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    async function load() {
      const [c, didApply] = await Promise.all([
        getCasting(id),
        hasApplied(user.uid, id),
      ]);
      setCasting(c);
      setAlreadyApplied(didApply);
      setLoading(false);
    }
    load();
  }, [id, user.uid]);
 
  const handleApply = async () => {
    setError('');
 
    // Check if talent is the org that posted this
    if (casting.orgId === user.uid) {
      return setError("You can't apply to your own casting.");
    }
 
    const confirmMsg = `Your full portfolio (photos, attributes, bio, contact info) will be shared with ${casting.orgName}. Continue?`;
    if (!window.confirm(confirmMsg)) return;
 
    setApplying(true);
 
    try {
      const talentProfile = await getTalentProfile(user.uid);
 
      // Calculate age
      let talentAge = '';
      if (talentProfile?.dateOfBirth) {
        const dob = new Date(talentProfile.dateOfBirth);
        talentAge = String(Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)));
      }
 
      await applyToCasting({
        castingId: id,
        castingTitle: casting.title,
        talentId: user.uid,
        talentName: talentProfile?.fullName || user.displayName || 'Unknown',
        talentPhoto: talentProfile?.profilePhotoURL || '',
        talentCity: talentProfile?.city || '',
        talentAge,
        talentGender: talentProfile?.gender || '',
        talentCategories: talentProfile?.selectedCategories || [],
        orgId: casting.orgId,
      });
 
      setApplied(true);
      setAlreadyApplied(true);
    } catch (err) {
      if (err.message === 'ALREADY_APPLIED') {
        setAlreadyApplied(true);
        setError("You've already applied to this casting.");
      } else {
        console.error('Apply error:', err);
        setError('Failed to apply. Please try again.');
      }
      setApplying(false);
    }
  };
 
  if (loading) return <div className="dash-loading">Loading casting details...</div>;
  if (!casting) return <div className="dash-loading">Casting not found.</div>;
 
  const deadlineDate = casting.deadline?.toDate ? casting.deadline.toDate() : new Date(casting.deadline);
  const daysLeft = Math.max(0, Math.ceil((deadlineDate - Date.now()) / (1000 * 60 * 60 * 24)));
  const isExpired = casting.status !== 'active';
 
  return (
    <div className="dash-page">
      <div className="container-narrow">
        <button className="dash-back" onClick={() => navigate(-1)}>← Back</button>
 
        <div className="casting-detail-card">
          <div className="casting-detail-top">
            <div>
              <span className="dash-casting-org">{casting.orgName}{casting.orgVerified ? ' ✓' : ''}</span>
              <h1 className="casting-detail-title serif">{casting.title}</h1>
              <p className="casting-detail-meta">
                {casting.castingTypeLabel} · {casting.location} · {casting.ageRange} · {casting.gender}
              </p>
              <p className="casting-detail-meta">
                Budget: {casting.budget} · Duration: {casting.shootDuration || 'Not specified'}
              </p>
              <p className="casting-detail-meta">
                Deadline: {deadlineDate.toLocaleDateString('en-IN')} ({daysLeft} days left) · {casting.applicantCount || 0} applicants
              </p>
            </div>
            <span className={`dash-casting-status dash-casting-status--${casting.status}`}>{casting.status}</span>
          </div>
 
          <div className="casting-detail-body">
            <h3 className="casting-detail-heading">About This Role</h3>
            <p className="casting-detail-desc">{casting.description}</p>
 
            {casting.requirements && (
              <>
                <h3 className="casting-detail-heading">Requirements</h3>
                <p className="casting-detail-req">{casting.requirements}</p>
              </>
            )}
 
            {(casting.preferredHeight || casting.preferredBodyType || casting.preferredSkinTone) && (
              <>
                <h3 className="casting-detail-heading">Preferred Attributes</h3>
                <div className="talent-view-attrs">
                  {casting.preferredHeight && <span>Height: {casting.preferredHeight}</span>}
                  {casting.preferredBodyType && <span>Body Type: {casting.preferredBodyType}</span>}
                  {casting.preferredSkinTone && <span>Skin Tone: {casting.preferredSkinTone}</span>}
                </div>
              </>
            )}
 
            {casting.preferredSkills?.length > 0 && (
              <>
                <h3 className="casting-detail-heading">Skills Needed</h3>
                <div className="talent-view-tags">
                  {casting.preferredSkills.map(s => <span key={s} className="talent-tag">{s}</span>)}
                </div>
              </>
            )}
          </div>
 
          {/* Apply section */}
          <div className="casting-apply-section">
            {error && <div className="dash-error" style={{ marginBottom: 12 }}>{error}</div>}
 
            {isExpired ? (
              <div className="dash-notice dash-notice--warning">
                <p>This casting is {casting.status}. No new applications are being accepted.</p>
              </div>
            ) : alreadyApplied || applied ? (
              <div className="casting-applied-badge">
                <span className="col-cta-check">✓</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#16a34a' }}>Application Submitted!</p>
                  <p style={{ fontSize: 13, color: '#888' }}>The organization will review your portfolio and reach out if shortlisted.</p>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary btn-full btn-large" onClick={handleApply} disabled={applying}
                style={{ opacity: applying ? 0.6 : 1 }}>
                {applying ? 'Applying...' : 'Apply for This Role'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}