import React, { useState, useEffect } from 'react';
import { Shield, Eye, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const initialAlerts = [
  { id: 1, msg: 'Brute force blocked — 192.168.44.12 → auth-server', time: 'now', level: 'critical' },
  { id: 2, msg: 'Unusual outbound — 10.0.2.55 sending 3.4GB/hr — flagged', time: '2m', level: 'high' },
  { id: 3, msg: 'Patch deployed: CVE-2024-6387 — 48 endpoints updated', time: '5m', level: 'ok' },
  { id: 4, msg: 'Phishing quarantined — 22 recipients protected — ThreatScore: 99/100', time: '9m', level: 'high' },
  { id: 5, msg: 'Privilege escalation blocked — user: ops@client.com — SOAR contained', time: '14m', level: 'critical' },
  { id: 6, msg: 'SSL cert renewed — 3 domains updated automatically', time: '18m', level: 'ok' },
  { id: 7, msg: 'Port scan detected — 203.45.12.8 — blocked at perimeter', time: '22m', level: 'high' },
];

const services = [
  { icon: Shield, name: 'SIEM', status: 'Operational' },
  { icon: Eye, name: 'Monitor', status: 'Operational' },
  { icon: AlertTriangle, name: 'Threat Intel', status: 'Operational' },
  { icon: Activity, name: 'SOAR', status: 'Maintenance' },
  { icon: Shield, name: 'XDR Engine', status: 'Operational' },
  { icon: CheckCircle, name: 'Compliance', status: 'Operational' },
];

function MetricCard({ value, label, sub, color = 'var(--red)' }) {
  return (
    <div style={{ padding: '24px', flex: 1, minWidth: 160, background: 'var(--glass)', border: '1px solid rgba(255,68,68,0.12)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
      <div style={{ fontFamily: 'var(--head)', fontWeight: 700, fontSize: 42, color, lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--dim)', marginBottom: 4 }}>{label}</div>
      {sub && <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-sec)' }}>{sub}</div>}
    </div>
  );
}

export default function SOCDashboard() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [threatCount, setThreatCount] = useState(3418);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(c => c + Math.floor(Math.random() * 3));
      const newAlerts = [
        'Anomalous login attempt — MFA challenge sent',
        'DNS tunneling detected — connection terminated',
        'Malware signature match — file quarantined',
        'Network sweep blocked — source IP banned 24h',
        'Ransomware behavior detected — process killed',
      ];
      const msg = newAlerts[Math.floor(Math.random() * newAlerts.length)];
      const levels = ['critical', 'high', 'ok'];
      setAlerts(prev => [
        { id: Date.now(), msg, time: 'now', level: levels[Math.floor(Math.random() * levels.length)] },
        ...prev.slice(0, 6),
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const levelColor = { critical: 'var(--red)', high: 'var(--yellow)', ok: 'var(--red)' };

  return (
    <section id="soc" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)', letterSpacing: '0.1em', marginBottom: 14, opacity: 0.8 }}>// Live SOC Dashboard</div>
        <h2 style={{ fontFamily: 'var(--head)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', letterSpacing: '-0.01em' }}>
          Real-Time Security Operations Center
        </h2>
        <p style={{ color: 'var(--dim)', marginTop: 12, maxWidth: 560 }}>Live metrics from our enterprise SOC — updated in real time.</p>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <MetricCard value={threatCount.toLocaleString()} label="Threats Blocked Today" sub="↑ 16% from yesterday" />
        <MetricCard value="1,472" label="Systems Monitored" sub="Across 58 client environments" color="var(--blue)" />
        <MetricCard value="91" label="Avg. Security Score" sub="↑ 6pts this month" color="var(--yellow)" />
        <MetricCard value="7.6m" label="Avg. Response Time" sub="SLA target: &lt;15 min" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Live alert feed */}
        <div style={{ background: 'var(--glass)', border: '1px solid rgba(255,68,68,0.12)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)' }}>// Live Alert Feed</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--dim)' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 1.5s ease infinite' }} />
              LIVE
            </div>
          </div>
          <div style={{ overflow: 'hidden', height: 280 }}>
            {alerts.map((a, i) => (
              <div key={a.id} style={{
                padding: '10px 20px',
                borderBottom: '1px solid rgba(255,68,68,0.05)',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                animation: i === 0 ? 'slideIn 0.3s ease' : 'none',
                background: i === 0 ? 'rgba(255,68,68,0.02)' : 'transparent',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: levelColor[a.level], marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${levelColor[a.level]}` }} />
                <div style={{ flex: 1, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)', lineHeight: 1.5 }}>{a.msg}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-sec)', flexShrink: 0 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Service status */}
        <div style={{ background: 'var(--glass)', border: '1px solid rgba(255,68,68,0.12)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,68,68,0.12)' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)' }}>// Service Status</span>
          </div>
          <div style={{ padding: 8 }}>
            {services.map((s, i) => {
              const operational = s.status === 'Operational';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 2, marginBottom: 2, background: 'rgba(255,68,68,0.02)' }}>
                  <s.icon size={14} color={operational ? 'var(--red)' : 'var(--yellow)'} />
                  <span style={{ flex: 1, fontFamily: 'var(--head)', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{s.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: operational ? 'var(--red)' : 'var(--yellow)', boxShadow: `0 0 6px ${operational ? 'var(--red)' : 'var(--yellow)'}`, animation: 'pulse 2s ease infinite' }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: operational ? 'var(--red)' : 'var(--yellow)' }}>
                      {s.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { 
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media(max-width:768px){
          .soc-grid{
            grid-template-columns:1fr!important
          }
        }
      `}</style>
    </section>
  );
}
