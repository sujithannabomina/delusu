// FILE: App.jsx (UPDATED for Phase 3)
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\App.jsx
// REPLACES: existing App.jsx — adds org dashboard, casting CRUD, talent dashboard, applications
 
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { auth } from './firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getUserDoc, createUserDoc, updateLastLogin } from './firebase/firestoreHelpers';
 
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
 
// Public pages
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refunds from './pages/Refunds';
 
// Onboarding
import OrgOnboarding from './pages/OrgOnboarding';
import TalentOnboarding from './pages/TalentOnboarding';
 
// Org pages
import OrgDashboard from './pages/OrgDashboard';
import CreateCasting from './pages/CreateCasting';
import MyCastings from './pages/MyCastings';
import CastingDetail from './pages/CastingDetail';
import BrowseTalent from './pages/BrowseTalent';
 
// Talent pages
import TalentDashboard from './pages/TalentDashboard';
import BrowseCastings from './pages/BrowseCastings';
import CastingApply from './pages/CastingApply';
import MyApplications from './pages/MyApplications';
 
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
 
export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const fetchUserData = useCallback(async (firebaseUser) => {
    if (!firebaseUser) { setUserData(null); return null; }
    try {
      const data = await getUserDoc(firebaseUser.uid);
      setUserData(data);
      return data;
    } catch (err) {
      console.error('Error fetching user data:', err);
      return null;
    }
  }, []);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) { await fetchUserData(firebaseUser); }
      else { setUserData(null); }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserData]);
 
  const handleGoogleLogin = async (accountType) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      let existingUser = await getUserDoc(firebaseUser.uid);
      if (!existingUser) {
        await createUserDoc(firebaseUser.uid, {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          accountType: accountType,
        });
        existingUser = await getUserDoc(firebaseUser.uid);
      } else {
        await updateLastLogin(firebaseUser.uid);
      }
      setUserData(existingUser);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Google sign-in error:', error);
        alert('Sign-in failed. Please try again.');
      }
    }
  };
 
  const handleLogout = async () => {
    try { await signOut(auth); setUserData(null); }
    catch (error) { console.error('Logout error:', error); }
  };
 
  const handleOnboardingComplete = async () => {
    if (user) { await fetchUserData(user); }
  };
 
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'DM Sans, sans-serif', color: '#888' }}>
        Loading...
      </div>
    );
  }
 
  const needsOnboarding = user && userData && !userData.onboardingComplete;
  const isOrg = userData?.accountType === 'organization';
  const isTalent = userData?.accountType === 'talent';
 
  return (
    <Router>
      <ScrollToTop />
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          {/* ─── PUBLIC ─── */}
          <Route path="/" element={<Home user={user} onGoogleLogin={handleGoogleLogin} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refunds" element={<Refunds />} />
 
          {/* ─── ONBOARDING ─── */}
          <Route path="/onboarding/organization" element={
            <ProtectedRoute user={user}>
              {needsOnboarding && isOrg ? <OrgOnboarding user={user} onComplete={handleOnboardingComplete} /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          } />
          <Route path="/onboarding/talent" element={
            <ProtectedRoute user={user}>
              {needsOnboarding && isTalent ? <TalentOnboarding user={user} onComplete={handleOnboardingComplete} /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          } />
 
          {/* ─── DASHBOARD (routes to correct dashboard based on account type) ─── */}
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              {needsOnboarding ? (
                <Navigate to={`/onboarding/${userData.accountType}`} replace />
              ) : isOrg ? (
                <OrgDashboard user={user} />
              ) : isTalent ? (
                <TalentDashboard user={user} userData={userData} />
              ) : (
                <div className="dash-loading">Unknown account type.</div>
              )}
            </ProtectedRoute>
          } />
 
          {/* ─── ORG: Post Casting ─── */}
          <Route path="/dashboard/post" element={
            <ProtectedRoute user={user}>
              {isOrg ? <CreateCasting user={user} /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          } />
 
          {/* ─── ORG: My Castings List ─── */}
          <Route path="/dashboard/castings" element={
            <ProtectedRoute user={user}>
              {isOrg ? (
                <MyCastings user={user} />
              ) : isTalent ? (
                <BrowseCastings />
              ) : (
                <Navigate to="/dashboard" replace />
              )}
            </ProtectedRoute>
          } />
 
          {/* ─── CASTING DETAIL (org sees applicants, talent sees apply button) ─── */}
          <Route path="/dashboard/castings/:id" element={
            <ProtectedRoute user={user}>
              {isOrg ? (
                <CastingDetail user={user} />
              ) : isTalent ? (
                <CastingApply user={user} userData={userData} />
              ) : (
                <Navigate to="/dashboard" replace />
              )}
            </ProtectedRoute>
          } />
 
          {/* ─── ORG: Browse Talent ─── */}
          <Route path="/dashboard/talent" element={
            <ProtectedRoute user={user}>
              {isOrg ? <BrowseTalent /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          } />
 
          {/* ─── TALENT: My Applications ─── */}
          <Route path="/dashboard/applications" element={
            <ProtectedRoute user={user}>
              {isTalent ? <MyApplications user={user} /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          } />
 
          {/* ─── PROFILE (placeholder for now) ─── */}
          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <div className="static-page">
                <div className="container-narrow" style={{ textAlign: 'center' }}>
                  <h1 className="serif">Edit Profile</h1>
                  <p className="page-subtitle">Full profile editing coming in the next update.</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}