import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100vh',
      padding: '40px 24px',
    }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto 40px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          <img src="/loc.png" alt="FusionThreat" style={{ width: '40px', height: '40px' }} />
          <span style={{ fontFamily: 'var(--head)', fontWeight: 600, fontSize: '18px' }}>
            Fusion<strong style={{ color: 'var(--red)' }}>Threat</strong>
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'rgba(201,29,34,0.2)',
            border: '1px solid rgba(201,29,34,0.4)',
            borderRadius: '6px',
            color: 'var(--red)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(201,29,34,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(201,29,34,0.2)';
          }}
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '24px',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontFamily: 'var(--head)',
            fontWeight: 700,
            marginBottom: '12px',
          }}>
            Welcome, <span style={{ color: 'var(--red)' }}>{user?.name || 'User'}</span>!
          </h1>
          <p style={{
            color: 'var(--text-sec)',
            fontSize: '16px',
            marginBottom: '20px',
          }}>
            You are now logged in to the FusionThreat Client Portal.
          </p>

          {/* User info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginTop: '32px',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '16px',
            }}>
              <div style={{
                color: 'var(--text-sec)',
                fontSize: '12px',
                marginBottom: '8px',
                fontFamily: 'var(--mono)',
              }}>EMAIL</div>
              <div style={{
                fontSize: '14px',
                color: 'var(--text)',
                fontWeight: 500,
              }}>
                {user?.email}
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '16px',
            }}>
              <div style={{
                color: 'var(--text-sec)',
                fontSize: '12px',
                marginBottom: '8px',
                fontFamily: 'var(--mono)',
              }}>LOGIN METHOD</div>
              <div style={{
                fontSize: '14px',
                color: 'var(--text)',
                fontWeight: 500,
                textTransform: 'capitalize',
              }}>
                {user?.loginMethod === 'oauth' ? `${user?.provider} OAuth` : 'Email/Password'}
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '16px',
            }}>
              <div style={{
                color: 'var(--text-sec)',
                fontSize: '12px',
                marginBottom: '8px',
                fontFamily: 'var(--mono)',
              }}>ACCOUNT STATUS</div>
              <div style={{
                fontSize: '14px',
                color: '#4ade80',
                fontWeight: 600,
              }}>
                ● Active
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {[
            {
              title: 'SOC Dashboard',
              desc: 'Real-time security operations center monitoring',
              icon: '📊',
            },
            {
              title: 'Threat Intelligence',
              desc: 'Live threat map and incident tracking',
              icon: '🗺️',
            },
            {
              title: 'Incident Response',
              desc: 'Submit and track security tickets',
              icon: '🎫',
            },
            {
              title: 'Compliance Reports',
              desc: 'View compliance dashboards and reports',
              icon: '📋',
            },
            {
              title: 'Vulnerability Assessment',
              desc: 'Latest vulnerability scans and patches',
              icon: '🛡️',
            },
            {
              title: 'Support & Billing',
              desc: 'Manage your account and billing',
              icon: '⚙️',
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,29,34,0.08)';
                e.currentTarget.style.borderColor = 'rgba(201,29,34,0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '32px',
                marginBottom: '12px',
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '16px',
                fontFamily: 'var(--head)',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'var(--text-sec)',
                fontSize: '13px',
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
