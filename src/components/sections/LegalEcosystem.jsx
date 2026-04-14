import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'

const nodes = [
  {
    label: 'Construye',
    name: 'Studio Lamas',
    desc: 'Desarrollo de sistemas web a medida para el sector jurídico.',
    href: null, // es el sitio actual
    color: 'var(--gold)',
    icon: '⚙',
  },
  {
    label: 'Consulta con IA',
    name: 'Alcance Legal Penal',
    desc: 'SaaS de consulta jurídica con RAG sobre legislación y jurisprudencia penal argentina.',
    href: 'https://edgardo-lamas.github.io/Alcance-Legal-Penal/',
    color: 'var(--accent)',
    icon: '⚖',
  },
  {
    label: 'Aprende a usarla',
    name: 'Legal Intelligence Systems',
    desc: 'Plataforma de formación en IA aplicada al derecho, para abogados en ejercicio.',
    href: 'https://legal-intelligence-system-wine.vercel.app/',
    color: 'var(--tagline)',
    icon: '🎓',
  },
]

const coming = [
  {
    icon: '📁',
    name: 'Gestor de expedientes',
    desc: 'Seguimiento de causas, estados y partes en tiempo real.',
  },
  {
    icon: '📅',
    name: 'Agenda de vencimientos procesales',
    desc: 'Alertas automáticas para plazos judiciales críticos.',
  },
  {
    icon: '💰',
    name: 'Facturación y honorarios',
    desc: 'Cálculo según aranceles, emisión de facturas y control de pagos.',
  },
]

export default function LegalEcosystem() {
  return (
    <section style={{ background: 'var(--bg-secondary)', padding: '5rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <ScrollReveal>
          <p className="section-label">Ecosistema LegalTech</p>
          <h2 className="section-title">Un abogado moderno necesita tres cosas</h2>
          <p className="section-subtitle">
            Las herramientas para trabajar, la formación para usarlas, y un desarrollador que entienda el derecho.
            Los tres existen. Los tres están conectados.
          </p>
        </ScrollReveal>

        {/* Nodos del ecosistema */}
        <div className="ecosystem-nodes">
          {nodes.map((node, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <ScrollReveal delay={i * 150}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${node.color}33`,
                    borderRadius: '1rem',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    boxShadow: `0 0 40px ${node.color}0d`,
                    width: '100%',
                  }}
                >
                  {/* Ícono + label */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem' }}>{node.icon}</span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      color: node.color,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      background: `${node.color}18`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                    }}>
                      {node.label}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {node.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>
                    {node.desc}
                  </p>

                  {node.href ? (
                    <a
                      href={node.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.8rem', fontWeight: 600,
                        color: node.color,
                        textDecoration: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      Ver proyecto ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: node.color, marginTop: '0.25rem' }}>
                      Estás aquí ·
                    </span>
                  )}
                </motion.div>
              </ScrollReveal>

              {/* Flecha entre nodos */}
              {i < nodes.length - 1 && (
                <div className="ecosystem-arrow">
                  <div style={{
                    width: '32px', height: '2px',
                    background: `linear-gradient(to right, var(--gold), var(--accent))`,
                    opacity: 0.5,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', right: '-6px', top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--accent)', fontSize: '0.7rem', opacity: 0.7,
                    }}>▶</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Próximamente */}
        <ScrollReveal delay={300}>
          <div style={{
            marginTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '2.5rem',
          }}>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{
                display: 'inline-block', width: '6px', height: '6px',
                borderRadius: '50%', background: 'var(--gold)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              Próximamente en el ecosistema
            </p>

            <div className="coming-grid">
              {coming.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .ecosystem-nodes {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 0;
          align-items: center;
          margin-bottom: 0;
        }
        .ecosystem-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.75rem;
        }
        .coming-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .ecosystem-nodes {
            grid-template-columns: 1fr;
          }
          .ecosystem-arrow {
            transform: rotate(90deg);
            padding: 0.5rem 0;
          }
          .coming-grid {
            grid-template-columns: 1fr;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
