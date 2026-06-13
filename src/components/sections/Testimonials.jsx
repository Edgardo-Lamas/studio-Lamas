import ScrollReveal from '../ui/ScrollReveal'

const testimonials = [
  {
    quote: 'Teníamos todo el flujo de trabajo del estudio en planillas Excel que nadie entendía bien. Edgardo entendió el problema desde la primera reunión y entregó un sistema que el equipo adoptó sin resistencia. Hoy no podríamos trabajar sin él.',
    name: 'Dra. Valeria Mendoza',
    role: 'Titular — Estudio Jurídico Mendoza & Asociados',
    initials: 'VM',
    highlight: 'el equipo adoptó sin resistencia',
  },
  {
    quote: 'Lo que más me sorprendió fue que no tuve que explicarle el negocio dos veces. Captó la operación, identificó los cuellos de botella y propuso soluciones que yo no había pensado. El sistema que desarrolló nos ahorró horas de trabajo por semana.',
    name: 'Marcelo Ríos',
    role: 'Gerente General — Distribuidora Ríos S.R.L.',
    initials: 'MR',
    highlight: 'nos ahorró horas de trabajo por semana',
  },
  {
    quote: 'Necesitaba una plataforma que combinara contenido, mapas interactivos y e-commerce en un solo lugar. Edgardo no solo lo construyó — lo hizo con una calidad visual y técnica que superó lo que esperaba. Muy recomendable.',
    name: 'Pastor Roberto Castillo',
    role: 'Director — Sabiduría para el Corazón',
    initials: 'RC',
    highlight: 'superó lo que esperaba',
  },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ background: 'var(--bg-primary)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <ScrollReveal>
          <p className="section-label">Testimonios</p>
          <h2 className="section-title">Lo que dicen los clientes</h2>
          <p className="section-subtitle">
            Proyectos reales, resultados concretos.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="card" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Acento dorado superior */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--gold), transparent)',
                  opacity: 0.5,
                }} />

                {/* Estrellas */}
                <Stars />

                {/* Quote grande decorativa */}
                <svg
                  width="36" height="28"
                  viewBox="0 0 36 28"
                  fill="var(--gold)"
                  style={{ opacity: 0.2, flexShrink: 0 }}
                >
                  <path d="M0 28V17.5C0 12.833 1.083 9 3.25 6C5.417 3 8.583 1 12.75 0L14.5 3C12.167 3.833 10.417 5.167 9.25 7C8.083 8.833 7.5 11 7.5 13.5H14V28H0ZM22 28V17.5C22 12.833 23.083 9 25.25 6C27.417 3 30.583 1 34.75 0L36.5 3C34.167 3.833 32.417 5.167 31.25 7C30.083 8.833 29.5 11 29.5 13.5H36V28H22Z"/>
                </svg>

                {/* Texto del quote */}
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  flex: 1,
                  marginTop: '-0.5rem',
                }}>
                  {t.quote.split(t.highlight).map((part, idx, arr) =>
                    idx < arr.length - 1
                      ? [part, <strong key={idx} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{t.highlight}</strong>]
                      : part
                  )}
                </p>

                {/* Separador */}
                <div style={{
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)',
                }} />

                {/* Autor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(74,127,165,0.25) 0%, rgba(201,168,76,0.15) 100%)',
                    border: '1.5px solid rgba(201,168,76,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    flexShrink: 0,
                    letterSpacing: '0.05em',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
