import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-mark">D</span>
              <span className="footer-logo-text">DELESU</span>
            </div>
            <p className="footer-tagline">
              India's casting and talent marketplace. Connecting organizations with models,
              actors, and talent of every age and type.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/refunds" className="footer-link">Refund Policy</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Get Started</h4>
            <a href="/#org-section" className="footer-link">For Organizations</a>
            <a href="/#model-section" className="footer-link">For Models & Talent</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Delesu — A MarchSeptember Product. All rights reserved.</p>
          <p className="footer-bottom-sub">Built in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
