import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Foundation',
    price: '$10–$20',
    unit: '/device/month',
    tag: null,
    features: ['Business hours support', '24/7 critical alerts', 'Basic SIEM monitoring', 'Monthly reports', 'Email support'],
  },
  {
    name: 'Standard',
    price: '$50–$150',
    unit: '/user/month',
    tag: 'Most Popular',
    features: ['24/7/365 SOC coverage', 'Full incident response', 'Threat intelligence', 'Compliance dashboards', 'Client portal access', 'Quarterly reviews'],
  },
  {
    name: 'Advanced MDR',
    price: '$200+',
    unit: '/user/month',
    tag: 'Enterprise',
    features: ['Everything in Standard', 'Active threat hunting', 'Malware reverse engineering', 'Full compliance suite', 'Direct engineer access', 'Custom SIEM rules'],
  },
];

export default function Pricing() {
  const [hover, setHover] = useState(null);

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>// Pricing Structure</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff' }}>
            Transparent Pricing
          </h2>
          <p style={{ color: 'var(--text-dim)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            Predictable monthly pricing that scales with your business. No hidden fees.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          {plans.map((p, i) => {
            const isPopular = p.tag === 'Most Popular';
            const isHover = hover === i;
            return (
              <div key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  background: isHover ? 'var(--surface2)' : 'var(--surface)',
                  border: `1px solid ${isPopular ? 'var(--green)' : 'var(--border)'}`,
                  borderRadius: 4,
                  padding: '32px 28px',
                  position: 'relative',
                  transition: 'all 0.25s',
                  transform: isHover ? 'translateY(-4px)' : 'none',
                  boxShadow: isHover ? 'var(--glow)' : 'none',
                }}
              >
                {p.tag && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: isPopular ? 'var(--green)' : 'var(--bg3)', color: isPopular ? '#000' : 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 10, padding: '4px 14px', letterSpacing: '0.12em', fontWeight: isPopular ? 700 : 400 }}>
                    {p.tag}
                  </div>
                )}

                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: isPopular ? 'var(--green)' : '#fff', marginBottom: 8, letterSpacing: '0.05em' }}>
                  {p.name}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 36, color: '#fff' }}>{p.price}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginBottom: 28 }}>{p.unit}</div>

                <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text)' }}>
                      <Check size={14} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="/login"
                  className={isPopular ? 'btn-primary' : 'btn-outline'}
                  style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
                >
                  Login <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {[
            { label: 'Small Business (1–50 Users)', value: '$1,750–$3,750/mo' },
            { label: 'Mid-Market (51–250 Users)', value: '$10,000–$20,000/mo' },
          ].map((r, i) => (
            <div key={i} className="card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>{r.label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--green)' }}>{r.value}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 24 }}>
          One-time setup fee = 1 month service. Annual agreements available. Net 30 payment terms.
        </p>
      </div>
    </section>
  );
}
