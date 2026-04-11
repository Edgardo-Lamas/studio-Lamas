import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LogoSVG from '../ui/LogoSVG'
import OrbsBackground from '../ui/OrbsBackground'
// LogoSVG se usa solo en el overlay del video

const base = import.meta.env.BASE_URL

// ── Variantes de animación ──────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] } },
}

// ── Keyword con underline animado ───────────────────────
function Keyword({ children, delay = 0, color = 'var(--accent)' }) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 1400 + delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{children}</span>
      <motion.span
        style={{
          position: 'absolute',
          left: 0, bottom: -2,
          height: '2px',
          background: color,
          display: 'block',
        }}
        initial={{ width: 0 }}
        animate={{ width: active ? '100%' : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '64px',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <OrbsBackground />

      {/* Grid sutil de fondo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(74,127,165,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,127,165,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Contenido — dos columnas */}
      <div className="hero-grid" style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── Columna izquierda: texto ── */}
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Logo + nombre */}
          {/* Título */}
          <motion.div variants={item} style={{ marginBottom: '1.75rem' }}>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}>
              Sistemas web<br />
              para{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--tagline) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                estudios jurídicos
              </span>
              <br />y PyMEs
            </h1>
          </motion.div>

          {/* Bajada */}
          <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Construyo <Keyword delay={0} color="var(--accent)">sistemas web</Keyword>, no solo páginas.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Foco en <Keyword delay={180} color="var(--accent)">gestión, automatización e IA aplicada</Keyword>.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              De la idea al producto que <Keyword delay={360} color="var(--gold)">se usa todos los días</Keyword>.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <motion.a
              href="#proyectos"
              className="btn btn-primary"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver proyectos ↓
            </motion.a>
            <motion.a
              href="#contacto"
              className="btn btn-ghost"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Hablemos de tu idea
            </motion.a>
          </motion.div>

          {/* Stack tags */}
          <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['React', 'Supabase', 'IA / RAG', 'PostgreSQL', 'BIM'].map((t, i) => (
              <motion.span
                key={t}
                className="tag"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.07, duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Columna derecha: video + logo ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ position: 'relative' }}
        >
          {/* Marco con glow */}
          <div style={{
            position: 'relative',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 0 60px rgba(74,127,165,0.15), 0 0 120px rgba(201,168,76,0.08)',
            background: '#080d14',
            aspectRatio: '16/10',
          }}>
            <video
              src={`${base}img/projects/micro.mp4`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Overlay oscuro sutil */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(8,13,20,0.35) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />

            {/* Logo Studio Lamas superpuesto */}
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(8,13,20,0.65)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.625rem',
              padding: '0.5rem 0.85rem',
              border: '1px solid rgba(201,168,76,0.3)',
            }}>
              <LogoSVG size={22} />
              <div>
                <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.2 }}>
                  Studio Lamas
                </p>
                <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
                  Desarrollo Digital
                </p>
              </div>
            </div>
          </div>

          {/* Decoración — línea dorada lateral */}
          <div style={{
            position: 'absolute',
            top: '10%', bottom: '10%',
            right: '-1.25rem',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
            opacity: 0.4,
            borderRadius: '1px',
          }} />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <motion.div
          style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
          }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-grid h1 {
            font-size: clamp(1.9rem, 8vw, 2.6rem) !important;
          }
        }
      `}</style>
    </section>
  )
}
