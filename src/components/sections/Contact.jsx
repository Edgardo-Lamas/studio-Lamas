import { useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'

const SUPABASE_URL = 'https://ejrlncvtkrgzafckpmph.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcmxuY3Z0a3JnemFmY2twbXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzgyMzEsImV4cCI6MjA5MTQ1NDIzMX0.0_WhP3awdwKlpFgG_XCquGfmeh5p4ceSQ5J0kjijgGE'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
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
            <ScrollReveal>
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
                  href="mailto:edgardo@studiolamas.dev"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none', color: 'var(--text-secondary)',
                    fontSize: '0.9rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <span style={{ fontSize: '1.1rem' }}>✉</span>
                  edgardo@studiolamas.dev
                </a>
                <a
                  href="https://wa.me/5491100000000"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none', color: 'var(--text-secondary)',
                    fontSize: '0.9rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25d366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <span style={{ fontSize: '1.1rem' }}>💬</span>
                  WhatsApp
                </a>
                <a
                  href="https://linkedin.com/in/edgardolamas"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none', color: 'var(--text-secondary)',
                    fontSize: '0.9rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0077b5'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <span style={{ fontSize: '1.1rem' }}>💼</span>
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Col derecha — formulario */}
          <ScrollReveal delay={200}>
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
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
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
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
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
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
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
                  Hubo un error. Escribime directamente a edgardo@studiolamas.dev
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
