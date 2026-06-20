import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import Services from '../../components/Services';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'Critical Alert', message: 'Suspicious activity detected on Server-02', time: '2 mins ago' },
    { id: 2, type: 'warning', title: 'Security Warning', message: 'Unpatched vulnerability in Database layer', time: '15 mins ago' },
    { id: 3, type: 'info', title: 'System Update', message: 'Security patches applied successfully', time: '1 hour ago' },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [tickets, setTickets] = useState([
    { id: 'TKT-001', title: 'Network Intrusion Detection', status: 'In Progress', priority: 'High' },
    { id: 'TKT-002', title: 'Malware Alert Response', status: 'Resolved', priority: 'Critical' },
    { id: 'TKT-003', title: 'Compliance Audit', status: 'Pending', priority: 'Medium' },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return '#f59e0b';
      case 'Resolved': return '#4ade80';
      case 'Pending': return '#ef4444';
      default: return 'var(--text)';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      case 'Low': return '#4ade80';
      default: return 'var(--text)';
    }
  };

  return (
    <div style={{
      background: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100vh',
      padding: '0',
    }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: 'rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              🔔
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'var(--red)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                background: 'rgba(20,20,30,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                width: '350px',
                maxHeight: '400px',
                overflowY: 'auto',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                zIndex: 1000,
              }}>
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 600,
                }}>
                  Notifications
                </div>
                {notifications.map((notif) => (
                  <div key={notif.id} style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: notif.type === 'critical' ? '#ef4444' : notif.type === 'warning' ? '#f59e0b' : '#3b82f6',
                        textTransform: 'uppercase',
                        marginTop: '2px',
                      }}>
                        {notif.type}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{notif.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-sec)', marginTop: '4px' }}>{notif.message}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-sec)', marginTop: '4px' }}>{notif.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Promotional Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(201,29,34,0.15) 0%, rgba(201,29,34,0.05) 100%)',
            border: '1px solid rgba(201,29,34,0.3)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontFamily: 'var(--head)',
                fontWeight: 700,
                marginBottom: '8px',
                color: 'var(--red)',
              }}>
                ⚡ Exclusive Offer: Advanced Threat Protection
              </h2>
              <p style={{
                color: 'var(--text-sec)',
                fontSize: '14px',
                marginBottom: '12px',
              }}>
                Upgrade to Premium Security Suite and get 40% off for the first 3 months. Includes real-time threat detection, incident response, and 24/7 support.
              </p>
              <button style={{
                padding: '10px 20px',
                background: 'var(--red)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}>
                Learn More →
              </button>
            </div>
            <div style={{ fontSize: '64px' }}>🛡️</div>
          </div>

          {/* Welcome Section */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '40px',
            marginBottom: '32px',
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
              marginBottom: '32px',
            }}>
              You are now logged in to the FusionThreat Client Portal. Monitor threats, manage incidents, and keep your infrastructure secure.
            </p>

            {/* User Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
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

          {/* Dashboard Metrics */}
          <h2 style={{
            fontSize: '24px',
            fontFamily: 'var(--head)',
            fontWeight: 700,
            marginBottom: '20px',
          }}>📊 Dashboard Overview</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}>
            {[
              { label: 'Customers Using Plan', value: '847', icon: '👥', trend: '+12%' },
              { label: 'Active Protected Devices', value: '3,250', icon: '💻', trend: '+8%' },
              { label: 'Daily Security Reports', value: '24', icon: '📋', trend: 'Updated' },
              { label: 'Open Tickets', value: '5', icon: '🎫', trend: '-2%' },
            ].map((metric, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,29,34,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{
                      color: 'var(--text-sec)',
                      fontSize: '12px',
                      marginBottom: '8px',
                      fontFamily: 'var(--mono)',
                      fontWeight: 600,
                    }}>
                      {metric.label}
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--red)',
                      marginBottom: '8px',
                    }}>
                      {metric.value}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#4ade80',
                      fontWeight: 500,
                    }}>
                      {metric.trend}
                    </div>
                  </div>
                  <div style={{ fontSize: '32px' }}>{metric.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* High Alerts */}
          <h2 style={{
            fontSize: '24px',
            fontFamily: 'var(--head)',
            fontWeight: 700,
            marginBottom: '20px',
          }}>⚠️ High Priority Alerts</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}>
            {[
              {
                severity: 'Critical',
                title: 'Unauthorized Access Attempt',
                description: 'Multiple failed login attempts detected on Server-02',
                time: '5 minutes ago',
                action: 'Review',
              },
              {
                severity: 'High',
                title: 'Critical Vulnerability Detected',
                description: 'CVE-2024-1234 found in Production Database',
                time: '23 minutes ago',
                action: 'Patch Now',
              },
              {
                severity: 'High',
                title: 'Unusual Network Activity',
                description: 'Abnormal traffic pattern detected from external IP',
                time: '1 hour ago',
                action: 'Investigate',
              },
            ].map((alert, i) => (
              <div key={i} style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{
                    background: alert.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}>
                    {alert.severity}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-sec)' }}>{alert.time}</span>
                </div>
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: 'var(--red)',
                }}>
                  {alert.title}
                </h4>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-sec)',
                  marginBottom: '12px',
                }}>
                  {alert.description}
                </p>
                <button style={{
                  padding: '6px 12px',
                  background: 'rgba(201,29,34,0.2)',
                  border: '1px solid rgba(201,29,34,0.4)',
                  borderRadius: '4px',
                  color: 'var(--red)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(201,29,34,0.4)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(201,29,34,0.2)'}>
                  {alert.action} →
                </button>
              </div>
            ))}
          </div>

          {/* Ticket Management */}
          <h2 style={{
            fontSize: '24px',
            fontFamily: 'var(--head)',
            fontWeight: 700,
            marginBottom: '20px',
          }}>🎫 Ticket Management</h2>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h3 style={{ fontWeight: 600, margin: 0 }}>Recent Tickets</h3>
              <button style={{
                padding: '8px 16px',
                background: 'var(--red)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}>
                + New Ticket
              </button>
            </div>
            <div>
              {tickets.map((ticket) => (
                <div key={ticket.id} style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'grid',
                  gridTemplateColumns: '150px 1fr 120px 120px',
                  gap: '16px',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--red)' }}>
                    {ticket.id}
                  </div>
                  <div style={{ color: 'var(--text)', fontWeight: 500 }}>
                    {ticket.title}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: getStatusColor(ticket.status),
                    textAlign: 'center',
                  }}>
                    {ticket.status}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: getPriorityColor(ticket.priority),
                    textAlign: 'center',
                  }}>
                    {ticket.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services & Features */}
          <Services/>
         

          {/* Latest Vulnerabilities */}
          <h2 style={{
            fontSize: '24px',
            fontFamily: 'var(--head)',
            fontWeight: 700,
            marginBottom: '20px',
          }}>🔴 Latest Vulnerabilities</h2>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ fontWeight: 600, margin: 0 }}>Recent CVE Threats</h3>
            </div>
            <div>
              {[
                { cve: 'CVE-2024-1234', severity: 'Critical', affected: 'Database', patch: 'Available' },
                { cve: 'CVE-2024-5678', severity: 'High', affected: 'Web Server', patch: 'Available' },
                { cve: 'CVE-2024-9012', severity: 'Medium', affected: 'API Gateway', patch: 'Pending' },
              ].map((vuln, i) => (
                <div key={i} style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'grid',
                  gridTemplateColumns: '120px 120px 150px 100px 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--red)' }}>
                    {vuln.cve}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: vuln.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: vuln.severity === 'Critical' ? '#ef4444' : '#f59e0b',
                    textAlign: 'center',
                  }}>
                    {vuln.severity}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text)' }}>
                    {vuln.affected}
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: vuln.patch === 'Available' ? 'rgba(74,222,128,0.2)' : 'rgba(255,193,7,0.2)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: vuln.patch === 'Available' ? '#4ade80' : '#ffc107',
                    textAlign: 'center',
                  }}>
                    {vuln.patch}
                  </div>
                  <button style={{
                    padding: '6px 12px',
                    background: 'rgba(201,29,34,0.2)',
                    border: '1px solid rgba(201,29,34,0.4)',
                    borderRadius: '4px',
                    color: 'var(--red)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    justifySelf: 'end',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(201,29,34,0.4)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(201,29,34,0.2)'}>
                    Details →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact & Footer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}>
            {/* Emergency Contact */}
            {/* <div style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05) 100%)',
              border: '2px solid rgba(239,68,68,0.3)',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontFamily: 'var(--head)',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--red)',
              }}>
                🆘 24/7 Emergency Support
              </h3>
              <p style={{
                color: 'var(--text-sec)',
                fontSize: '13px',
                marginBottom: '20px',
                lineHeight: '1.6',
              }}>
                For critical security incidents and emergencies, contact our support team immediately.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '18px' }}>📞</span>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>Hotline</div>
                    <div style={{ fontWeight: 600, color: 'var(--red)' }}>+1-XXX-XXX-XXXX</div>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '18px' }}>📧</span>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-sec)' }}>Email</div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>emergency@fusionthreat.com</div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Connect With Us */}
           <Contact/>

            {/* Support & Billing */}
            {/* <div style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.05) 100%)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontFamily: 'var(--head)',
                fontWeight: 700,
                marginBottom: '12px',
                color: '#4ade80',
              }}>
                💳 Billing & Account
              </h3>
              <p style={{
                color: 'var(--text-sec)',
                fontSize: '13px',
                marginBottom: '20px',
                lineHeight: '1.6',
              }}>
                Manage your billing information, payment methods, and subscription details.
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <button style={{
                  padding: '10px 16px',
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '6px',
                  color: '#4ade80',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(34,197,94,0.25)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(34,197,94,0.15)'}>
                  View Billing
                </button>
                <button style={{
                  padding: '10px 16px',
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '6px',
                  color: '#4ade80',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(34,197,94,0.25)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(34,197,94,0.15)'}>
                  Account Settings
                </button>
              </div>
            </div> */}
          </div>

          {/* Footer */}
        <Footer />
        </div>
      </div>
    </div>
  );
}