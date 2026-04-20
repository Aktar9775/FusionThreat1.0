import React, { useState } from 'react';
import { Mail, MapPin, Globe, CheckCircle, Send } from 'lucide-react';

const slots = ['Mon 9am','Mon 11am','Mon 2pm','Tue 10am','Tue 1pm','Tue 3pm','Wed 9am','Wed 11am','Wed 2pm'];

export default function Contact() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '', concern: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', company: '', size: '', concern: '' });
    setSelectedSlot(null);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(0,255,136,0.03)',
    border: '1px solid var(--border)',
    borderRadius: 2,
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <div className="section-label">// Lead Generation & Booking</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff' }}>
            Get Your Free Security Assessment
          </h2>
          <p style={{ color: 'var(--text-dim)', marginTop: 8 }}>All consultation requests go directly to <span style={{ color: 'var(--green)' }}>support@fusionthreat.com</span> — we respond within 24 hours.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Left: Benefits */}
          <div>
            <div className="card" style={{ padding: '32px 28px', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>
                Free 30-minute consultation with our senior security architects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Current security posture review', 'Industry-specific threat analysis', 'Compliance gap identification', 'Custom pricing & service recommendation', '30-day pilot program available'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={15} color="var(--green)" />
                    <span style={{ fontSize: 14, color: 'var(--text)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="card" style={{ padding: '24px 28px' }}>
              {[
                { icon: Mail, val: 'support@fusionthreat.com', href: 'mailto:support@fusionthreat.com' },
                { icon: Globe, val: 'www.fusionthreat.com', href: 'https://fusionthreat.com' },
                { icon: MapPin, val: '6300 E Hampden Ave STE 176, Denver CO 80222', href: null },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <c.icon size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  {c.href
                    ? <a href={c.href} style={{ fontSize: 14, color: 'var(--text-dim)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--green)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
                      >{c.val}</a>
                    : <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>{c.val}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="card" style={{ padding: '32px 28px' }}>
            {submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 16 }}>
                <CheckCircle size={40} color="var(--green)" />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff' }}>Request Sent!</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)' }}>We'll be in touch within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)', marginBottom: 8, letterSpacing: '0.1em' }}>SELECT A TIME SLOT</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {slots.map(slot => (
                    <button key={slot} type="button" onClick={() => setSelectedSlot(slot)}
                      style={{ padding: '5px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.05em', background: selectedSlot === slot ? 'var(--green)' : 'transparent', color: selectedSlot === slot ? '#000' : 'var(--text-dim)', border: `1px solid ${selectedSlot === slot ? 'var(--green)' : 'var(--border)'}`, borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s' }}
                    >{slot}</button>
                  ))}
                </div>

                {[
                  { key: 'name', placeholder: 'Full Name', required: true },
                  { key: 'email', placeholder: 'Work Email', type: 'email', required: true },
                  { key: 'company', placeholder: 'Company', required: false },
                ].map(f => (
                  <input key={f.key} type={f.type || 'text'} placeholder={f.placeholder} required={f.required}
                    value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--green)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                ))}

                <select value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                  style={{ ...inputStyle, color: form.size ? 'var(--text)' : 'var(--text-muted)', appearance: 'none' }}>
                  <option value="">Team Size</option>
                  {['1–50', '51–250', '251–500', '500+'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <textarea placeholder="Security Concern" rows={3} value={form.concern}
                  onChange={e => setForm(p => ({ ...p, concern: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'var(--green)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
                  Book Free Consultation <Send size={14} />
                </button>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
                  → Request sent to support@fusionthreat.com
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){#contact .contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
