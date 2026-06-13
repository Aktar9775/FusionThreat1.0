import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType] = useState('admin'); // Always admin for this page

  useEffect(() => {
    // Set admin type when this page loads
    sessionStorage.setItem('loginUserType', 'admin');
  }, []);

  const handleOAuthLogin = (provider) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      try {
        const userData = {
          name: `${provider} Admin`,
          email: `admin@${provider.toLowerCase()}.com`,
          provider,
          id: Math.random().toString(36).substring(7),
          loginMethod: 'oauth',
          userType: 'admin',
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
        userType: 'admin',
      };
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Admin login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const oauthHover = (e, enter) => {
    e.currentTarget.style.background = enter ? 'rgba(201,29,34,0.15)' : 'rgba(255,255,255,0.08)';
    e.currentTarget.style.borderColor = enter ? 'rgba(201,29,34,0.3)' : 'rgba(255,255,255,0.12)';
  };

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
      title: 'Admin Dashboard',
      desc: 'Full system monitoring & control',
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
      desc: 'Advanced threat analysis & response',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20"/>
          <path d="M12 7v10M7 12h10"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      ),
      title: 'Compliance Reports',
      desc: 'Regulatory compliance tracking',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h4M9 3v18M9 3l10 0a2 2 0 012 2v14a2 2 0 01-2 2H9"/>
          <line x1="14" y1="9" x2="20" y2="9"/>
          <line x1="14" y1="13" x2="20" y2="13"/>
          <line x1="14" y1="17" x2="20" y2="17"/>
        </svg>
      ),
      title: 'User Management',
      desc: 'Control team access & roles',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-20%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,29,34,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,82,186,0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 1,
      }} />

      {/* Content container */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '60px',
        maxWidth: '1200px',
        width: '100%',
        zIndex: 2,
        position: 'relative',
      }}>
        {/* LEFT — Features */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'fadeUp 0.7s 0.15s cubic-bezier(.22,1,.36,1) both',
        }}>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--red)',
              marginBottom: '8px',
            }}>
               ADMINISTRATOR PORTAL
            </div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: 1.2,
              marginBottom: '12px',
              color: 'var(--text)',
              fontFamily: 'var(--head)',
            }}>
              System Control Center
            </h2>
            
          </div>

         {/* Palm image — no extra wrapper, no centering padding */}
          <img
            src="/palm-recognition.svg"
            alt="Palm Recognition"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 0 20px rgba(255,13,0,0.35))',
              animation: 'fadeUp 0.7s 0.22s cubic-bezier(.22,1,.36,1) both',
              alignSelf: 'flex-start',
            }}
          />
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
            maxWidth: '420px',
            padding: '40px',
            borderRadius: '16px',
            background: 'rgba(20,20,20,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            {/* Corner decorations */}
            {[
              { top: '-1px',    left: '-1px',  borderWidth: '2px 0 0 2px', borderRadius: '16px 0 0 0' },
              { top: '-1px',    right: '-1px', borderWidth: '2px 2px 0 0', borderRadius: '0 16px 0 0' },
              { bottom: '-1px', left: '-1px',  borderWidth: '0 0 2px 2px', borderRadius: '0 0 0 16px' },
              { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0', borderRadius: '0 0 16px 0' },
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

            {/* Form header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              animation: 'fadeUp 0.7s 0.12s cubic-bezier(.22,1,.36,1) both',
            }}>
              <img src="/loc.png" alt="FusionThreat" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--text)',
                  fontFamily: 'var(--head)',
                }}>
                  Fusion<strong style={{ color: 'var(--red)' }}>Threat</strong> Admin Login
                </h3>
                
               
              </div>
            </div>

            {/* Error message */}
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
                placeholder="Username "
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
                style={{
                  marginTop: '8px',
                  padding: '11px',
                  borderRadius: '7px',
                  background: 'var(--red)',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'var(--body)',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s ease',
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => !loading && (e.target.style.opacity = '0.85')}
                onMouseLeave={(e) => !loading && (e.target.style.opacity = '1')}
              >
                {loading ? '⏳ Authenticating...' : 'Login'}
              </button>
            </form>

            {/* Footer links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '16px',
              textAlign: 'center',
              fontSize: '11px',
              animation: 'fadeUp 0.7s 0.3s cubic-bezier(.22,1,.36,1) both',
            }}>
              <a href="/" style={{
                color: 'var(--text-sec)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--red)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-sec)'}
              >
                ← Back to FusionThreat
              </a>
              <a href="/login" style={{
                color: 'var(--text-sec)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--red)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-sec)'}
              >
                👤 User Login Instead
              </a>
            </div>
          </div>
        </div>
      </div>
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
