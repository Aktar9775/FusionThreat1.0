import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0px", marginBottom: "12px" }}>
              <img src="/loc.png" alt="FusionThreat Logo" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
              <span style={{ fontFamily: "var(--head)", fontSize: "18px", fontWeight: "600", letterSpacing: "0.02em" }}>
                Fusion<strong style={{ color: "var(--red)" }}>Threat</strong>
              </span>
            </div>
            <p className="dim footer__tagline">Enterprise-grade Managed Security Service Provider. SOC protection 24/7/365.</p>
            <a href="mailto:support@fusionthreat.com" className="contact__link">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-10" />
                <path d="M3 7l9 6l9-6" />
              </svg>{" "}support@fusionthreat.com
            </a>
            <div className="footer__certs">
              <span className="tag tag--dim">CISSP Certified</span>
              <span className="tag tag--dim">MITRE ATT&CK</span>
              <span className="tag tag--dim">NIST CSF</span>
            </div>
          </div>
         {[
  {
    title: "Services",
    links: [
      { label: "24/7 Monitoring",     href: "#services" },
      { label: "Incident Response",   href: "#services" },
      { label: "Vulnerability Mgmt",  href: "#services" },
      { label: "Compliance",          href: "#services" },
      { label: "Threat Hunting",      href: "#services" },
    ]
  },
  {
    title: "Platform",
    links: [
      { label: "SOC Dashboard",  href: "#socdashboard" },
      { label: "Threat Map",     href: "#threatmap" },
      { label: "Ticketing",      href: "#ticketing" },
      { label: "Pricing",        href: "#pricing" },
      { label: "Client Portal",  href: "ClientPage.html" },
    ]
  },
  {
    title: "Contact",
    links: [
      { label: "support@fusionthreat.com", href: "mailto:support@fusionthreat.com" },
      { label: "www.fusionthreat.com",     href: "https://www.fusionthreat.com" },
      { label: "Book Assessment",          href: "#contact" },
      { label: "Submit Ticket",            href: "#ticketing" },
      { label: "Client Login",             href: "ClientPage.html" },
    ]
  },
].map((col) => (
  <div key={col.title} className="footer__col">
    <h4 className="footer__col-title">{col.title}</h4>
    <ul>
      {col.links.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="dim">{l.label}</a>
        </li>
      ))}
    </ul>
  </div>
))}
        </div>
        <div className="footer__bottom">
          <span className="dim">© 2026 FUSIONTHREAT. ALL RIGHTS RESERVED.</span>
          <span className="dim">PROTECTING YOUR BUSINESS. SECURING YOUR FUTURE.</span>
        </div>
      </div>
    </footer>
  );
}
