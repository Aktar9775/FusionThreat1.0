import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Registration() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleOAuthSignup = (provider) => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      try {
        const userData = {
          name: 'New User',
          email: `user@${provider}.com`,
          provider,
          id: Math.random().toString(36).substring(7),
          signupMethod: 'oauth',
        };
        
        login(userData);
        navigate('/dashboard');
      } catch (err) {
        setError(`Failed to sign up with ${provider}`);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { companyName, fullName, email, password, confirmPassword } = formData;

    if (!companyName || !fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: fullName,
        email,
        company: companyName,
        id: Math.random().toString(36).substring(7),
        signupMethod: 'email',
      };
      
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100vh',
      display: 'flex',
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
        zIndex: 0,
      }} />

      {/* Scan line */}
     

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

      {/* Main card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '520px',
        padding: '35px 35px',
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        textAlign: 'center',
        animation: 'fadeUp 0.7s cubic-bezier(.22,1,.36,1) both',
        maxHeight: '80%',
      }}>
        {/* Corner decorations */}
        {[
          { style: { top: '-1px', left: '-1px', borderWidth: '2px 0 0 2px', borderRadius: '4px 0 0 0' } },
          { style: { top: '-1px', right: '-1px', borderWidth: '2px 2px 0 0', borderRadius: '0 4px 0 0' } },
          { style: { bottom: '-1px', left: '-1px', borderWidth: '0 0 2px 2px', borderRadius: '0 0 0 4px' } },
          { style: { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0', borderRadius: '0 0 4px 0' } },
        ].map((corner, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              borderColor: 'rgba(201,29,34,0.3)',
              borderStyle: 'solid',
              ...corner.style,
            }}
          />
        ))}

        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--head)',
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          marginBottom: '28px',
          animation: 'fadeUp 0.7s 0.05s cubic-bezier(.22,1,.36,1) both',
        }}>
          <img src="/loc.png" alt="FusionThreat" style={{ width: '60px', height: '50px' }} />
          Fusion<strong style={{ color: 'var(--red)' }}>Threat</strong>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: 'var(--head)',
          fontSize: 'clamp(18px, 4vw, 24px)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1.2,
          marginBottom: '12px',
          animation: 'fadeUp 0.7s 0.1s cubic-bezier(.22,1,.36,1) both',
        }}>
          Create Your Account<br /><span style={{ color: 'var(--red)' }}>Get Protected Today</span>
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: 'var(--text-sec)',
          lineHeight: 1.6,
          margin: '0 auto 24px',
          animation: 'fadeUp 0.7s 0.15s cubic-bezier(.22,1,.36,1) both',
        }}>
          Enterprise security in minutes. Start your 30-day free trial now. <br />
          Sign in with 
        </p>

        {error && (
          <div style={{
            background: 'rgba(201,29,34,0.1)',
            border: '1px solid rgba(201,29,34,0.3)',
            color: 'var(--red)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '12px',
          }}>
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: '',
          gap: '8px',
          marginBottom: '20px',
          animation: 'fadeUp 0.7s 0.20s cubic-bezier(.22,1,.36,1) both',
        }}>
          {[
            { name: 'Google', icon: '/google.png' },
            { name: 'GitHub', icon: '/github.png' },
            { name: 'Microsoft', icon: '/microsoft.png' },
          ].map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleOAuthSignup(provider.name)}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '11px 16px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                color: 'var(--text)',
                fontFamily: 'var(--body)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: loading ? 0.5 : 1,
                pointerEvents: loading ? 'none' : 'auto',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(201,29,34,0.15)';
                e.target.style.borderColor = 'rgba(201,29,34,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.08)';
                e.target.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              {provider.icon.endsWith('.png') ? (
                <img src={provider.icon} alt={provider.name} style={{ width: '20px', height: '20px' }} />
              ) : (
                <span>{provider.icon}</span>
              )}
               {provider.name}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '18px 0',
          opacity: 0.4,
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '11px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSignup} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'fadeUp 0.7s 0.25s cubic-bezier(.22,1,.36,1) both',
        }}>
          <input
            type="text"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '7px',
              color: 'var(--text)',
              fontFamily: 'var(--body)',
              fontSize: '12px',
              padding: '9px 12px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '7px',
              color: 'var(--text)',
              fontFamily: 'var(--body)',
              fontSize: '12px',
              padding: '9px 12px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <input
            type="email"
            placeholder="Work Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '7px',
              color: 'var(--text)',
              fontFamily: 'var(--body)',
              fontSize: '12px',
              padding: '9px 12px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <input
            type="password"
            placeholder="Password (8+ characters)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '7px',
              color: 'var(--text)',
              fontFamily: 'var(--body)',
              fontSize: '12px',
              padding: '9px 12px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '7px',
              color: 'var(--text)',
              fontFamily: 'var(--body)',
              fontSize: '12px',
              padding: '9px 12px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(201,29,34,0.35)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />

          {/* Terms checkbox */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--text-sec)',
            margin: '8px 0',
          }}>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            I agree to the Terms & Privacy Policy
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'inline-flex',
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
              padding: '11px 18px',
              cursor: 'pointer',
              marginTop: '4px',
              transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
              opacity: loading ? 0.7 : 1,
              pointerEvents: loading ? 'none' : 'auto',
              width: '100%',
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 0 18px rgba(201,29,34,0.18)'}
            onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        {/* Login link */}
        <div style={{
          marginTop: '16px',
          fontSize: '12px',
          color: 'var(--text-sec)',
          animation: 'fadeUp 0.7s 0.30s cubic-bezier(.22,1,.36,1) both',
        }}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--red)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 600,
            }}
          >
            Login here
          </button>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '20px',
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.38)',
            background: 'none',
            border: 'none',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            cursor: 'pointer',
            animation: 'fadeUp 0.7s 0.34s cubic-bezier(.22,1,.36,1) both',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--red)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.38)'}
        >
          ← RETURN TO MAIN SITE
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scan {
          from { top: 0; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
}
