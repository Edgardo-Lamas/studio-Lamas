import ScrollReveal from '../ui/ScrollReveal'

const testimonials = [
  {
    quote: 'Teníamos todo el flujo de trabajo del estudio en planillas Excel que nadie entendía bien. Edgardo entendió el problema desde la primera reunión y entregó un sistema que el equipo adoptó sin resistencia. Hoy no podríamos trabajar sin él.',
    name: 'Dra. Valeria Mendoza',
    role: 'Titular — Estudio Jurídico Mendoza & Asociados',
    initials: 'VM',
  },
  {
    quote: 'Lo que más me sorprendió fue que no tuve que explicarle el negocio dos veces. Captó la operación, identificó los cuellos de botella y propuso soluciones que yo no había pensado. El sistema que desarrolló nos ahorró horas de trabajo por semana.',
    name: 'Marcelo Ríos',
    role: 'Gerente General — Distribuidora Ríos S.R.L.',
    initials: 'MR',
  },
  {
    quote: 'Necesitaba una plataforma que combinara contenido, mapas interactivos y e-commerce en un solo lugar. Edgardo no solo lo construyó — lo hizo con una calidad visual y técnica que superó lo que esperaba. Muy recomendable.',
    name: 'Pastor Roberto Castillo',
    role: 'Director — Sabiduría para el Corazón',
    initials: 'RC',
  },
]

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
                gap: '1.5rem',
                height: '100%',
              }}>
                {/* Comillas decorativas */}
                <span style={{
                  fontSize: '3rem',
                  lineHeight: 1,
                  color: 'var(--gold)',
                  opacity: 0.4,
                  fontFamily: 'Georgia, serif',
                }}>
                  "
                </span>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  flex: 1,
                  marginTop: '-1rem',
                }}>
                  {t.quote}
                </p>

                {/* Línea divisora */}
                <div style={{
                  height: '1px',
                  background: 'linear-gradient(to right, var(--gold), transparent)',
                  opacity: 0.25,
                }} />

                {/* Autor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--nav-bg)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    flexShrink: 0,
                    letterSpacing: '0.05em',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
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
