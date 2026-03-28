import ScrollReveal from '../ui/ScrollReveal'
import LogoSVG from '../ui/LogoSVG'
import { stack } from '../../data/services'

export default function About() {
  return (
    <section id="sobre-mi" style={{ background: 'var(--bg-secondary)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <div className="about-grid">
          {/* Avatar / Logo */}
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '140px', height: '140px',
                borderRadius: '50%',
                background: 'var(--nav-bg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 0 0 4px rgba(201,162,39,0.2), 0 0 0 8px rgba(201,162,39,0.08)',
              }}>
                <LogoSVG size={40} />
                <span style={{ color: '#fff', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', marginTop: '0.2rem' }}>
                  EL
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Texto */}
          <div>
            <ScrollReveal>
              <p className="section-label">Sobre mí</p>
              <h2 className="section-title">Edgardo Lamas</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                La Plata · Buenos Aires · Argentina
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Desarrollador web especializado en sistemas para estudios jurídicos y PyMEs.
                Construyo herramientas que las personas realmente usan: no demos que quedan en un cajón,
                sino aplicaciones que reemplazan procesos reales.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                Trabajo con React, Supabase, PostgreSQL e IA aplicada. Menos buzzword, más soluciones concretas.
                Cada proyecto arranca con una pregunta: <em style={{ color: 'var(--text-primary)' }}>"¿qué problema real resuelve esto?"</em>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  Stack principal
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {stack.map(item => (
                    <span key={item} className="tag tag-gold">{item}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 700px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
