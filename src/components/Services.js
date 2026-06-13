import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertOctagon, Search, FileCheck, Target, Cloud, ArrowRight } from 'lucide-react';

const services = [
  {
    num: '01', 
    icon: Eye, 
    title: '24/7 Monitoring & Triage',
    desc: 'Continuous visibility across endpoints, cloud, and network with real-time SIEM correlation and automated alerting.',
    items: [
      { label: 'Centralized SIEM log analysis', slug: 'siem-analysis' },
      { label: 'Multi-source threat correlation', slug: 'threat-correlation' },
      { label: 'Automated + human validation', slug: 'validation' },
      { label: 'Cloud, network, endpoint coverage', slug: 'cloud-endpoint-coverage' },
    ],
    slug: 'monitoring-triage',
  },
  {
    num: '02', 
    icon: AlertOctagon, 
    title: 'Incident Response',
    desc: 'Speed is critical. Our IR team follows strict SLAs to isolate and neutralize attacks before significant damage occurs.',
    items: [
      { label: 'Critical response <15 minutes', slug: 'critical-response' },
      { label: 'Threat isolation & containment', slug: 'containment' },
      { label: 'Root cause analysis', slug: 'root-cause-analysis' },
      { label: 'Post-incident reporting', slug: 'post-incident-reporting' },
    ],
    slug: 'incident-response',
  },
  {
    num: '03', 
    icon: Search, 
    title: 'Vulnerability Management',
    desc: 'Proactive identification of security gaps before attackers exploit them. Monthly assessments included.',
    items: [
      { label: 'Monthly vulnerability scans', slug: 'scanning' },
      { label: 'Critical patching <24 hours', slug: 'critical-patching' },
      { label: 'Penetration testing', slug: 'penetration-testing' },
      { label: 'Remediation guidance', slug: 'remediation-guidance' },
    ],
    slug: 'vulnerability-management',
  },
  {
    num: '04', 
    icon: FileCheck, 
    title: 'Compliance Enablement',
    desc: 'Navigate GDPR, HIPAA, SOC 2, and ISO 27001 with automated reporting, dashboards, and audit support.',
    items: [
      { label: 'Automated compliance dashboards', slug: 'automated-dashboard' },
      { label: 'Audit preparation & support', slug: 'audit-support' },
      { label: 'Gap analysis & planning', slug: 'gap-analysis' },
      { label: 'Evidence collection', slug: 'evidence-collection' },
    ],
    slug: 'compliance-enablement',
  },
  {
    num: '05', 
    icon: Target, 
    title: 'Threat Hunting',
    desc: 'Proactive search for hidden threats using XDR that evade automated detection systems.',
    items: [
      { label: 'Hypothesis-driven hunting', slug: 'hypothesis-hunting' },
      { label: 'Behavioral pattern analysis', slug: 'behavioral-analysis' },
      { label: 'IOC identification', slug: 'ioc-identification' },
      { label: 'Detection rule improvement', slug: 'custom-detection-rules' },
    ],
    slug: 'threat-hunting',
  },
  {
    num: '06', 
    icon: Cloud, 
    title: 'Cloud Security',
    desc: 'Protect AWS, Azure, and GCP with dedicated cloud monitoring and posture management.',
    items: [
      { label: 'Cloud workload protection', slug: 'workload-protection' },
      { label: 'Identity & access monitoring', slug: 'identity-access' },
      { label: 'Misconfiguration detection', slug: 'misconfiguration' },
      { label: 'Serverless security coverage', slug: 'serverless-security' },
    ],
    slug: 'cloud-security',
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
            const isHovered = hoveredIndex === i;
            return (
              <div 
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActive(isActive ? null : i)}
                className="card"
                style={{
                  padding: '32px 28px',
                  cursor: 'pointer',
                  background: isActive ? 'var(--green-dark)' : isHovered ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg)',
                  border: 'none',
                  borderTop: isActive ? '2px solid var(--green)' : isHovered ? '2px solid var(--green)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, border: `1px solid ${isActive || isHovered ? 'var(--green)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s' }}>
                      <s.icon size={18} color={isActive || isHovered ? 'var(--green)' : 'var(--text-dim)'} />
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isActive || isHovered ? 'var(--green)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>{s.num}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: isActive || isHovered ? 'var(--green)' : '#fff', marginBottom: 10, transition: 'color 0.3s' }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: isActive ? 16 : 0 }}>{s.desc}</p>

                {isActive && (
                  <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                    {s.items.map((item, j) => (
                      <li key={j} onClick={(e) => { e.stopPropagation(); navigate(`/service/${item.slug}`); }} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)', cursor: 'pointer' }}>
                        <span style={{ color: 'var(--green)' }}>â€º</span> {item}
                      </li>
                    ))}
                  </ul>
                )}

                {(isActive || isHovered) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/service/${s.slug}`);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      background: 'transparent',
                      border: '1px solid var(--green)',
                      color: 'var(--green)',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: 12,
                      fontWeight: 600,
                      transition: 'all 0.3s',
                    }}
                  >
                    Explore Details <ArrowRight size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

