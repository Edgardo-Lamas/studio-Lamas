import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { projects, categories } from '../../data/projects'

const base = import.meta.env.BASE_URL
const url = (path) => path ? `${base}${path}` : null

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(10,14,26,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1e293b',
          borderRadius: '1.25rem',
          padding: '2.5rem',
          maxWidth: '760px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.3s ease',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            {project.badge && (
              <span style={{
                display: 'inline-block',
                background: 'var(--gold)',
                color: '#1a1a1a',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                marginBottom: '0.5rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                ★ {project.badge}
              </span>
            )}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {project.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '1.4rem',
              lineHeight: 1, padding: '0.25rem', marginLeft: '1rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            ✕
          </button>
        </div>

        {/* Video o imagen en el modal */}
        {(project.video || project.image) && (
          <div style={{
            borderRadius: '0.75rem',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            background: '#0d1117',
          }}>
            {project.video ? (
              <video
                src={url(project.video)}
                style={{ width: '100%', display: 'block', maxHeight: '420px', objectFit: 'contain', background: '#000' }}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={url(project.image)}
                alt={project.name}
                loading="lazy"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
              />
            )}
          </div>
        )}

        {/* Descripción */}
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>→</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.href ? (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              ↗ Ir al sitio
            </a>
          ) : (
            <a href="#contacto" className="btn btn-primary" onClick={onClose}>
              Consultá por este proyecto
            </a>
          )}
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  )
}

function ProjectCard({ project, onClick, index }) {
  const cardRef = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sX = useSpring(rotX, { stiffness: 300, damping: 30, mass: 0.5 })
  const sY = useSpring(rotY, { stiffness: 300, damping: 30, mass: 0.5 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotX.set(-((e.clientY - cy) / (rect.height / 2)) * 7)
    rotY.set(((e.clientX - cx) / (rect.width / 2)) * 7)
  }

  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <ScrollReveal delay={index * 100}>
      <motion.article
        ref={cardRef}
        className="card card-gold"
        data-hover
        style={{
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transformPerspective: 800,
          rotateX: sX,
          rotateY: sY,
        }}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -6, scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } },
        }}
        onClick={() => onClick(project)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Preview */}
        <div style={{
          borderRadius: '0.625rem',
          overflow: 'hidden',
          marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, #1a2744 0%, #0f1f3a 100%)',
          height: '160px',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          {project.image && (
            <img
              src={url(project.image)}
              alt={project.name}
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
          {project.video && (
            <video
              src={url(project.video)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 1 }}
              muted loop playsInline
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.play() }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0; e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
            />
          )}

          {project.badge && (
            <span style={{
              position: 'absolute', top: '0.6rem', right: '0.6rem',
              background: 'var(--gold)', color: '#1a1a1a',
              fontSize: '0.6rem', fontWeight: 700,
              padding: '0.2rem 0.5rem', borderRadius: '9999px',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              zIndex: 3,
            }}>
              ★ {project.badge}
            </span>
          )}

          {/* Hover reveal overlay — variant propagated from whileHover on article */}
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1, transition: { duration: 0.22 } },
            }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(8,13,20,0.92) 0%, rgba(8,13,20,0.4) 60%, transparent 100%)',
              display: 'flex', alignItems: 'flex-end',
              padding: '0.85rem',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <motion.span
              variants={{
                rest: { y: 8, opacity: 0 },
                hover: { y: 0, opacity: 1, transition: { duration: 0.22, delay: 0.05 } },
              }}
              style={{
                fontSize: '0.8rem', fontWeight: 600,
                color: '#fff', letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              Ver proyecto
            </motion.span>
          </motion.div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 600, color: 'var(--accent)',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem',
          }}>
            {project.categoryLabel}
          </span>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: 1.25 }}>
            {project.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            {project.subtitle}
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', flex: 1 }}>
            {project.bullets.slice(0, 3).map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem' }}>·</span>
                {b}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="tag" style={{ fontSize: '0.62rem', padding: '0.15rem 0.45rem' }}>{tag}</span>
              ))}
            </div>
            <motion.span
              variants={{
                rest: { x: 0 },
                hover: { x: 3, transition: { duration: 0.18 } },
              }}
              style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}
            >
              Ver más →
            </motion.span>
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="proyectos" style={{ background: 'var(--bg-primary)', padding: '5rem 0' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <ScrollReveal>
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Proyectos destacados</h2>
          <p className="section-subtitle">
            Sistemas construidos para industrias específicas. Cada uno resuelve un problema concreto.
          </p>
        </ScrollReveal>

        {/* Filtros */}
        <ScrollReveal delay={100}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '9999px',
                  border: `1.5px solid ${activeCategory === cat.id ? 'var(--accent)' : '#d1d5db'}`,
                  background: activeCategory === cat.id ? 'var(--accent)' : 'transparent',
                  color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.borderColor = '#d1d5db'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              index={i}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
