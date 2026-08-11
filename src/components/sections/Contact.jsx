import { useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: '0.5rem',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    color: 'var(--text-primary)',
    background: '#1e293b',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contacto" style={{ background: 'var(--bg-primary)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <div className="contact-grid">
          {/* Col izquierda — invitación */}
          <div>
            <ScrollReveal direction="left">
              <p className="section-label">Contacto</p>
              <h2 className="section-title">Contame tu idea</h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Si tenés un estudio jurídico que trabaja con planillas, una PyME que necesita
                ordenar su operación, o una idea de sistema que todavía no existe: escribime.
                <br /><br />
                No hace falta que el proyecto esté definido. Hablamos, entiendo el problema,
                y te digo qué se puede hacer.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a
                  href="mailto:edgardolamas2000@gmail.com"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none', color: 'var(--text-secondary)',
                    fontSize: '0.9rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  edgardolamas2000@gmail.com
                </a>
                <a
                  href="https://wa.me/5491152604137"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none', color: 'var(--text-secondary)',
                    fontSize: '0.9rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25d366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/edgardo-lamas-dev/"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none', color: 'var(--text-secondary)',
                    fontSize: '0.9rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0077b5'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Col derecha — formulario */}
          <ScrollReveal delay={200} direction="right">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  ¿En qué puedo ayudarte?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Contame brevemente tu idea o el problema que querés resolver..."
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              {status === 'success' && (
                <div style={{
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '0.5rem',
                  padding: '0.85rem 1rem',
                  fontSize: '0.9rem',
                  color: '#059669',
                  fontWeight: 500,
                }}>
                  ¡Mensaje recibido! Te respondo a la brevedad.
                </div>
              )}
              {status === 'error' && (
                <div style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '0.5rem',
                  padding: '0.85rem 1rem',
                  fontSize: '0.9rem',
                  color: '#dc2626',
                }}>
                  Hubo un error. Escribime directamente a edgardolamas2000@gmail.com
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary"
                style={{ justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  )
}
