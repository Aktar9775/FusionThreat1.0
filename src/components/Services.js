import React, { useState } from 'react';
import { Eye, AlertOctagon, Search, FileCheck, Target, Cloud } from 'lucide-react';

const services = [
  {
    num: '01', icon: Eye, title: '24/7 Monitoring & Triage',
    desc: 'Continuous visibility across endpoints, cloud, and network with real-time SIEM correlation and automated alerting.',
    items: ['Centralized SIEM log analysis', 'Multi-source threat correlation', 'Automated + human validation', 'Cloud, network, endpoint coverage'],
  },
  {
    num: '02', icon: AlertOctagon, title: 'Incident Response',
    desc: 'Speed is critical. Our IR team follows strict SLAs to isolate and neutralize attacks before significant damage occurs.',
    items: ['Critical response <15 minutes', 'Threat isolation & containment', 'Root cause analysis', 'Post-incident reporting'],
  },
  {
    num: '03', icon: Search, title: 'Vulnerability Management',
    desc: 'Proactive identification of security gaps before attackers exploit them. Monthly assessments included.',
    items: ['Monthly vulnerability scans', 'Critical patching <24 hours', 'Penetration testing', 'Remediation roadmaps'],
  },
  {
    num: '04', icon: FileCheck, title: 'Compliance Enablement',
    desc: 'Navigate GDPR, HIPAA, SOC 2, and ISO 27001 with automated reporting, dashboards, and audit support.',
    items: ['Automated compliance dashboards', 'Audit preparation & support', 'Gap analysis & planning', 'Evidence collection'],
  },
  {
    num: '05', icon: Target, title: 'Threat Hunting',
    desc: 'Proactive search for hidden threats using XDR that evade automated detection systems.',
    items: ['Hypothesis-driven hunting', 'Behavioral pattern analysis', 'IOC identification', 'Detection rule improvement'],
  },
  {
    num: '06', icon: Cloud, title: 'Cloud Security',
    desc: 'Protect AWS, Azure, and GCP with dedicated cloud monitoring and posture management.',
    items: ['Cloud workload protection', 'Identity & access monitoring', 'Misconfiguration detection', 'Serverless security coverage'],
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section id="services" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <div className="section-label">// Core Service Offerings</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff' }}>
            Detect. Respond. Eliminate.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 2, background: 'var(--border)' }}>
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <div key={i}
                onClick={() => setActive(isActive ? null : i)}
                className="card"
                style={{
                  padding: '32px 28px',
                  cursor: 'pointer',
                  background: isActive ? 'var(--green-dark)' : 'var(--bg)',
                  border: 'none',
                  borderTop: isActive ? '1px solid var(--green)' : '1px solid transparent',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, border: `1px solid ${isActive ? 'var(--green)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>
                      <s.icon size={18} color={isActive ? 'var(--green)' : 'var(--text-dim)'} />
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isActive ? 'var(--green)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>{s.num}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: isActive ? 'var(--green)' : '#fff', marginBottom: 10, transition: 'color 0.2s' }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: isActive ? 16 : 0 }}>{s.desc}</p>

                {isActive && (
                  <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {s.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>
                        <span style={{ color: 'var(--green)' }}>›</span> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
