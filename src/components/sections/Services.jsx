import ScrollReveal from '../ui/ScrollReveal'
import { services } from '../../data/services'

const icons = [
  // Sistemas de gestión
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>,
  // LegalTech IA
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M6.343 6.343l-1.06 1.06M3 12H1.5M6.343 17.657l-1.06 1.06M12 19.5V21M17.657 17.657l1.06 1.06M21 12h-1.5M17.657 6.343l1.06-1.06M15.536 8.464a5 5 0 1 1-7.072 7.072 5 5 0 0 1 7.072-7.072Z" />
  </svg>,
  // Integraciones
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 0-4.5H6v4.5Zm0 0H3.75m2.25 0v4.5m0-4.5h2.25a2.25 2.25 0 0 1 0 4.5H6v-4.5Z" />
  </svg>,
]

export default function Services() {
  return (
    <section id="servicios" style={{ background: 'var(--bg-secondary)', padding: '5rem 0' }}>
      <div className="section-inner" style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <ScrollReveal>
          <p className="section-label">Qué hago</p>
          <h2 className="section-title">Qué construyo en Studio Lamas</h2>
          <p className="section-subtitle">
            Sistemas reales para problemas reales. Cada proyecto arranca entendiendo el flujo de trabajo, no el formulario de contacto.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 120}>
              <div className="card card-gold" style={{ height: '100%' }}>
                <div style={{
                  width: '52px', height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(74,124,148,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--accent)',
                  transition: 'background 0.25s, color 0.25s',
                }}
                  className="service-icon"
                >
                  {icons[i]}
                </div>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .card:hover .service-icon {
          background: rgba(74,124,148,0.15);
          color: var(--accent-light);
        }
      `}</style>
    </section>
  )
}
