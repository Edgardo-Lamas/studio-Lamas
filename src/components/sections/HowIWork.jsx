import ScrollReveal from '../ui/ScrollReveal'
import { steps } from '../../data/services'

export default function HowIWork() {
  return (
    <section id="proceso" style={{ background: '#080f1e', padding: '5rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <ScrollReveal>
          <p className="section-label" style={{ color: 'var(--accent-light)' }}>Metodología</p>
          <h2 className="section-title" style={{ color: '#f1f5f9' }}>Cómo trabajo los proyectos</h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Sin magia. Sin promesas vacías. Un proceso claro que lleva de la idea al sistema que se usa.
          </p>
        </ScrollReveal>

        {/* Timeline desktop */}
        <div className="steps-grid">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 130}>
              <div className="step-card">
                {/* Número */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  opacity: 0.7,
                }}>
                  {step.number}
                </div>

                {/* Línea conectora (desktop) */}
                {i < steps.length - 1 && (
                  <div className="step-connector" />
                )}

                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  marginBottom: '0.6rem',
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA al final */}
        <ScrollReveal delay={600}>
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Si tenés una idea, una planilla que reemplazar, o un proceso que automatizar:
            </p>
            <a href="#contacto" className="btn btn-gold">Contame tu proyecto →</a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
        }
        .step-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem;
          padding: 1.75rem;
          position: relative;
          transition: border-color 0.25s, background 0.25s;
        }
        .step-card:hover {
          border-color: rgba(74,124,148,0.4);
          background: rgba(74,124,148,0.06);
        }
        .step-connector {
          display: none;
        }

        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
