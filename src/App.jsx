import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refunds from './pages/Refunds';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async (accountType) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(`Signed in as ${accountType}:`, result.user.displayName);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Google sign-in error:', error);
        alert('Sign-in failed. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error('Logout error:', error); }
  };

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'DM Sans, sans-serif', color:'#888' }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} onGoogleLogin={handleGoogleLogin} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/dashboard" element={
            user ? (
              <div className="static-page"><div className="container-narrow" style={{textAlign:'center'}}>
                <h1 className="serif">Welcome, {user.displayName || 'User'}!</h1>
                <p className="page-subtitle">Your dashboard is coming soon. We'll build it together in Phase 2.</p>
              </div></div>
            ) : (
              <div className="static-page"><div className="container-narrow" style={{textAlign:'center'}}>
                <h1 className="serif">Please Sign In</h1>
                <p className="page-subtitle">Go to the <a href="/#org-section" style={{textDecoration:'underline'}}>Home page</a> and sign in with Google to access your dashboard.</p>
              </div></div>
            )
          } />
          <Route path="/profile" element={
            user ? (
              <div className="static-page"><div className="container-narrow" style={{textAlign:'center'}}>
                <h1 className="serif">Edit Profile</h1>
                <p className="page-subtitle">Profile editing will be available in Phase 2.</p>
              </div></div>
            ) : (
              <div className="static-page"><div className="container-narrow" style={{textAlign:'center'}}>
                <h1 className="serif">Please Sign In</h1>
                <p className="page-subtitle">Go to the <a href="/#org-section" style={{textDecoration:'underline'}}>Home page</a> and sign in with Google first.</p>
              </div></div>
            )
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
