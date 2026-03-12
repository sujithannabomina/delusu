import { Link } from 'react-router-dom';
import { CANDIDATE_PLANS, CASTING_TIERS } from '../utils/constants';
import './Home.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
);

const ORG_BENEFITS = [
  { title: "Post Any Type of Casting Call", desc: "TV commercials, print ads, billboards, digital campaigns, fashion runway, film roles, corporate videos, events — 59 casting types across 3 pricing tiers." },
  { title: "Access Every Age & Type of Talent", desc: "From 6-month-old babies for diaper ads to 80+ seniors for insurance campaigns. Children, teens, adults, elderly — every face you need." },
  { title: "Browse Verified Portfolios for Free", desc: "View complete profiles with professional photos, physical stats, skills, and experience. Filter by age, gender, height, body type, skin tone, and location — all without paying." },
  { title: "Free Dashboard & Profile", desc: "Create your organization profile, access your dashboard, browse talent, and manage everything — completely free. You only pay when you post a casting call." },
  { title: "All Casting Categories Covered", items: [
    "TV & Digital Commercials", "Print Ads & Billboards / Hoardings", "Fashion Runway / Catwalk Shows",
    "Magazine Editorials & Lookbooks", "Bollywood / Tollywood / Web Series", "Short Films & Music Videos",
    "Background Extras & Body Doubles", "Hand, Foot & Hair Modeling", "Fitness & Athletic Campaigns",
    "Corporate & Training Videos", "Government PSAs & Social Campaigns", "Healthcare & Pharmaceutical Ads",
    "Real Estate & Property Promos", "Product Packaging & E-Commerce", "Brand Ambassador Programs",
    "Trade Shows & Exhibition Models", "Mall Activations & Promo Events", "Voiceover & Dubbing Artists",
    "Stunt Performers & Dance Acts", "Baby / Child / Family Campaigns", "Senior / Elderly Model Campaigns",
    "Bridal & Jewellery Shoots", "Swimwear & Lingerie Campaigns", "Streetwear & Urban Fashion",
    "Plus-Size & Petite Modeling", "Theatre & Stage Performances", "Reality TV & Game Show Casting",
  ]},
  { title: "Receive Applications Instantly", desc: "Talent applies directly to your posting. Review portfolios, shortlist candidates, and contact them — all from your dashboard." },
  { title: "Pay Per Post, Not Per Month", desc: "No subscriptions. No recurring charges. You pay only when you post a casting call. Each post stays active for 30 days." },
  { title: "Location-Based Discovery", desc: "Find talent in Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Jaipur, or any city across India." },
  { title: "Verified Organization Badge", desc: "Get a verified badge to build trust with talent. Verified organizations receive more and better applications." },
];

const MODEL_BENEFITS = [
  { title: "Create a Stunning Portfolio for Free", desc: "Build your professional profile with up to 10 high-quality photos, physical attributes, skills, experience, and a personal bio — all before paying anything." },
  { title: "Get Discovered by Top Brands", desc: "Organizations, ad agencies, film producers, fashion brands, and event companies actively search for talent on Delesu." },
  { title: "Apply to Casting Calls Directly", desc: "Browse hundreds of live casting calls. Apply with one click — your full portfolio goes to the organization. Unlimited applications once activated." },
  { title: "Every Kind of Opportunity", items: [
    "Commercial Modeling (TV, Print, Digital)", "Fashion Runway / Catwalk", "Editorial & Magazine Shoots",
    "Film & Web Series Acting Roles", "Music Video Appearances", "Background / Extras Work",
    "Corporate & Brand Videos", "Event & Trade Show Hosting", "Fitness & Sports Modeling",
    "Hand, Foot & Hair Modeling", "Child & Baby Modeling (with parent)", "Senior / Mature Modeling",
    "Plus-Size & Petite Modeling", "Bridal & Jewellery Modeling", "Product & E-Commerce Modeling",
    "Voiceover & Dubbing Work", "Dance & Performance Roles", "Brand Ambassador Roles",
    "Real People / Character Casting", "Stunt & Action Roles",
  ]},
  { title: "No Experience Required for Many Roles", desc: "Many casting calls specifically look for fresh faces — real people, not just professional models. Babies, kids, seniors, families — everyone has a place." },
  { title: "One-Time Payment, One Full Year", desc: "No monthly subscriptions. Pay once and your profile stays active and visible for a full year. Choose how many talent categories you want to be listed under." },
  { title: "Track Your Applications", desc: "See which castings you've applied to, check if you've been shortlisted or selected, and manage your profile — all from your personal dashboard." },
  { title: "Your Profile Works 24/7", desc: "Once your portfolio is live, organizations can discover you even when you're sleeping. Your profile is your always-on talent card." },
  { title: "Safe & Verified Platform", desc: "All organizations are reviewed. Report suspicious activity anytime. Your contact details are shared only after you apply to a casting." },
];

