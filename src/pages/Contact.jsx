import './Static.css';

export default function Contact() {
  const handleSubmit = (e) => { e.preventDefault(); alert('Contact form will be connected to Firebase in Phase 2.'); };
  return (
    <div className="static-page">
      <div className="container-narrow">
        <h1 className="serif">Contact Us</h1>
        <p className="page-subtitle">Have a question or partnership inquiry? We'd love to hear from you.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group"><label className="form-label">Your Name *</label><input type="text" className="form-input" placeholder="Full name" required /></div>
          <div className="form-group"><label className="form-label">Email Address *</label><input type="email" className="form-input" placeholder="your@email.com" required /></div>
          <div className="form-group"><label className="form-label">Subject *</label>
            <select className="form-select" required><option value="">Select topic...</option><option>General Inquiry</option><option>Account Issue</option><option>Billing & Payment</option><option>Report Suspicious Activity</option><option>Partnership / Collaboration</option><option>Technical Support</option><option>Feedback / Suggestion</option><option>Other</option></select>
          </div>
          <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" placeholder="Tell us how we can help..." required style={{ minHeight: 140 }} /></div>
          <button type="submit" className="btn btn-primary btn-full btn-large">Send Message</button>
        </form>
        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <p><strong>Email:</strong> support@delesu.com</p>
          <p><strong>Response Time:</strong> Within 24 hours on business days.</p>
          <p><strong>Parent Company:</strong> MarchSeptember</p>
        </div>
      </div>
    </div>
  );
}