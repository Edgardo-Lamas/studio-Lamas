import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoSVG from '../ui/LogoSVG'
import OrbsBackground from '../ui/OrbsBackground'

const base = import.meta.env.BASE_URL

// ── BlurText: reveal palabra a palabra con blur + translateY ────────────────
function BlurText({ text, delay = 80, style = {} }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.22em', ...style }}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            filter: inView ? 'blur(0px)' : 'blur(12px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(-20px)',
            transition: `filter 0.55s ease-out ${i * delay}ms, opacity 0.55s ease-out ${i * delay}ms, transform 0.55s ease-out ${i * delay}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

// ── TextRotator: rota entre palabras con AnimatePresence ────────────────────
const ROTATING_WORDS = ['estudios jurídicos', 'PyMEs', 'startups digitales']

function TextRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % ROTATING_WORDS.length), 3000)
    return () => clearInterval(t)
  }, [])

  // El minWidth reserva el ancho de la palabra más larga para que el renglón no
  // salte al rotar. En el celular 16ch supera el ancho de la pantalla (letra
  // grande), así que se topea contra el contenedor.
  return (
    <span style={{ display: 'inline-block', minWidth: 'min(16ch, 100%)', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--tagline) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Marquee de tech stack ───────────────────────────────────────────────────
const STACK = ['React', 'Vite', 'Supabase', 'PostgreSQL', 'IA / RAG', 'BIM', 'Framer Motion', 'Tailwind CSS', 'Vercel', 'Node.js']

function Marquee() {
  const items = [...STACK, ...STACK]
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '0.9rem 0',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 12%, transparent 88%, var(--bg-primary) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />
      <motion.div
        style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', paddingRight: '1.5rem' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {item}
            </span>
            <span style={{ color: 'var(--gold)', opacity: 0.4, fontSize: '0.45rem' }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Noise texture overlay ───────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 150px',
        opacity: 0.025,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '64px',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <OrbsBackground />
      <NoiseOverlay />

      {/* Grid sutil */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(74,127,165,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,127,165,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Diagonal light sweep */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-100%',
          left: '-100%',
          height: '300%',
          width: '200%',
          background: 'linear-gradient(115deg, transparent 30%, rgba(74,127,165,0.05) 40%, rgba(201,168,76,0.025) 50%, transparent 60%)',
          transform: 'rotate(-15deg)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        animate={{ left: ['-100%', '100%'] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 12, ease: 'easeInOut' }}
      />

      {/* Contenido principal */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          width: '100%',
        }}>

          {/* ── Columna izquierda ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
          >
            {/* Label */}
            <motion.p
              className="section-label"
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              style={{ marginBottom: '1.25rem' }}
            >
              Portafolio Digital
            </motion.p>

            {/* Headline con BlurText + TextRotator */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.1 } } }}
              style={{ marginBottom: '1.75rem' }}
            >
              <h1 style={{
                fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
              }}>
                <BlurText text="Sistemas web" delay={75} />
                <br />
                <BlurText text="para" delay={75} style={{ marginRight: '0.22em' }} />
                <TextRotator />
              </h1>
            </motion.div>

            {/* Bajada */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } } }}
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: '42ch',
                marginBottom: '2.5rem',
              }}
            >
              Construyo sistemas web, no solo páginas. Foco en{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                gestión, automatización e IA aplicada
              </strong>
              . De la idea al producto que se usa todos los días.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.7 } } }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
            >
              <motion.a href="#proyectos" className="btn btn-primary" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                Ver proyectos ↓
              </motion.a>
              <motion.a href="#contacto" className="btn btn-ghost" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                Hablemos de tu idea
              </motion.a>
            </motion.div>

            {/* Stack tags */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9 } } }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
            >
              {['React', 'Supabase', 'IA / RAG', 'PostgreSQL', 'BIM'].map((t, i) => (
                <motion.span
                  key={t}
                  className="tag"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.07, duration: 0.3 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Columna derecha: video ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.25)',
              boxShadow: '0 0 60px rgba(74,127,165,0.18), 0 0 120px rgba(201,168,76,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
              background: '#080d14',
              aspectRatio: '16/10',
            }}>
              <video
                src={`${base}img/projects/micro.mp4`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                autoPlay muted loop playsInline
              />

              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(8,13,20,0.35) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />

              {/* Logo badge */}
              <div style={{
                position: 'absolute', top: '1.25rem', left: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(8,13,20,0.72)',
                backdropFilter: 'blur(12px)',
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

              {/* Stats badge flotante */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                style={{
                  position: 'absolute', bottom: '1.25rem', right: '1.25rem',
                  background: 'rgba(8,13,20,0.78)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: '0.75rem',
                  padding: '0.65rem 1rem',
                  border: '1px solid rgba(74,127,165,0.28)',
                  display: 'flex', gap: '1.25rem',
                }}
              >
                {[['Full-Stack', 'React · IA'], ['100%', 'Entrega']].map(([val, lbl]) => (
                  <div key={lbl} style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1 }}>{val}</p>
                    <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: '0.15rem' }}>{lbl}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Línea dorada lateral */}
            <div style={{
              position: 'absolute',
              top: '10%', bottom: '10%', right: '-1.25rem',
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)',
              opacity: 0.4, borderRadius: '1px',
            }} />
          </motion.div>
        </div>
      </div>

      {/* Marquee inferior */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Marquee />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          scroll
        </span>
        <motion.div
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <style>{`
        /* minmax(0, 1fr) y no 1fr: un track "1fr" se niega a achicarse por
           debajo del contenido más ancho que tenga adentro, y entonces la
           columna se pasa del contenedor en vez de ajustarse. */
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
          }
          .hero-grid h1 {
            font-size: clamp(2rem, 9vw, 2.8rem) !important;
          }
        }
      `}</style>
    </section>
  )
}