export default function Home({ user, onGoogleLogin }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-in">
            <p className="hero-label">India's Casting & Talent Marketplace</p>
            <h1 className="hero-title serif">Where Organizations Find Talent.<br/>Where Talent Gets Found.</h1>
            <p className="hero-subtitle">Delesu connects casting directors, brands, agencies, and producers with models, actors, and talent of every age — from babies to seniors — across India.</p>
            <div className="hero-actions">
              <a href="#org-section" className="btn btn-primary btn-large">I'm Hiring Talent ↓</a>
              <a href="#model-section" className="btn btn-outline btn-large">I Am Talent ↓</a>
            </div>
          </div>
          <div className="hero-stats animate-in animate-delay-2">
            {[{ n:"59", l:"Casting Types" },{ n:"50", l:"Talent Categories" },{ n:"All Ages", l:"0 to 80+ Years" },{ n:"Pan India", l:"Every Major City" }].map((s,i) => (
              <>{i > 0 && <div className="hero-stat-divider" />}<div key={i} className="hero-stat"><span className="hero-stat-num serif">{s.n}</span><span className="hero-stat-label">{s.l}</span></div></>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <h2 className="section-title serif">How Delesu Works</h2>
          <p className="section-subtitle">Simple for both sides — post or apply in minutes.</p>
          <div className="how-grid">
            {[
              { num:"01", title:"Organizations Post", desc:"Create a casting call with your requirements — age, look, skills, budget. Pay per post. Active for 30 days." },
              { num:"02", title:"Talent Discovers", desc:"Models and actors find matching casting calls and apply with one click. Full portfolio reaches the organization instantly." },
              { num:"03", title:"Review & Shortlist", desc:"Browse applicant profiles, view portfolios, compare candidates, and shortlist your picks from the dashboard." },
              { num:"04", title:"Connect & Book", desc:"Contact shortlisted talent directly, schedule auditions, negotiate terms, and finalize the booking." },
            ].map((step,i) => (
              <div key={i} className={`how-card animate-in animate-delay-${i+1}`}>
                <span className="how-num">{step.num}</span>
                <h3 className="how-title">{step.title}</h3>
                <p className="how-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border" id="org-section">
        <div className="container">
          <h2 className="section-title serif">Choose Your Path</h2>
          <p className="section-subtitle">Read what Delesu offers, then sign in below.</p>
          <div className="two-col">

            <div className="col-panel">
              <div className="col-header col-header--org">
                <span className="col-icon">🏢</span>
                <h3 className="col-title">For Organizations</h3>
                <p className="col-desc">Agencies, brands, producers, companies — anyone looking to hire talent.</p>
              </div>
              <div className="col-body">
                {ORG_BENEFITS.map((item,i) => (
                  <div key={i} className="benefit-item">
                    <h4 className="benefit-title"><span className="benefit-arrow">→</span> {item.title}</h4>
                    {item.desc && <p className="benefit-desc">{item.desc}</p>}
                    {item.items && <ul className="benefit-list">{item.items.map((li,j) => <li key={j} className="benefit-list-item"><span className="benefit-check">✓</span> {li}</li>)}</ul>}
                  </div>
                ))}
                <div className="pricing-section">
                  <h4 className="pricing-heading">Casting Post Pricing</h4>
                  <p className="pricing-subheading">Pay per post. No subscriptions. Each post active for 30 days.</p>
                  <div className="pricing-cards">
                    {Object.entries(CASTING_TIERS).map(([key,tier]) => (
                      <div key={key} className="pricing-card" style={{borderLeftColor:tier.color}}>
                        <div className="pricing-card-header">
                          <h5 className="pricing-plan">{tier.label}</h5>
                          <div className="pricing-price"><span className="pricing-amount serif">{tier.priceDisplay}</span><span className="pricing-period">/ per post / {tier.duration}</span></div>
                        </div>
                        <p className="pricing-tier-desc">{tier.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="pricing-note">Price is determined by the casting type you select. Dashboard & talent browsing are free.</p>
                </div>
                <div className="col-cta">
                  {user ? (
                    <div className="col-cta-loggedin">
                      <span className="col-cta-check">✓</span>
                      <p className="col-cta-welcome">Signed in as <strong>{user.displayName || user.email}</strong></p>
                      <Link to="/dashboard" className="btn btn-primary btn-large btn-full">Go to Dashboard →</Link>
                    </div>
                  ) : (
                    <><p className="col-cta-prompt">Ready to get started? Sign in to create your organization profile and post casting calls.</p>
                    <button className="btn btn-outline btn-large btn-full google-login-btn" onClick={() => onGoogleLogin('organization')}><GoogleIcon /> Continue with Google as Organization</button></>
                  )}
                </div>
              </div>
            </div>

            <div className="col-panel" id="model-section">
              <div className="col-header col-header--model">
                <span className="col-icon">⭐</span>
                <h3 className="col-title">For Models & Talent</h3>
                <p className="col-desc">Anyone — models, actors, dancers, kids, seniors — create your portfolio and get discovered.</p>
              </div>
              <div className="col-body">
                {MODEL_BENEFITS.map((item,i) => (
                  <div key={i} className="benefit-item">
                    <h4 className="benefit-title"><span className="benefit-arrow benefit-arrow--right">←</span> {item.title}</h4>
                    {item.desc && <p className="benefit-desc">{item.desc}</p>}
                    {item.items && <ul className="benefit-list">{item.items.map((li,j) => <li key={j} className="benefit-list-item"><span className="benefit-check">✓</span> {li}</li>)}</ul>}
                  </div>
                ))}
                <div className="pricing-section">
                  <h4 className="pricing-heading">Talent Plans</h4>
                  <p className="pricing-subheading">One-time payment. Profile active for 1 full year. No recurring charges.</p>
                  <div className="pricing-cards">
                    {CANDIDATE_PLANS.map(plan => (
                      <div key={plan.id} className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}>
                        {plan.popular && <span className="pricing-popular-badge">Most Popular</span>}
                        <div className="pricing-card-header">
                          <h5 className="pricing-plan">{plan.label}</h5>
                          <div className="pricing-price"><span className="pricing-amount serif">{plan.priceDisplay}</span><span className="pricing-period">/ one-time / {plan.duration}</span></div>
                        </div>
                        <p className="pricing-tier-desc">Up to {plan.categoryLimit} talent categories</p>
                        <ul className="pricing-features">{plan.features.map((f,j) => <li key={j}><span className="benefit-check">✓</span> {f}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                  <p className="pricing-note">Complete your profile for free. Pay only when you're ready to activate and select categories.</p>
                </div>
                <div className="col-cta">
                  {user ? (
                    <div className="col-cta-loggedin">
                      <span className="col-cta-check">✓</span>
                      <p className="col-cta-welcome">Signed in as <strong>{user.displayName || user.email}</strong></p>
                      <Link to="/dashboard" className="btn btn-primary btn-large btn-full">Go to Dashboard →</Link>
                    </div>
                  ) : (
                    <><p className="col-cta-prompt">Ready to get discovered? Sign in to create your portfolio for free.</p>
                    <button className="btn btn-outline btn-large btn-full google-login-btn" onClick={() => onGoogleLogin('talent')}><GoogleIcon /> Continue with Google as Talent</button></>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <h2 className="section-title serif">Who Can Be on Delesu?</h2>
          <p className="section-subtitle">Literally anyone. Here's a glimpse of who casting calls are made for.</p>
          <div className="who-grid">
            {[
              { emoji:"👶", label:"Babies (0-2)", example:"Diaper ads, baby food, insurance" },
              { emoji:"🧒", label:"Toddlers (3-5)", example:"Toy ads, nursery brands, education" },
              { emoji:"👦", label:"Children (6-12)", example:"School campaigns, clothing, FMCG" },
              { emoji:"🧑‍🎓", label:"Teens (13-17)", example:"Youth brands, edtech, sports gear" },
              { emoji:"👩", label:"Young Adults (18-24)", example:"Fashion, beauty, lifestyle, film" },
              { emoji:"👨‍💼", label:"Adults (25-44)", example:"Corporate, real estate, auto, tech" },
              { emoji:"🧑‍🦳", label:"Middle-Aged (45-60)", example:"Finance, health, family insurance" },
              { emoji:"👴", label:"Seniors (60+)", example:"Life insurance, retirement, pharma" },
              { emoji:"👨‍👩‍👧", label:"Families & Couples", example:"Holiday ads, home appliances" },
              { emoji:"🤸", label:"Fitness / Athletes", example:"Supplement, sportswear, gym" },
              { emoji:"✋", label:"Hand / Foot Models", example:"Jewellery, watches, skincare" },
              { emoji:"🎭", label:"Character / Real People", example:"Brands wanting authentic faces" },
            ].map((item,i) => (
              <div key={i} className="who-card">
                <span className="who-emoji">{item.emoji}</span>
                <h4 className="who-label">{item.label}</h4>
                <p className="who-example">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="final-cta">
            <h2 className="serif final-cta-title">Ready to Get Started?</h2>
            <p className="final-cta-desc">Whether you're a brand casting for a baby in a diaper ad, a film house looking for lead actors, or a teenager dreaming of the runway — Delesu is your platform.</p>
            <div className="final-cta-buttons">
              <a href="#org-section" className="btn btn-primary btn-large">I'm Hiring Talent</a>
              <a href="#model-section" className="btn btn-outline btn-large">I Am Talent</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
