import React, { useState } from 'react';



const SERVICES = [
  {
    num: "01", title: "24/7 Monitoring & Triage",
    desc: "Continuous visibility across endpoints, cloud, and network with real-time SIEM correlation and automated alerting.",
    tags: ["Centralized SIEM log analysis", "Multi-source threat correlation", "Cloud, network, endpoint coverage","Automated + human validation"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M6 8l3 3 2-2 3 4 2-2" /></svg>,
  },
  {
    num: "02", title: "Incident Response",
    desc: "Speed is critical. Our IR team follows strict SLAs to isolate and neutralize attacks before significant damage occurs.",
    tags: ["<15 min critical response", "Threat isolation & containment", "Root cause analysis", "Post-incident reporting"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7L12 2z" /><path d="M12 8v4M12 16h.01" /></svg>,
  },
  {
    num: "03", title: "Vulnerability Management",
    desc: "Proactive identification of security gaps before attackers exploit them. Monthly assessments included.",
    tags: ["Monthly vulnerability scans", "Critical patching <24hr", "Penetration testing","Remediation guidance"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v3l2 2" /></svg>,
  },
  {
    num: "04", title: "Compliance Enablement",
    desc: "Navigate GDPR, HIPAA, SOC 2, and ISO 27001 with automated reporting, dashboards, and audit support.",
    tags: ["Automated Compliance dashboards", "Audit preparation & support", "Gap analysis & planning","Evidence collection "],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12l2 2 4-4" /></svg>,
  },
  {
    num: "05", title: "Threat Hunting",
    desc: "Proactive search for hidden threats using XDR that evade automated detection systems.",
    tags: ["Hypothesis-driven & hunting", "Behavioral pattern analysis", "IOC identification","Custom detection rule development"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7L12 2z" /><path d="M9 12l2 2 4-4M12 7v1" /></svg>,
  },
  {
    num: "06", title: "Cloud Security",
    desc: "Protect AWS, Azure, and GCP with dedicated cloud monitoring and posture management.",
    tags: ["Cloud Workload protection", "Identity & Access monitoring", "Misconfiguration detection","Serverless security coverage"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /><path d="M12 14v-4M10 12l2-2 2 2" /></svg>,
  },
];

export default function Services() {
  return (
  <section id="services" className="section services">
    <div className="container">

      {/* ✅ Wrap heading for better control */}
      <div className="section__header">
        <h2 className="services__heading">
  Detect{" "}
  <span className="icon">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 7h-6l4 5l-4 5h6l4 -5l-4 -5" />
    </svg>
  </span>
  {" "}Respond{" "}
  <span className="icon">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 7h-6l4 5l-4 5h6l4 -5l-4 -5" />
    </svg>
  </span>
  {" "} <span style={{ color: "#f7161e" }}>Eliminate</span>
</h2>

        
        {/* <ThreatMapCanvas /> */}
      </div>

      {/* ✅ Services Grid */}
      <div className="services__grid">
        {SERVICES.map((s) => (
          <div key={s.num} className="service-card glass-card">
            <div className="service-card__svg-icon">{s.icon}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>

            <div className="service-card__tags">
              {s.tags.map((t) => (
                <span key={t} className="tag tag--dim">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>)
}

