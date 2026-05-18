import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'

  useEffect(() => {
    // Get user type from sessionStorage if set from home page
    const selectedUserType = sessionStorage.getItem('loginUserType');
    if (selectedUserType) {
      setUserType(selectedUserType);
      sessionStorage.removeItem('loginUserType'); // Clear after use
    }
  }, []);

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      try {
        const userData = {
          name: `${provider} User`,
          email: `user@${provider.toLowerCase()}.com`,
          provider,
          id: Math.random().toString(36).substring(7),
          loginMethod: 'oauth',
          userType: userType, // Add user type
        };
        login(userData);
        navigate('/dashboard');
      } catch (err) {
        setError(`Failed to login with ${provider}`);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: email.split('@')[0],
        email,
        id: Math.random().toString(36).substring(7),
        loginMethod: 'email',
        userType: userType, // Add user type
      };
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const oauthHover = (e, enter) => {
    e.currentTarget.style.background = enter ? 'rgba(201,29,34,0.15)' : 'rgba(255,255,255,0.08)';
    e.currentTarget.style.borderColor = enter ? 'rgba(201,29,34,0.3)' : 'rgba(255,255,255,0.12)';
  };

  // Proper inline SVG icons — no emoji, no raw string injection
  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
          <path d="M7 8h2m3 0h2m3 0h0"/>
          <path d="M7 12h4m3 0h3"/>
        </svg>
      ),
      title: 'Live Security Dashboard',
      desc: 'Real-time threat monitoring & metrics',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      title: 'Incident Management',
      desc: 'Track, update & resolve incidents',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: 'Compliance Reports',
      desc: 'HIPAA, GDPR, SOC 2 dashboards',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Direct Analyst Access',
      desc: 'Secure messaging with your SOC team',
    },
  ];

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Grid background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(160,168,176,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(160,168,176,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Glow blob */}
      <div style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(201,29,34,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Main two-column grid */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '48px',
        width: '100%',
        maxWidth: '1000px',
      }}>

        {/* LEFT column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          animation: 'fadeUp 0.7s 0s cubic-bezier(.22,1,.36,1) both',
        }}>

          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'var(--head)',
            fontSize: '18px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            animation: 'fadeUp 0.7s 0.05s cubic-bezier(.22,1,.36,1) both',
          }}>
            <img src="/loc.png" alt="FusionThreat" style={{ width: '60px', height: '50px' }} />
            Fusion<strong style={{ color: 'var(--red)' }}>Threat</strong>
          </div>

          {/* Heading */}
          <div style={{ animation: 'fadeUp 0.7s 0.12s cubic-bezier(.22,1,.36,1) both' }}>
            <h2 style={{
              fontFamily: 'var(--head)',
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              margin: 0,
            }}>
              Your Security<br />
              <span style={{ color: 'var(--red)' }}>Command Center</span><br />
              Awaits
            </h2>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: 'var(--text-sec)',
            lineHeight: 1.75,
            margin: 0,
            animation: 'fadeUp 0.7s 0.18s cubic-bezier(.22,1,.36,1) both',
          }}>
            Access your real-time security dashboard, incident reports, compliance status,
            and direct analyst communication — all in one secure portal.
          </p>
           {/* 2×2 feature grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            animation: 'fadeUp 0.7s 0.28s cubic-bezier(.22,1,.36,1) both',
          }}>
            {features.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201,29,34,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(201,29,34,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{ color: 'var(--red)', lineHeight: 0 }}>
                  {feature.icon}
                </div>
                <div style={{ fontWeight: 600, fontSize: '12px', lineHeight: 1.3 }}>
                  {feature.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-sec)', lineHeight: 1.4 }}>
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Palm image — no extra wrapper, no centering padding */}
          {/* <img
            src="/palm-recognition.svg"
            alt="Palm Recognition"
            style={{
              width: '100%',
              maxWidth: '240px',
              height: 'auto',
              filter: 'drop-shadow(0 0 20px rgba(255,13,0,0.35))',
              animation: 'fadeUp 0.7s 0.22s cubic-bezier(.22,1,.36,1) both',
              alignSelf: 'flex-start',
            }}
          /> */}

         
        </div>

        {/* RIGHT — Login card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeUp 0.7s 0.1s cubic-bezier(.22,1,.36,1) both',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            padding: '44px',
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            textAlign: 'center',
          }}>

            {/* Corner decorations */}
            {[
              { top: '-1px',    left: '-1px',  borderWidth: '2px 0 0 2px', borderRadius: '4px 0 0 0' },
              { top: '-1px',    right: '-1px', borderWidth: '2px 2px 0 0', borderRadius: '0 4px 0 0' },
              { bottom: '-1px', left: '-1px',  borderWidth: '0 0 2px 2px', borderRadius: '0 0 0 4px' },
              { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0', borderRadius: '0 0 4px 0' },
            ].map((corner, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '14px',
                height: '14px',
                borderColor: 'rgba(201,29,34,0.3)',
                borderStyle: 'solid',
                pointerEvents: 'none',
                ...corner,
              }} />
            ))}

            <h1 style={{
              fontFamily: 'var(--head)',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              marginBottom: '12px',
              animation: 'fadeUp 0.7s 0.1s cubic-bezier(.22,1,.36,1) both',
            }}>
              Secure Access<br /><span style={{ color: 'var(--red)' }}>Portal</span>
            </h1>

            <p style={{
              fontSize: '13px',
              color: 'var(--text-sec)',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
              animation: 'fadeUp 0.7s 0.15s cubic-bezier(.22,1,.36,1) both',
            }}>
              Enterprise-grade authentication<br />Login with
            </p>

            {error && (
              <div style={{
                background: 'rgba(201,29,34,0.1)',
                border: '1px solid rgba(201,29,34,0.3)',
                color: 'var(--red)',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px',
              }}>
                {error}
              </div>
            )}

            {/* OAuth buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              marginBottom: '20px',
              animation: 'fadeUp 0.7s 0.2s cubic-bezier(.22,1,.36,1) both',
            }}>
              {[
                { name: 'Google',    icon: '/google.png'    },
                { name: 'GitHub',    icon: '/github.png'    },
                { name: 'Microsoft', icon: '/microsoft.png' },
              ].map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleOAuthLogin(provider.name)}
                  disabled={loading}
                  title={`Login with ${provider.name}`}
                  onMouseEnter={(e) => oauthHover(e, true)}
                  onMouseLeave={(e) => oauthHover(e, false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    height: '44px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  <img
                    src={provider.icon}
                    alt={provider.name}
                    style={{ width: '20px', height: '20px', pointerEvents: 'none' }}
                  />
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '20px 0',
              opacity: 0.4,
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '12px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* User Type Selection
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px',
              animation: 'fadeUp 0.7s 0.22s cubic-bezier(.22,1,.36,1) both',
            }}>
              {[
                { type: 'user', label: '👤 Common User', desc: 'Client dashboard access' },
                { type: 'admin', label: '⚙️ Admin', desc: 'Full system access' },
              ].map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setUserType(option.type)}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    background: userType === option.type ? 'rgba(201,29,34,0.25)' : 'rgba(255,255,255,0.05)',
                    border: userType === option.type ? '1px solid rgba(201,29,34,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '7px',
                    color: userType === option.type ? 'var(--red)' : 'var(--text)',
                    fontFamily: 'var(--body)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (userType !== option.type) {
                      e.target.style.background = 'rgba(255,255,255,0.08)';
                      e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userType !== option.type) {
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '13px', marginBottom: '2px' }}>{option.label}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7 }}>{option.desc}</div>
                </button>
              ))}
            </div> */}

            {/* Email/Password form */}
            <form
              onSubmit={handleEmailLogin}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'fadeUp 0.7s 0.25s cubic-bezier(.22,1,.36,1) both',
              }}
            >
              <input
                type="email"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '7px',
                  color: 'var(--text)',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  padding: '10px 14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
                onBlur={(e)  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '7px',
                  color: 'var(--text)',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  padding: '10px 14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
                onBlur={(e)  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 18px rgba(201,29,34,0.35)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontFamily: 'var(--head)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: 'var(--red)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '12px 18px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Logging in…' : 'Login'}
              </button>
            </form>

            {/* Sign up link */}
            <div style={{
              marginTop: '16px',
              fontSize: '12px',
              color: 'var(--text-sec)',
              animation: 'fadeUp 0.7s 0.3s cubic-bezier(.22,1,.36,1) both',
            }}>
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--red)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 600,
                  fontSize: '12px',
                  padding: 0,
                }}
              >
                Sign up here
              </button>
            </div>

            {/* Back link */}
            <button
              onClick={() => navigate('/')}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '20px',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.38)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                transition: 'color 0.2s ease',
                animation: 'fadeUp 0.7s 0.34s cubic-bezier(.22,1,.36,1) both',
                padding: 0,
              }}
            >
              ← RETURN TO MAIN SITE
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 720px) {
          .login-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div
  style={{
    position: "absolute",
    bottom: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "rgba(255,255,255,0.45)",
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    zIndex: 2,
    textAlign: "center",
    width: "100%",
  }}
>
  © 2026 FUSIONTHREAT. ALL RIGHTS RESERVED.
</div>
    </div>
  );
}