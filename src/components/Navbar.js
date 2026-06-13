import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Lock, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const serviceLinks = [
  { label: '24/7 Monitoring & Triage', slug: 'monitoring-triage' },
  { label: 'Incident Response', slug: 'incident-response' },
  { label: 'Vulnerability Management', slug: 'vulnerability-management' },
  { label: 'Compliance Enablement', slug: 'compliance-enablement' },
  { label: 'Threat Hunting', slug: 'threat-hunting' },
  { label: 'Cloud Security', slug: 'cloud-security' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'SOC Dashboard', href: '#soc' },
    { label: 'Threat Map', href: '#tmap' },
    { label: 'Services', href: '#services', dropdown: true },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(6,8,16,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, border: '1px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Shield size={16} color="var(--green)" />
            <div style={{ position: 'absolute', inset: -3, border: '1px solid var(--green)', opacity: 0.2, transform: 'rotate(45deg)' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '0.15em', color: '#fff' }}>
            FUSION<span style={{ color: 'var(--green)' }}>THREAT</span>
          </span>
        </a>

        {/* Live badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s ease infinite', boxShadow: 'var(--glow-sm)' }} />
          SOC LIVE
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {links.map(l => (
            <div key={l.href} style={{ position: 'relative' }}>
              {l.dropdown ? (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  style={{ position: 'relative' }}
                >
                  <button
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: servicesOpen ? 'var(--green)' : 'var(--text-dim)',
                      transition: 'color 0.2s',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: 0,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--green)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = servicesOpen ? 'var(--green)' : 'var(--text-dim)';
                    }}
                  >
                    {l.label}
                    <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </button>

                  {/* Services Dropdown */}
                  {servicesOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        minWidth: 280,
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                        padding: 8,
                        marginTop: 8,
                        zIndex: 1000,
                      }}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {serviceLinks.map((service, idx) => (
                        <button
                          key={service.slug}
                          onClick={() => {
                            navigate(`/service/${service.slug}`);
                            setServicesOpen(false);
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px 16px',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-dim)',
                            fontFamily: 'var(--font-display)',
                            fontSize: 13,
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            borderRadius: 4,
                            borderBottom: idx < serviceLinks.length - 1 ? '1px solid var(--border)' : 'none',
                          }}
                          onMouseEnter={e => {
                            e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                            e.target.style.color = 'var(--green)';
                          }}
                          onMouseLeave={e => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--text-dim)';
                          }}
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--green)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
                >
                  {l.label}
                </a>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: 12 }}>
            Get Protected
          </a>
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: 'var(--text)', display: 'none' }} className="mobile-menu-btn">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(6,8,16,0.98)', borderTop: '1px solid var(--border)', padding: '16px 24px' }}>
          {links.map(l => (
            <div key={l.href}>
              {l.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 14,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      borderBottom: '1px solid var(--border)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--green)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-dim)';
                    }}
                  >
                    {l.label}
                    <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </button>

                  {/* Mobile Services Dropdown */}
                  {mobileServicesOpen && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderRadius: 4, margin: '8px 0', overflow: 'hidden' }}>
                      {serviceLinks.map((service, idx) => (
                        <button
                          key={service.slug}
                          onClick={() => {
                            navigate(`/service/${service.slug}`);
                            setOpen(false);
                            setMobileServicesOpen(false);
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px 16px',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-dim)',
                            fontFamily: 'var(--font-display)',
                            fontSize: 12,
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            borderBottom: idx < serviceLinks.length - 1 ? '1px solid rgba(16, 185, 129, 0.1)' : 'none',
                          }}
                          onMouseEnter={e => {
                            e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                            e.target.style.color = 'var(--green)';
                          }}
                          onMouseLeave={e => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--text-dim)';
                          }}
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 0',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  {l.label}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
