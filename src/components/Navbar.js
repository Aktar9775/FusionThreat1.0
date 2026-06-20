 import React, { useState, useEffect } from 'react';
  
 const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showUserTypeMenu, setShowUserTypeMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  
  
 export default function Navbar() {
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  const handleLoginClick = (userType) => {
    if (userType === 'admin') {
      navigate('/admin-login');
    } else {
      sessionStorage.setItem('loginUserType', 'user');
      navigate('/login');
    }
    setShowUserTypeMenu(false);
  };

  // Services data with navigation slugs
  const servicesData = [
    { title: "24/7 Monitoring & Triage", slug: "monitoring-triage", branches: ["Centralized SIEM log analysis", "Multi-source threat correlation", "Cloud, network, endpoint coverage", "Automated + human validation"] },
    { title: "Incident Response", slug: "incident-response", branches: ["<15 min critical response", "Threat isolation & containment", "Root cause analysis", "Post-incident reporting"] },
    { title: "Vulnerability Management", slug: "vulnerability-management", branches: ["Monthly vulnerability scans", "Critical patching <24hr", "Penetration testing", "Remediation guidance"] },
    { title: "Compliance Enablement", slug: "compliance-enablement", branches: ["Automated Compliance dashboards", "Audit preparation & support", "Gap analysis & planning", "Evidence collection"] },
    { title: "Threat Hunting", slug: "threat-hunting", branches: ["Hypothesis-driven & hunting", "Behavioral pattern analysis", "IOC identification", "Custom detection rule development"] },
    { title: "Cloud Security", slug: "cloud-security", branches: ["Cloud Workload protection", "Identity & Access monitoring", "Misconfiguration detection", "Serverless security coverage"] },
  ];
  
  const links = [
    ["SOC Dashboard", "#socdashboard"],
    ["Threat Map", "#threatmap"],
    ["Services", "#services"],
    ["Ticketing", "#ticketing"],
    ["Pricing", "#pricing"],
    ["Contact", "#contact"],
  ];
  
  return (
    <nav className={"nav" + (scrolled ? " nav--scrolled" : "")}>
      <div className="nav__inner">
        <a href="/" className="nav__logo" style={{ display: "flex", alignItems: "left", gap: "0" }}>
          <img src="/loc.png" alt="FusionThreat Logo" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--head)", fontWeight: "600", letterSpacing: "0.02em" }}>
            Fusion<strong style={{ color: "var(--red)" }}>Threat</strong>
          </span>
        </a>
        <ul className={"nav__links" + (open ? " nav__links--open" : "")}>
          {links.map(([l, h]) => {
            // Services link with dropdown
            if (l === "Services") {
              return (
                <li key={l} 
                  onMouseEnter={() => setShowServicesMenu(true)}
                  onMouseLeave={() => setShowServicesMenu(false)}
                  style={{ position: 'relative' }}
                >
                  <a href={h} onClick={() => setOpen(false)} style={{ position: 'relative', paddingRight: '8px' }}>
                    {l} ▼
                  </a>
                  {/* Services Dropdown */}
                  {showServicesMenu && (
                 <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  transform: 'translateX(-50%)',
                  marginTop: '8px',
               background: 'rgba(15, 15, 15, 0.92)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(20px)',
                  zIndex: 1000,
                  minWidth: '720px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.63)',
                  padding: '20px',
                }}>
                  {/* Row 1 — first 3 services */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0',
                    marginBottom: '0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: '16px',
                    marginBottom: '16px',
                  }}>
                    {servicesData.slice(0, 3).map((service, idx) => (
                      <div key={idx} style={{
                        flex: '1',
                        minWidth: '0',
                        borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        paddingRight: idx < 2 ? '16px' : '0',
                        paddingLeft: idx > 0 ? '16px' : '0',
                      }}>
                        <button
                          onClick={() => {
                            navigate(`/service/${service.slug}`);
                            setShowServicesMenu(false);
                            setOpen(false);
                          }}
                          style={{
                            padding: '0 0 10px 0',
                            fontWeight: '600',
                            fontSize: '11px',
                            color: 'var(--red)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            marginBottom: '6px',
                            whiteSpace: 'nowrap',
                            background: 'none',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--green)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--red)';
                          }}
                        >
                          {service.title}
                        </button>
                        {service.branches.map((branch, bIdx) => (
                          <button
                            key={bIdx}
                            onClick={() => {
                              navigate(`/service/${service.slug}`);
                              setShowServicesMenu(false);
                              setOpen(false);
                            }}
                            style={{
                              padding: '5px 8px',
                              fontSize: '12px',
                              color: 'var(--text-sec)',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              background: 'none',
                              border: 'none',
                              width: '100%',
                              textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(201,29,34,0.1)';
                              e.currentTarget.style.color = 'var(--red)';
                              e.currentTarget.style.paddingLeft = '12px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'none';
                              e.currentTarget.style.color = 'var(--text-sec)';
                              e.currentTarget.style.paddingLeft = '8px';
                            }}
                          >
                            • {branch}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Row 2 — remaining services centered */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0',
                  }}>
                    {servicesData.slice(3).map((service, idx, arr) => (
                      <div key={idx} style={{
                        flex: '0 0 calc(100% / 3)',
                        minWidth: '0',
                        borderRight: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        paddingRight: idx < arr.length - 1 ? '16px' : '0',
                        paddingLeft: idx > 0 ? '16px' : '0',
                      }}>
                        <button
                          onClick={() => {
                            navigate(`/service/${service.slug}`);
                            setShowServicesMenu(false);
                            setOpen(false);
                          }}
                          style={{
                            padding: '0 0 10px 0',
                            fontWeight: '600',
                            fontSize: '11px',
                            color: 'var(--red)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            marginBottom: '6px',
                            whiteSpace: 'nowrap',
                            background: 'none',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--green)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--red)';
                          }}
                        >
                          {service.title}
                        </button>
                        {service.branches.map((branch, bIdx) => (
                          <button
                            key={bIdx}
                            onClick={() => {
                              navigate(`/service/${service.slug}`);
                              setShowServicesMenu(false);
                              setOpen(false);
                            }}
                            style={{
                              padding: '5px 8px',
                              fontSize: '12px',
                              color: 'var(--text-sec)',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              background: 'none',
                              border: 'none',
                              width: '100%',
                              textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(201,29,34,0.1)';
                              e.currentTarget.style.color = 'var(--red)';
                              e.currentTarget.style.paddingLeft = '12px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'none';
                              e.currentTarget.style.color = 'var(--text-sec)';
                              e.currentTarget.style.paddingLeft = '8px';
                            }}
                          >
                            • {branch}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                  )}
                </li>
              );
            }
            return (
              <li key={l}>
                <a href={h} onClick={() => setOpen(false)}>{l}</a>
              </li>
            );
          })}
        </ul>
        <div className="nav__right">
          <div className="nav__actions">
            <span className="nav__live">
              <span className="pulse" />SOC LIVE
            </span>
            
            {/* Login/Sign Up with User Type Selection */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowUserTypeMenu(!showUserTypeMenu)}
                className="nav_protected btn btn--sm btn--primary"
                style={{
                  background: 'var(--red)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Login / Sign Up ▼
              </button>
              
              {/* Dropdown Menu */}
              {showUserTypeMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  background: 'var(--glass)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1000,
                  minWidth: '180px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}>
                  <button
                    onClick={() => handleLoginClick('user')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(201,29,34,0.15)';
                      e.target.style.color = 'var(--red)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'none';
                      e.target.style.color = 'var(--text)';
                    }}
                  >
                    Consumer Login 
                  </button>
                  <button
                    onClick={() => handleLoginClick('admin')}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(201,29,34,0.15)';
                      e.target.style.color = 'var(--red)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'none';
                      e.target.style.color = 'var(--text)';
                    }}
                  >
                  Administrator Login
                  </button>
                </div>
              )}
            </div>
            
            <button className="nav__burger" onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}