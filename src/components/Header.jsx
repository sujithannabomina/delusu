import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/faq', label: 'FAQ' },
    { to: '/refunds', label: 'Refunds' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Policy' },
  ];

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="header-logo">
          <span className="header-logo-mark">D</span>
          <span className="header-logo-text">DELESU</span>
        </Link>

        <nav className={`header-nav ${mobileOpen ? 'header-nav--open' : ''}`}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`header-nav-link ${location.pathname === link.to ? 'header-nav-link--active' : ''}`}
              onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {user && (
            <div className="header-nav-mobile-actions">
              <Link to="/dashboard" className="btn btn-outline btn-full" onClick={() => setMobileOpen(false)}>My Dashboard</Link>
              <button className="btn btn-outline btn-full" onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </nav>

        {user ? (
          <div className="header-actions">
            <div className="header-profile-wrap">
              <button className="header-profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <span className="header-avatar">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="header-avatar-img" />
                  ) : (
                    <span className="header-avatar-letter">
                      {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
                <span className="header-profile-name">
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
                <span className={`header-profile-arrow ${profileOpen ? 'open' : ''}`}>▾</span>
              </button>
              {profileOpen && (
                <div className="header-dropdown">
                  <div className="header-dropdown-info">
                    <p className="header-dropdown-name">{user.displayName || 'User'}</p>
                    <p className="header-dropdown-email">{user.email}</p>
                  </div>
                  <div className="header-dropdown-divider" />
                  <Link to="/dashboard" className="header-dropdown-item" onClick={() => setProfileOpen(false)}>My Dashboard</Link>
                  <Link to="/profile" className="header-dropdown-item" onClick={() => setProfileOpen(false)}>Edit Profile</Link>
                  <div className="header-dropdown-divider" />
                  <button className="header-dropdown-item header-dropdown-logout" onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="header-actions" />
        )}

        <button className="header-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
        </button>
      </div>
      {profileOpen && <div className="header-overlay" onClick={() => setProfileOpen(false)} />}
    </header>
  );
}
