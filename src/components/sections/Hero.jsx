import { useEffect, useState } from 'react'
import LogoSVG from '../ui/LogoSVG'
import { projects } from '../../data/projects'

const keywords = ['sistemas web', 'estudios jurídicos', 'IA aplicada']

function MiniCard({ project, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid #e5e7eb',
      borderRadius: '0.875rem',
      padding: '1.1rem 1.25rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      animation: visible ? 'float 4s ease-in-out infinite' : 'none',
      animationDelay: `${delay * 0.5}ms`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: project.category === 'legaltech' ? 'var(--accent)' :
                      project.category === 'ingenieria' ? 'var(--gold)' :
                      project.category === 'gestion' ? '#10b981' : '#8b5cf6',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {project.categoryLabel}
        </span>
      </div>
      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
        {project.name}
      </p>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
        {project.subtitle}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.6rem' }}>
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="tag" style={{ fontSize: '0.6rem', padding: '0.1rem 0.45rem' }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false)
  const [kwActive, setKwActive] = useState(-1)

  useEffect(() => {
    const t = setTimeout(() => setTextVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!textVisible) return
    let i = 0
    const interval = setInterval(() => {
      setKwActive(i)
      i++
      if (i >= keywords.length) clearInterval(interval)
    }, 600)
    return () => clearInterval(interval)
  }, [textVisible])

  const fadeIn = (delay) => ({
    opacity: textVisible ? 1 : 0,
    transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  const featuredProjects = projects.slice(0, 4)

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '64px',
        background: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
        <div className="hero-grid">
          {/* Col izquierda — texto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Logo + nombre */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', ...fadeIn(0) }}>
              <LogoSVG size={36} />
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.1rem' }}>
                  Studio Lamas
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  Desarrollo Digital
                </p>
              </div>
            </div>

            {/* Título principal */}
            <div style={fadeIn(150)}>
              <h1 style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}>
                Sistemas web<br />
                para{' '}
                <span style={{ color: 'var(--accent)' }}>estudios jurídicos</span>
                <br />y PyMEs
              </h1>
            </div>

            {/* Bajada */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', ...fadeIn(300) }}>
              {[
                { text: 'Construyo ', bold: 'sistemas web', rest: ', no solo páginas.' },
                { text: 'Foco en ', bold: 'gestión, automatización e IA aplicada', rest: '.' },
                { text: 'De la idea al producto que ', bold: 'se usa todos los días', rest: '.' },
              ].map(({ text, bold, rest }, i) => (
                <p key={i} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {text}
                  <span
                    className={`animated-underline ${kwActive >= i ? 'active' : ''}`}
                    style={{ fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {bold}
                  </span>
                  {rest}
                </p>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fadeIn(500) }}>
              <a href="#proyectos" className="btn btn-primary">Ver proyectos ↓</a>
              <a href="#contacto" className="btn btn-ghost">Hablemos de tu idea</a>
            </div>

            {/* Stack mini */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', ...fadeIn(650) }}>
              {['React', 'Supabase', 'IA / RAG', 'PostgreSQL', 'BIM'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Col derecha — mini cards de proyectos */}
          <div className="hero-cards">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.875rem',
              alignContent: 'start',
            }}>
              {featuredProjects.map((p, i) => (
                <MiniCard key={p.id} project={p} delay={800 + i * 180} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 55% 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-cards { display: block; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-cards {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
