import './Static.css';

export default function Refunds() {
  return (
    <div className="static-page">
      <div className="container-narrow">
        <h1 className="serif">Refund Policy</h1>
        <p className="page-subtitle">Last updated: March 2026</p>
        <p>This policy applies to all paid services on Delesu (delesu.com), operated by MarchSeptember.</p>
        <h2>1. Talent Account Activation</h2>
        <p>One-time fee (₹7,499 / ₹13,499 / ₹20,499) to activate profile for 1 year.</p>
        <h2>2. Talent Refund Eligibility</h2>
        <p><strong>Within 48 hours AND no applications sent:</strong> Full refund. Account reverts to unpaid status.</p>
        <p><strong>After 48 hours OR after applying:</strong> No refund.</p>
        <h2>3. Organization Casting Posts</h2>
        <p>Pay per post (₹7,999 / ₹15,999 / ₹24,999). Active for 30 days each.</p>
        <h2>4. Organization Refund Eligibility</h2>
        <p><strong>Within 48 hours AND 0 applications received:</strong> Full refund. Casting removed.</p>
        <p><strong>After 48 hours OR after receiving applications:</strong> No refund.</p>
        <p><strong>Early closure:</strong> No refund for unused days.</p>
        <h2>5. Technical Errors</h2>
        <p>If payment charged but service not activated due to technical error: full refund or manual correction.</p>
        <h2>6. How to Request a Refund</h2>
        <p>Email support@delesu.com with: registered email, service paid for, payment date, and reason.</p>
        <p>Eligible refunds processed within 5–7 business days via Razorpay to original payment method.</p>
        <h2>7. Non-Refundable</h2>
        <ul><li>Accounts after 48 hours or after usage</li><li>Castings after 48 hours or after applications</li><li>Early-closed castings</li><li>Category upgrade fees</li></ul>
        <h2>8. Disputes</h2>
        <p>Contact support@delesu.com before raising bank disputes.</p>
        <h2>9. Contact</h2>
        <p>support@delesu.com · MarchSeptember · India</p>
      </div>
    </div>
  );
}