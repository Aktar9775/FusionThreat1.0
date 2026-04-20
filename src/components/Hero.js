import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

const stats = [
  { value: '<15m', label: 'Critical Response SLA' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '24/7', label: 'Continuous Monitoring' },
  { value: '$0', label: 'Setup Fee Pilot' },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${p.opacity})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,255,136,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', paddingTop: 80 }}>
      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Grid bg */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,170,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Top badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', border: '1px solid var(--border)', borderRadius: 2, marginBottom: 32, animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 1.5s ease infinite', boxShadow: 'var(--glow-sm)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', letterSpacing: '0.2em' }}>
            ENTERPRISE SOC · 24/7/365 ACTIVE PROTECTION
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(44px, 8vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: 28, animation: 'fadeUp 0.6s 0.1s ease both', animationFillMode: 'both' }}>
          <span style={{ display: 'block', color: '#fff' }}>Next-Generation</span>
          <span style={{ display: 'block', color: 'var(--green)', textShadow: '0 0 40px rgba(0,255,136,0.4)' }}>Cyber Defense</span>
        </h1>

        <p style={{ maxWidth: 560, fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 40, animation: 'fadeUp 0.6s 0.2s ease both', animationFillMode: 'both' }}>
          Enterprise-grade Security Operations Center protecting your business from ransomware, data breaches, and advanced persistent threats — at a fraction of in-house cost.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 72, animation: 'fadeUp 0.6s 0.3s ease both', animationFillMode: 'both' }}>
          <a href="#contact" className="btn-primary">
            Free Security Assessment <ArrowRight size={16} />
          </a>
          <a href="#soc" className="btn-outline">
            <Play size={14} /> View Live SOC
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', maxWidth: 700, animation: 'fadeUp 0.6s 0.4s ease both', animationFillMode: 'both' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'var(--bg)', padding: '20px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--green)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginTop: 4, letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', animation: 'pulse 2s ease infinite' }}>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
