import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  handleConsultationBooking,
  sendTicketNotification,
} from "./services/emailService";

/* ── CountUp hook ─────────────────────────────────────────────────────────── */
function useCountUp(target, duration, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(pct * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return val;
}

/* ── Nav ──────────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
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
        <a href="#hero" className="nav__logo" style={{ display: "flex", alignItems: "left", gap: "0" }}>
          <img src="/loc.png" alt="FusionThreat Logo" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--head)", fontSize: "18px", fontWeight: "600", letterSpacing: "0.02em" }}>
            Fusion<strong style={{ color: "var(--red)" }}>Threat</strong>
          </span>
        </a>
        <ul className={"nav__links" + (open ? " nav__links--open" : "")}>
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} onClick={() => setOpen(false)}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="nav__actions">
          <span className="nav__live">
            <span className="pulse" />SOC LIVE
          </span>
          <a href="#contact" className="btn btn--sm btn--primary">Get Protected</a>
          <button className="nav__burger" onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function HeroStat({ val, suffix, label, prefix }) {
  const [vis, setVis] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  const count = useCountUp(Math.floor(val), 1500, vis);
  const display = Number.isInteger(val) ? count : vis ? val.toFixed(1) : "0";
  return (
    <div className="hero__stat" ref={ref}>
      <div className="hero__stat-val">{prefix || ""}{display}{suffix}</div>
      <div className="hero__stat-label">{label}</div>
    </div>
  );
}

function Hero() {
  const stats = [
    { val: 15, suffix: "m", label: "Critical Response SLA", prefix: "<" },
    { val: 99.9, suffix: "%", label: "Platform Uptime" },
    { val: 24, suffix: "/7", label: "Continuous Monitoring" },
    { val: 0, suffix: "", label: "Setup Fee Pilot", prefix: "$" },
  ];
  return (
    <section id="hero" className="hero">
      <ThreatMapCanvas />
      <div className="hero__grid-bg" />
      <div className="hero__glow" />
      <div className="hero__shield-wrap">
        <div className="hero__shield-glow" />
        <img src="/loc.png" alt="FusionThreat Shield" className="hero__shield-svg" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        <div className="hero__shield-brand">
          <span className="hero__shield-name">Fusion<strong>Threat</strong></span>
          <span className="hero__shield-tagline">NEXT-GEN CYBER DEFENSE</span>
        </div>
      </div>
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="tag tag--green">Enterprise SOC</span>
          <span className="tag tag--dim">24/7/365 Active Protection</span>
        </div>
        <h1 className="hero__heading">
          Next-Generation <span className="hero__accent">Cyber Defense</span>
        </h1>
        <p className="hero__sub">
          Enterprise-grade Security Operations Center protecting your business from ransomware, data breaches,
          and advanced persistent threats — at a fraction of in-house cost.
        </p>
        <div className="hero__ctas">
          <a href="#contact" className="btn btn--primary btn--lg">➧ Free Security Assessment</a>
          <a href="#socdashboard" className="btn btn--ghost btn--lg">View Live SOC</a>
        </div>
        <div className="hero__stats">{stats.map((s) => <HeroStat key={s.label} {...s} />)}</div>
      </div>
      <div className="hero__scan-line" />
    </section>
  );
}

/* ── Alert pool ───────────────────────────────────────────────────────────── */
const ALERT_POOL = [
  { msg: "Brute force blocked — 192.168.44.12 → auth-server", sev: "critical" },
  { msg: "Unusual outbound — 10.0.2.55 sending 3.4 GB/hr — flagged", sev: "high" },
  { msg: "Patch deployed: CVE-2024-6387 — 48 endpoints updated", sev: "info" },
  { msg: "Phishing quarantined — 22 recipients protected — Score 99/100", sev: "high" },
  { msg: "Privilege escalation blocked — ops@client.com — SOAR contained", sev: "critical" },
  { msg: "Port scan detected — origin 45.33.11.82 — blocked at perimeter", sev: "medium" },
  { msg: "New IOC added to blocklist — 12 clients auto-protected", sev: "info" },
  { msg: "Lateral movement attempt — VLAN 14 → VLAN 22 — denied", sev: "critical" },
  { msg: "DNS tunneling detected — host: workstation-07 — quarantined", sev: "high" },
  { msg: "Ransomware signature match — process killed — endpoint isolated", sev: "critical" },
  { msg: "Suspicious login: admin@corp.io from TOR exit node — blocked", sev: "high" },
  { msg: "DDoS mitigated — 84k req/s absorbed — uptime maintained", sev: "medium" },
  { msg: "Zero-day exploit attempt blocked — CVE-2025-1891 signature", sev: "critical" },
  { msg: "Compliance scan complete — 0 critical findings — report ready", sev: "info" },
  { msg: "Credential stuffing — 2,400 attempts — all blocked by WAF", sev: "medium" },
];

/* ── Security score gauge ─────────────────────────────────────────────────── */
function SecurityGauge({ score }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const arcLen = circ * (220 / 360);
  const dashArr = arcLen;
  const dashOff = arcLen - arcLen * (score / 100);
  const color = score >= 85 ? "#00ff88" : score >= 65 ? "#ffcc00" : "#ff3333";
  return (
    <div className="gauge-wrap">
      <svg viewBox="0 0 120 90" className="gauge-svg">
        <circle cx="60" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)"
          strokeWidth="8" strokeDasharray={`${arcLen} ${circ}`}
          strokeDashoffset={0} strokeLinecap="round"
          transform="rotate(160 60 65)"
        />
        <circle cx="60" cy="65" r={r} fill="none" stroke={color}
          strokeWidth="8" strokeDasharray={`${dashArr} ${circ}`}
          strokeDashoffset={dashOff} strokeLinecap="round"
          transform="rotate(160 60 65)"
          style={{ transition: "stroke-dashoffset 1s ease, stroke 0.5s ease" }}
        />
        <circle cx="60" cy="65" r={r} fill="none" stroke={color}
          strokeWidth="2" strokeDasharray={`${dashArr} ${circ}`}
          strokeDashoffset={dashOff} strokeLinecap="round"
          transform="rotate(160 60 65)"
          opacity="0.2"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="60" y="60" textAnchor="middle" fontSize="22" fontWeight="700" fill={color} fontFamily="Rajdhani,sans-serif">{score}</text>
        <text x="60" y="74" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Exo 2,sans-serif">SECURITY SCORE</text>
        {[0, 25, 50, 75, 100].map((t) => {
          const angle = ((160 + (t / 100) * 220) * Math.PI) / 180;
          const ix = 60 + (r + 6) * Math.cos(angle);
          const iy = 65 + (r + 6) * Math.sin(angle);
          return <circle key={t} cx={ix} cy={iy} r="1.5" fill="rgba(255,255,255,0.2)" />;
        })}
        <text x="14" y="82" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="Share Tech Mono,monospace">0</text>
        <text x="99" y="82" fontSize="6" fill="rgba(255,255,255,0.3)" fontFamily="Share Tech Mono,monospace">100</text>
      </svg>
      <div className="gauge-sub">↑ 6pts this month</div>
    </div>
  );
}

