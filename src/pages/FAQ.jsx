import { useState } from 'react';
import './Static.css';

const faqs = [
  { q: "What is Delesu?", a: "Delesu is India's casting and talent marketplace. It connects organizations (brands, ad agencies, film producers, event companies) with models, actors, and talent of every age — from babies to seniors." },
  { q: "Who can register as talent on Delesu?", a: "Anyone! Whether you're a professional model, an aspiring actor, a baby (through parent/guardian), a teenager, a working adult, or a senior citizen — Delesu welcomes all ages and types." },
  { q: "What types of casting calls are posted?", a: "TV commercials, print ads, billboards, fashion runway, film roles, music videos, corporate videos, product shoots, trade shows, and much more — 59 casting types in total." },
  { q: "Is it free to create a profile?", a: "Yes! Talent can sign in, complete their full profile (photos, attributes, skills, bio) — all for free. Payment is only required when you want to activate your profile by selecting talent categories." },
  { q: "How does talent pricing work?", a: "One-time payment for 1 full year. Essential (₹7,499) = 4 categories. Professional (₹13,499) = 9 categories. Elite (₹20,499) = 14 categories. More categories = more visibility." },
  { q: "How does organization pricing work?", a: "Free dashboard and talent browsing. Pay per casting post: Standard (₹7,999), Professional (₹15,999), or Premium (₹24,999). Each post stays active for 30 days." },
  { q: "Are there any monthly subscriptions?", a: "No. Delesu uses a pay-per-use model. Talent pays once per year. Organizations pay per casting post. No recurring charges." },
  { q: "How do I upload my portfolio?", a: "During profile setup, upload up to 10 photos. First photo becomes your profile picture. JPG and PNG accepted, up to 5MB each." },
  { q: "Can a child or baby be registered?", a: "Yes. A parent or legal guardian must create and manage the profile. The parent's contact is used for all communication." },
  { q: "Is my personal information safe?", a: "Yes. Your contact details are shared only after you apply to a casting call. Organizations must be registered and can be verified." },
  { q: "What happens after I apply?", a: "The organization receives your full portfolio. If interested, they shortlist you and contact you. Track all applications from your dashboard." },
  { q: "What happens when my account expires?", a: "Profile becomes invisible but all data is preserved. Pay again to reactivate for another year." },
  { q: "Can I change my talent categories?", a: "Yes! Swap categories within your plan limit anytime. To add more beyond your limit, upgrade by paying the difference." },
  { q: "How do organizations get verified?", a: "Apply for a Verified badge with GST number, company registration, or business website. Reviewed within 2-3 business days." },
  { q: "Can I get a refund?", a: "Within 48 hours of payment and if you haven't used paid features, you're eligible for a full refund. See our Refund Policy." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="static-page">
      <div className="container-narrow">
        <h1 className="serif">Frequently Asked Questions</h1>
        <p className="page-subtitle">Everything you need to know about Delesu.</p>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              {faq.q}
              <span className={`faq-arrow ${openIndex === i ? 'open' : ''}`}>▼</span>
            </button>
            {openIndex === i && <div className="faq-answer">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}