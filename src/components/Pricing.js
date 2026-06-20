import React from 'react';
const PLANS = [
  { name: "Foundation", price: "$10–$20", unit: "/device/mo", featured: false, features: ["Business hours support", "24/7 critical alerts", "Basic SIEM monitoring", "Monthly reports", "Email support"] },
  { name: "Standard", price: "$50–$150", unit: "/user/mo", featured: true, badge: "Most Popular", features: ["24/7/365 SOC coverage", "Full incident response", "Threat intelligence", "Compliance dashboards", "Client portal access", "Quarterly reviews"] },
  { name: "Advanced MDR", price: "$200+", unit: "/user/mo", featured: false, features: ["Everything in Standard", "Active threat hunting", "Malware reverse engineering", "Full compliance suite", "Direct engineer access", "Custom SIEM rules"] },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        {/* <ThreatMapCanvas /> */}
        <div className="section__header">
          <h2>Transparent Pricing</h2>
          <p>Predictable monthly pricing that scales with your business. No hidden fees.</p>
        </div>
        <div className="pricing__grid">
          {PLANS.map((p) => (
            <div key={p.name} className={"price-card glass-card" + (p.featured ? " price-card--featured" : "")}>
              {p.badge && <div className="price-card__badge">{p.badge}</div>}
              <h3 className="price-card__name">{p.name}</h3>
              <div className="price-card__price">{p.price}<span className="price-card__unit">{p.unit}</span></div>
              <div className="price-card__divider" />
              <ul className="price-card__features">
                {p.features.map((f) => <li key={f}><span className="green" style={{color:"green"}}>✓</span> {f}</li>)}
              </ul>
              <a href="/login" className={"btn btn--full " + (p.featured ? "btn--primary" : "btn--ghost")}>Get Started</a>
            </div>
          ))}
        </div>
        <div className="pricing__note glass-card">
          <div className="pricing__note-item"><strong className="green">$1,750–$3,750/mo</strong><span className="dim">Small Business (1–50 Users)</span></div>
          <div className="pricing__note-divider" />
          <div className="pricing__note-item"><strong className="green">$10,000–$20,000/mo</strong><span className="dim">Mid-Market (51–250 Users)</span></div>
          <div className="pricing__note-divider" />
          <p className="dim" style={{ fontSize: "13px", margin: 0 }}>One-time setup fee = 1 month service. Annual agreements available. Net 30 payment terms.</p>
        </div>
      </div>
    </section>
  );
}