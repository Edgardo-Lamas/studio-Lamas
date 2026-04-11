import ScrollReveal from '../ui/ScrollReveal'
import { stack } from '../../data/services'

const base = import.meta.env.BASE_URL

export default function About() {
  return (
    <section id="sobre-mi" style={{ background: 'var(--bg-secondary)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <div className="about-grid">

          {/* Foto */}
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(201,168,76,0.25)',
                  boxShadow: '0 0 60px rgba(74,127,165,0.15), 0 0 120px rgba(201,168,76,0.08)',
                }}>
                  <img
                    src={`${base}img/capturas/Edgardo/lamas.png`}
                    alt="Edgardo Lamas"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {/* Línea dorada lateral */}
                <div style={{
                  position: 'absolute',
                  top: '10%', bottom: '10%',
                  right: '-1.1rem',
                  width: '2px',
                  background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
                  opacity: 0.4,
                  borderRadius: '1px',
                }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Texto */}
          <div>
            <ScrollReveal>
              <p className="section-label">Sobre mí</p>
              <h2 className="section-title">Edgardo Lamas</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                La Plata · Buenos Aires · Argentina
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1rem' }}>
                A los 52 años tomé una decisión que cambió todo: reinventarme. Sin red de contención,
                sin atajos. Me metí de lleno en el mundo digital y no paré más.
                Me formé en <em style={{ color: 'var(--text-primary)' }}>Community Management, Marketing Digital, Desarrollo Web e IA</em> en
                academias de Argentina, España y Estados Unidos.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.75rem' }}>
                Esa trayectoria me dio algo que no se enseña en ninguna academia:
                entender el problema antes de escribir una línea de código.
                Hoy construyo sistemas web para estudios jurídicos y PyMEs —
                herramientas que <em style={{ color: 'var(--gold)' }}>la gente realmente usa</em>, no proyectos que quedan en un cajón.
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