/* ── SOC Dashboard ────────────────────────────────────────────────────────── */
const SVC_STATUS = [
  {
    name: "SIEM", status: "Operational",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h10" /><rect x="14" y="14" width="6" height="6" rx="1" /><path d="M16 17l1 1 2-2" /></svg>,
  },
  {
    name: "Monitor", status: "Operational",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="12" cy="10" r="2" /><path d="M12 8V6M12 12v2M10 10H8M14 10h2" /></svg>,
  },
  {
    name: "Threat Intel", status: "Operational",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7L12 2z" /><path d="M9 12l2 2 4-4" /></svg>,
  },
  {
    name: "SOAR", status: "Maintenance",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  },
  {
    name: "XDR Engine", status: "Operational",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M8 11h6M11 8v6" /></svg>,
  },
  {
    name: "Compliance", status: "Operational",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12l2 2 4-4" /></svg>,
  },
];

function LiveAlertFeed() {
  const [alerts, setAlerts] = useState(() =>
    ALERT_POOL.slice(0, 5).map((a, i) => ({ ...a, id: i, ts: Date.now() - i * 8000, age: i * 8 }))
  );
  const [popup, setPopup] = useState(null);
  const counterRef = useRef(ALERT_POOL.length);

  useEffect(() => {
    const t = setInterval(() => {
      const pool = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)];
      const newAlert = { ...pool, id: counterRef.current++, ts: Date.now(), age: 0, fresh: true };
      setAlerts((prev) => [newAlert, ...prev.slice(0, 6)]);
      setPopup(newAlert);
      setTimeout(() => setPopup(null), 3500);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setAlerts((prev) => prev.map((a) => ({ ...a, age: Math.round((Date.now() - a.ts) / 1000), fresh: false })));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const fmtAge = (s) => (s < 60 ? `${s}s` : s < 3600 ? `${Math.floor(s / 60)}m` : `${Math.floor(s / 3600)}h`);

  return (
    <>
      {popup && (
        <div className={"alert-popup alert-popup--" + popup.sev} key={popup.id}>
          <div className="alert-popup__dot" />
          <div className="alert-popup__body">
            <div className="alert-popup__label">{popup.sev.toUpperCase()}</div>
            <div className="alert-popup__msg">{popup.msg}</div>
          </div>
          <div className="alert-popup__time">now</div>
        </div>
      )}
      <div className="soc__alerts-panel glass-card">
        <div className="soc__panel-title">&#9632; Live Alert Feed <span className="live-blink">LIVE</span></div>
        <div className="soc__alert-list">
          {alerts.map((a, i) => (
            <div key={a.id} className={"soc__alert soc__alert--" + a.sev + (a.fresh && i === 0 ? " soc__alert--new" : "")}>
              <span className="soc__alert-dot" />
              <span className="soc__alert-msg">{a.msg}</span>
              <span className="soc__alert-time">{fmtAge(a.age)}</span>
            </div>
          ))}
        </div>
        <div className="soc__resp-time">
          <span>Avg. Response Time</span>
          <strong className="green">7.6m</strong>
          <span className="dim">SLA &lt;15 min</span>
        </div>
      </div>
    </>
  );
}

function SOCDashboard() {
  const [threats, setThreats] = useState(3418);
  const [score] = useState(91);
  useEffect(() => {
    const t = setInterval(() => setThreats((p) => p + Math.floor(Math.random() * 3)), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="socdashboard" className="section soc">
      <div className="container">
        <ThreatMapCanvas />
        <div className="section__header">
          <h2>Real-Time Security Operations Center</h2>
          <p>Live metrics from our enterprise SOC — updated in real time.</p>
        </div>
        <div className="soc__grid">
          <div className="soc__metrics">
            <div className="metric-card glass-card metric-card--green">
              <div className="metric-card__val">{threats.toLocaleString()}</div>
              <div className="metric-card__label">Threats Blocked Today</div>
              <div className="metric-card__sub">↑ 16% from yesterday</div>
            </div>
            <div className="metric-card glass-card metric-card--blue">
              <div className="metric-card__val">1,472</div>
              <div className="metric-card__label">Systems Monitored</div>
              <div className="metric-card__sub">Across 58 client environments</div>
            </div>
            <div className="metric-card glass-card metric-card--cyan metric-card--gauge">
              <div className="metric-card__label">Avg. Security Score</div>
              <SecurityGauge score={score} />
            </div>
          </div>
          <LiveAlertFeed />
          <div className="soc__status-panel glass-card">
            <div className="soc__panel-title">Service Status</div>
            {SVC_STATUS.map((s) => (
              <div key={s.name} className="soc__status-row">
                <span className={"soc__status-icon svc-icon " + (s.status === "Operational" ? "svc-icon--green" : "svc-icon--yellow")}>{s.icon}</span>
                <span className="soc__status-name">{s.name}</span>
                <span className={"soc__status-badge " + (s.status === "Operational" ? "badge--green" : "badge--yellow")}>
                  <span className={"status-dot " + (s.status === "Operational" ? "status-dot--green" : "status-dot--yellow")} />
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Threat Map ───────────────────────────────────────────────────────────── */
function ThreatMapCanvas() {
  const canvasRef = useRef(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
 
    let animId;
    let W, H;
 
    /* ── resize ── */
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
 
    /* ── dot factory ── */
    const DOT_COUNT = 55;
    const dots = [];
 
    const mkDot = (forceEdge = false) => {
      const r = 1.5 + Math.random() * 3.5;          // radius 1.5–5px
      const speed = 0.10 + Math.random() * 0.30;
      const angle = Math.random() * Math.PI * 2;
      const x = forceEdge
        ? Math.random() < 0.5 ? -r : W + r
        : Math.random() * W;
      const y = forceEdge
        ? Math.random() < 0.5 ? -r : H + r
        : Math.random() * H;
 
      return {
        x, y, r,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 0,
        targetAlpha: 0.15 + Math.random() * 0.55,
        fadeIn: true,
        pulse: Math.random() * Math.PI * 2,    // phase offset
        pulseSpeed: 0.018 + Math.random() * 0.025,
        twinkle: Math.random() > 0.6,          // some dots twinkle
        glow: Math.random() > 0.55,            // some have a soft halo
      };
    };
 
    for (let i = 0; i < DOT_COUNT; i++) dots.push(mkDot(false));
 
    /* ── draw loop ── */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
 
      dots.forEach((d, i) => {
        /* movement */
        d.x += d.vx;
        d.y += d.vy;
 
        /* pulse phase */
        d.pulse += d.pulseSpeed;
 
        /* fade in */
        if (d.fadeIn) {
          d.alpha = Math.min(d.alpha + 0.008, d.targetAlpha);
          if (d.alpha >= d.targetAlpha) d.fadeIn = false;
        }
 
        /* twinkle flicker */
        let displayAlpha = d.alpha;
        if (d.twinkle) {
          displayAlpha = d.alpha * (0.55 + 0.45 * Math.sin(d.pulse * 1.7));
        }
 
        /* pulse radius */
        const pulseR = d.r + (d.glow ? 1.2 * Math.sin(d.pulse) : 0);
 
        /* recycle when out of bounds */
        const margin = d.r + 8;
        if (d.x < -margin || d.x > W + margin || d.y < -margin || d.y > H + margin) {
          dots[i] = mkDot(true);
          return;
        }
 
        /* glow halo */
        if (d.glow) {
          const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, pulseR * 4.5);
          grad.addColorStop(0, `rgba(255,40,40,${displayAlpha * 0.45})`);
          grad.addColorStop(1, `rgba(255,40,40,0)`);
          ctx.beginPath();
          ctx.arc(d.x, d.y, pulseR * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
 
        /* core dot */
        ctx.beginPath();
        ctx.arc(d.x, d.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,50,50,${displayAlpha})`;
        ctx.fill();
      });
 
      /* draw faint connection lines between nearby dots */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.09;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(255,60,60,${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
 
      animId = requestAnimationFrame(draw);
    };
 
    draw();
 
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);
 
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
 
function ThreatMap() {
  return (
    <section id="threatmap" className="section threatmap">
      <div className="container">
        <div className="section__header">
       
          <h2>Live Threat Map</h2>
          <p>Real-time visualization of global attack origins and blocked threats across our client network.</p>
        </div>
 
        {/* outer wrapper — positions the canvas behind the iframe */}
       
          {/* animated red-dot canvas — same particles as hero */}
          
 
          {/* iframe sits on top of the canvas */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "scale(1.3)",
              transformOrigin: "center center",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <iframe
              src="https://threatmap.checkpoint.com/"
              style={{
                width: "100%",
                
                height: "100%",
                border: "2px solid rgba(59, 59, 59, 0.1)",
              }}
              title="Live Cyber Threat Map"
            />
          </div>
        </div>
      
    </section>
  );
}

/* ── Services ─────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01", title: "24/7 Monitoring & Triage",
    desc: "Continuous visibility across endpoints, cloud, and network with real-time SIEM correlation and automated alerting.",
    tags: ["SIEM analysis", "Multi-source correlation", "Cloud & endpoint coverage"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M6 8l3 3 2-2 3 4 2-2" /></svg>,
  },
  {
    num: "02", title: "Incident Response",
    desc: "Speed is critical. Our IR team follows strict SLAs to isolate and neutralize attacks before significant damage occurs.",
    tags: ["<15 min critical response", "Threat isolation", "Root cause analysis"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7L12 2z" /><path d="M12 8v4M12 16h.01" /></svg>,
  },
  {
    num: "03", title: "Vulnerability Management",
    desc: "Proactive identification of security gaps before attackers exploit them. Monthly assessments included.",
    tags: ["Monthly scans", "Critical patching <24hr", "Penetration testing"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v3l2 2" /></svg>,
  },
  {
    num: "04", title: "Compliance Enablement",
    desc: "Navigate GDPR, HIPAA, SOC 2, and ISO 27001 with automated reporting, dashboards, and audit support.",
    tags: ["Automated dashboards", "Audit preparation", "Gap analysis"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12l2 2 4-4" /></svg>,
  },
  {
    num: "05", title: "Threat Hunting",
    desc: "Proactive search for hidden threats using XDR that evade automated detection systems.",
    tags: ["Hypothesis-driven", "Behavioral analysis", "IOC identification"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L3 7v5c0 5 4 9.5 9 11 5-1.5 9-6 9-11V7L12 2z" /><path d="M9 12l2 2 4-4M12 7v1" /></svg>,
  },
  {
    num: "06", title: "Cloud Security",
    desc: "Protect AWS, Azure, and GCP with dedicated cloud monitoring and posture management.",
    tags: ["Workload protection", "Identity monitoring", "Misconfiguration detection"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /><path d="M12 14v-4M10 12l2-2 2 2" /></svg>,
  },
];

function Services() {
  return (
  <section id="services" className="section services">
    <div className="container">

      {/* ✅ Wrap heading for better control */}
      <div className="section__header">
        <h2 className="services__heading">
  Detect{" "}
  <span className="icon">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 7h-6l4 5l-4 5h6l4 -5l-4 -5" />
    </svg>
  </span>
  {" "}Respond{" "}
  <span className="icon">
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 7h-6l4 5l-4 5h6l4 -5l-4 -5" />
    </svg>
  </span>
  {" "}Eliminate
</h2>

        {/* ✅ Move canvas inside header properly */}
        <ThreatMapCanvas />
      </div>

      {/* ✅ Services Grid */}
      <div className="services__grid">
        {SERVICES.map((s) => (
          <div key={s.num} className="service-card glass-card">
            <div className="service-card__svg-icon">{s.icon}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>

            <div className="service-card__tags">
              {s.tags.map((t) => (
                <span key={t} className="tag tag--dim">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);
}

/* ── Ticketing ────────────────────────────────────────────────────────────── */
const TICKETS = [
  { id: "INC-0041", status: "Open", title: "Ransomware activity detected on file server", sev: "Critical", cat: "Malware", analyst: "T2 Analyst", time: "6h ago" },
  { id: "INC-0040", status: "In Progress", title: "Phishing campaign targeting HR department", sev: "High", cat: "Phishing", analyst: "T1 Analyst", time: "1d ago" },
  { id: "INC-0039", status: "Resolved", title: "DDoS mitigation — web server overloaded", sev: "Medium", cat: "DDoS", analyst: "Engineer", time: "2d ago" },
  { id: "INC-0038", status: "Resolved", title: "Credential stuffing attempt on auth endpoint", sev: "Low", cat: "Auth", analyst: "T1 Analyst", time: "3d ago" },
];

function Ticketing() {
  const [form, setForm] = useState({ name: "", email: "", priority: "High", category: "Malware", title: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.title) return;
    setLoading(true);
    setError("");
    try {
      await sendTicketNotification(form);
      setSubmitted(true);
    } catch (err) {
      // If EmailJS isn't configured yet, still show success in dev/demo mode
      if (err.message && err.message.includes("not configured")) {
        console.warn("EmailJS not configured — showing demo success state.");
        setSubmitted(true);
      } else {
        setError("Failed to submit ticket. Please email support@fusionthreat.com directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ticketing" className="section ticketing">
      <div className="container">
        <div className="section__header">
          <h2>Submit &amp; Track Security Tickets</h2>
          <p>All tickets are sent to <span className="green">support@fusionthreat.com</span> and assigned to a dedicated analyst.</p>
        </div>
        <div className="ticketing__grid">
          <div className="ticketing__list">
            {TICKETS.map((t) => (
              <div key={t.id} className="ticket glass-card">
                <div className="ticket__header">
                  <span className="ticket__id dim">{t.id}</span>
                  <span className={"ticket__status ticket__status--" + t.status.replace(/ /g, "").toLowerCase()}>{t.status}</span>
                </div>
                <div className="ticket__title">{t.title}</div>
                <div className="ticket__meta">
                  <span className={"sev-badge sev-badge--" + t.sev.toLowerCase()}>● {t.sev}</span>
                  <span className="dim">{t.cat}</span>
                  <span className="dim">{t.analyst}</span>
                  <span className="dim">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="ticketing__form glass-card">
            {submitted ? (
              <div className="form__success">
                <div className="form__success-icon">✅</div>
                <h3>Ticket Submitted!</h3>
                <p>Our team responds within 15 minutes for critical issues.</p>
                <button className="btn btn--ghost" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", priority: "High", category: "Malware", title: "", desc: "" }); }}>
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="form__title">Submit New Ticket</h3>
                <input className="form__input" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="form__input" placeholder="Your Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <div className="form__row">
                  <select className="form__input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                    {["Critical", "High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <select className="form__input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {["Malware", "Phishing", "Access Issue", "Vulnerability", "Other"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <input className="form__input" placeholder="Issue Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <textarea className="form__input form__textarea" placeholder="Describe the security incident..." value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={4} />
                {error && <div className="form__error">{error}</div>}
                <button className="btn btn--primary btn--full" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting…" : "Submit Ticket →"}
                </button>
                <div className="form__note dim">→ Sent to support@fusionthreat.com</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────────── */
const PLANS = [
  { name: "Foundation", price: "$10–$20", unit: "/device/mo", featured: false, features: ["Business hours support", "24/7 critical alerts", "Basic SIEM monitoring", "Monthly reports", "Email support"] },
  { name: "Standard", price: "$50–$150", unit: "/user/mo", featured: true, badge: "Most Popular", features: ["24/7/365 SOC coverage", "Full incident response", "Threat intelligence", "Compliance dashboards", "Client portal access", "Quarterly reviews"] },
  { name: "Advanced MDR", price: "$200+", unit: "/user/mo", featured: false, features: ["Everything in Standard", "Active threat hunting", "Malware reverse engineering", "Full compliance suite", "Direct engineer access", "Custom SIEM rules"] },
];

function Pricing() {
  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <ThreatMapCanvas />
        <div className="section__header">
          <h2>Transparent Pricing</h2>
          <p>Predictable monthly pricing that scales with your business. No hidden fees.</p>
        </div>
        <div className="pricing__grid">
          {PLANS.map((p) => (
            <div key={p.name} className={"price-card glass-card" + (p.featured ? " price-card--featured" : "")}>
              {p.badge && <div className="price-card__badge">{p.badge}</div>}
              <h3 className="price-card__name">{p.name}</h3>
              <div className="price-card__price">{p.price}<span className="price-card__unit">{p.unit}</span></div>
              <div className="price-card__divider" />
              <ul className="price-card__features">
                {p.features.map((f) => <li key={f}><span className="green">✓</span> {f}</li>)}
              </ul>
              <a href="mailto:support@fusionthreat.com" className={"btn btn--full " + (p.featured ? "btn--primary" : "btn--ghost")}>Get Started</a>
            </div>
          ))}
        </div>
        <div className="pricing__note glass-card">
          <div className="pricing__note-item"><strong className="green">$1,750–$3,750/mo</strong><span className="dim">Small Business (1–50 Users)</span></div>
          <div className="pricing__note-divider" />
          <div className="pricing__note-item"><strong className="green">$10,000–$20,000/mo</strong><span className="dim">Mid-Market (51–250 Users)</span></div>
          <div className="pricing__note-divider" />
          <p className="dim" style={{ fontSize: "13px", margin: 0 }}>One-time setup fee = 1 month service. Annual agreements available. Net 30 payment terms.</p>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────────── */
const SLOTS = ["Mon 9am", "Mon 11am", "Mon 2pm", "Tue 10am", "Tue 1pm", "Tue 3pm", "Wed 9am", "Wed 11am", "Wed 2pm"];

function Contact() {
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", size: "1–50", concern: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBook = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    setError("");
    try {
      await handleConsultationBooking({ ...form, selectedSlot: slot });
      setSent(true);
    } catch (err) {
      // Graceful demo/dev fallback when EmailJS isn't wired up yet
      if (err.message && err.message.includes("not configured")) {
        console.warn("EmailJS not configured — showing demo success state.");
        setSent(true);
      } else {
        setError("Could not send your request. Please email support@fusionthreat.com directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section__header">
          <h2>Get Your Free Security Assessment</h2>
          <p>All requests go to <span className="green">support@fusionthreat.com</span> — we respond within 24 hours.</p>
        </div>
        <div className="contact__grid">
          <div className="contact__info glass-card">
            <h3>Free 30-minute consultation with our senior security architects</h3>
            <p className="dim">We'll evaluate your current environment, identify immediate risks, and provide a custom recommendation — completely free, no obligation.</p>
            <ul className="contact__benefits">
              {["Current security posture review", "Industry-specific threat analysis", "Compliance gap identification", "Custom pricing & service recommendation", "30-day pilot program available"].map((b) => (
                <li key={b}><span className="green">✓</span> {b}</li>
              ))}
            </ul>
            <div className="contact__direct">
              <div className="contact__direct-title dim">CONTACT DIRECTLY</div>
              {/* FIX: stroke-width → strokeWidth, class → className throughout */}
              <a href="mailto:support@fusionthreat.com" className="contact__link">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-10" />
                  <path d="M3 7l9 6l9-6" />
                </svg>{" "}support@fusionthreat.com
              </a>
              <a href="https://fusionthreat.com" className="contact__link">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M19.5 7a9 9 0 0 0-7.5-4a8.991 8.991 0 0 0-7.484 4" />
                  <path d="M11.5 3a16.989 16.989 0 0 0-1.826 4" />
                  <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
                  <path d="M19.5 17a9 9 0 0 1-7.5 4a8.991 8.991 0 0 1-7.484-4" />
                  <path d="M11.5 21a16.989 16.989 0 0 1-1.826-4" />
                  <path d="M12.5 21a16.989 16.989 0 0 0 1.828-4" />
                  <path d="M2 10l1 4l1.5-4l1.5 4l1-4" />
                  <path d="M17 10l1 4l1.5-4l1.5 4l1-4" />
                  <path d="M9.5 10l1 4l1.5-4l1.5 4l1-4" />
                </svg>{" "}www.fusionthreat.com
              </a>
              <div className="contact__link">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203.21l-4.243 4.242a3 3 0 0 1-4.097.135l-.144-.135l-4.244-4.243a9 9 0 0 1 12.728-12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0-6" />
                </svg>{" "}6300 E Hampden Ave STE 176, Denver CO 80222
              </div>
            </div>
          </div>
          <div className="contact__form glass-card">
            {sent ? (
              <div className="form__success">
                <div className="form__success-icon">✅</div>
                <h3>Request Sent!</h3>
                <p>We will be in touch shortly.</p>
                <div className="tag tag--green" style={{ alignSelf: "center" }}>30-Day Pilot Available</div>
              </div>
            ) : (
              <>
                <h3 className="form__title">Book Your Consultation</h3>
                <div className="form__label dim">Select a Time Slot</div>
                <div className="slot-grid">
                  {SLOTS.map((s) => (
                    <button key={s} className={"slot-btn" + (slot === s ? " slot-btn--active" : "")} onClick={() => setSlot(s)}>{s}</button>
                  ))}
                </div>
                <input className="form__input" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="form__input" placeholder="Work Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="form__input" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <select className="form__input" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                  {["1–50", "51–250", "251–500", "500+"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <textarea className="form__input form__textarea" placeholder="Primary security concern..." value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} rows={3} />
                {error && <div className="form__error">{error}</div>}
                <button className="btn btn--primary btn--full" onClick={handleBook} disabled={loading}>
                  {loading ? "Sending…" : "Book Free Consultation →"}
                </button>
                <div className="form__note dim">30-Day Pilot Available — Try full SOC free. No contract. No credit card required.</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0px", marginBottom: "12px" }}>
              <img src="/loc.png" alt="FusionThreat Logo" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
              <span style={{ fontFamily: "var(--head)", fontSize: "18px", fontWeight: "600", letterSpacing: "0.02em" }}>
                Fusion<strong style={{ color: "var(--red)" }}>Threat</strong>
              </span>
            </div>
            <p className="dim footer__tagline">Enterprise-grade Managed Security Service Provider. SOC protection 24/7/365.</p>
            <a href="mailto:support@fusionthreat.com" className="contact__link">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-10" />
                <path d="M3 7l9 6l9-6" />
              </svg>{" "}support@fusionthreat.com
            </a>
            <div className="footer__certs">
              <span className="tag tag--dim">CISSP Certified</span>
              <span className="tag tag--dim">MITRE ATT&CK</span>
              <span className="tag tag--dim">NIST CSF</span>
            </div>
          </div>
          {[
            { title: "Services", links: ["24/7 Monitoring", "Incident Response", "Vulnerability Mgmt", "Compliance", "Threat Hunting"] },
            { title: "Platform", links: ["SOC Dashboard", "Threat Map", "Ticketing", "Pricing", "Client Portal"] },
            { title: "Contact", links: ["support@fusionthreat.com", "www.fusionthreat.com", "Book Assessment", "Submit Ticket", "Client Login"] },
          ].map((col) => (
            <div key={col.title} className="footer__col">
              <h4 className="footer__col-title">{col.title}</h4>
              <ul>{col.links.map((l) => <li key={l}><a href="#hero" className="dim">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span className="dim">© 2026 FUSIONTHREAT. ALL RIGHTS RESERVED.</span>
          <span className="dim">PROTECTING YOUR BUSINESS. SECURING YOUR FUTURE.</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Scroll To Top ────────────────────────────────────────────────────────── */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollToTop = () => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  return visible ? (
    <button className="scroll-to-top" onClick={scrollToTop} title="Back to top">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  ) : null;
}

/* ── App ──────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <SOCDashboard />
      <ThreatMap />
      <Services />
      <Ticketing />
      <Pricing />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}