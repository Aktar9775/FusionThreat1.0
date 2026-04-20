import React, { useEffect, useRef, useState } from 'react';

const CITIES = [
  { name: 'New York', x: 0.22, y: 0.35 },
  { name: 'London', x: 0.46, y: 0.26 },
  { name: 'Moscow', x: 0.58, y: 0.22 },
  { name: 'Beijing', x: 0.73, y: 0.31 },
  { name: 'Tokyo', x: 0.82, y: 0.33 },
  { name: 'Mumbai', x: 0.66, y: 0.44 },
  { name: 'São Paulo', x: 0.28, y: 0.62 },
  { name: 'Lagos', x: 0.48, y: 0.50 },
  { name: 'Sydney', x: 0.83, y: 0.70 },
  { name: 'Toronto', x: 0.20, y: 0.30 },
  { name: 'Paris', x: 0.47, y: 0.27 },
  { name: 'Dubai', x: 0.62, y: 0.40 },
  { name: 'Singapore', x: 0.76, y: 0.53 },
  { name: 'Seoul', x: 0.80, y: 0.31 },
  { name: 'Chicago', x: 0.19, y: 0.31 },
];

function Arc({ src, dst, width, color, progress, opacity }) {
  const mx = (src.x + dst.x) / 2;
  const my = (src.y + dst.y) / 2 - 0.15;
  const d = `M ${src.x * 100}% ${src.y * 100}% Q ${mx * 100}% ${my * 100}% ${dst.x * 100}% ${dst.y * 100}%`;
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={width} opacity={opacity * progress} strokeDasharray="4 3" />
    </svg>
  );
}

export default function ThreatMap() {
  const [arcs, setArcs] = useState([]);
  const [blocked, setBlocked] = useState(934);

  useEffect(() => {
    const spawn = () => {
      const src = CITIES[Math.floor(Math.random() * CITIES.length)];
      let dst;
      do { dst = CITIES[Math.floor(Math.random() * CITIES.length)]; } while (dst === src);
      const isAttack = Math.random() > 0.3;
      const id = Date.now() + Math.random();
      setArcs(prev => [...prev.slice(-12), { id, src, dst, color: isAttack ? '#ff3355' : '#00ff88', width: isAttack ? 1 : 0.5, opacity: isAttack ? 0.6 : 0.3, progress: 0 }]);
      if (isAttack) setBlocked(b => b + 1);
    };
    spawn();
    const i = setInterval(spawn, 1800);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="tmap" style={{ padding: '100px 24px', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div className="section-label">// Global Threat Intelligence</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff' }}>
            Live Threat Map
          </h2>
          <p style={{ color: 'var(--text-dim)', marginTop: 8, maxWidth: 500 }}>Real-time visualization of global attack origins and blocked threats across our client network.</p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          {[
            { v: blocked.toLocaleString(), l: 'Attacks Blocked / hr', c: 'var(--red)' },
            { v: '29', l: 'Active Investigations', c: 'var(--amber)' },
            { v: '99.9%', l: 'Uptime This Month', c: 'var(--green)' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '16px 24px', minWidth: 160 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: s.c }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="card" style={{ position: 'relative', height: 420, overflow: 'hidden', padding: 0 }}>
          {/* World map SVG background (simplified continents using clip paths) */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse 40% 25% at 20% 38%, rgba(0,255,136,0.04) 0%, transparent 100%),
              radial-gradient(ellipse 20% 15% at 47% 28%, rgba(0,255,136,0.04) 0%, transparent 100%),
              radial-gradient(ellipse 15% 20% at 58% 24%, rgba(0,255,136,0.03) 0%, transparent 100%),
              radial-gradient(ellipse 25% 20% at 75% 35%, rgba(0,255,136,0.03) 0%, transparent 100%),
              radial-gradient(ellipse 10% 15% at 83% 70%, rgba(0,255,136,0.03) 0%, transparent 100%),
              radial-gradient(ellipse 8% 10% at 27% 63%, rgba(0,255,136,0.03) 0%, transparent 100%)
            `,
          }} />

          {/* Grid overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)', backgroundSize: '60px 40px' }} />

          {/* Arcs */}
          {arcs.map(arc => <Arc key={arc.id} {...arc} />)}

          {/* City dots */}
          {CITIES.map((city, i) => (
            <div key={i} style={{ position: 'absolute', left: `${city.x * 100}%`, top: `${city.y * 100}%`, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: 'var(--glow-sm)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(0,255,136,0.3)', animation: 'pulse 2s ease infinite', animationDelay: `${i * 0.2}s` }} />
              </div>
            </div>
          ))}

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { color: 'var(--red)', label: 'Critical Attack' },
              { color: 'var(--amber)', label: 'Suspicious Activity' },
              { color: 'var(--green)', label: 'Protected Client' },
            ].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
