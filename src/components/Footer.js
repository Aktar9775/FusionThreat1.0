import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Shield size={18} color="var(--green)" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '0.15em', color: '#fff' }}>
                FUSION<span style={{ color: 'var(--green)' }}>THREAT</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 16, maxWidth: 240 }}>
              Enterprise-grade Managed Security Service Provider. SOC protection 24/7/365.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['CISSP Certified', 'MITRE ATT&CK', 'NIST CSF'].map(b => (
                <span key={b} className="tag tag-green">{b}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { heading: 'Services', links: ['24/7 Monitoring', 'Incident Response', 'Vulnerability Mgmt', 'Compliance', 'Threat Hunting'] },
            { heading: 'Platform', links: ['SOC Dashboard', 'Threat Map', 'Ticketing', 'Pricing', 'Client Portal'] },
            { heading: 'Contact', links: ['support@fusionthreat.com', 'www.fusionthreat.com', 'Book Assessment', 'Submit Ticket'] },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>{col.heading}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: 'block', fontSize: 13, color: 'var(--text-dim)', marginBottom: 8, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--green)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            © 2026 FUSIONTHREAT. ALL RIGHTS RESERVED.
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            PROTECTING YOUR BUSINESS. SECURING YOUR FUTURE.
          </span>
        </div>
      </div>
    </footer>
  );
}
