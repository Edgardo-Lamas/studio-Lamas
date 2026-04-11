import { useEffect, useRef } from 'react'

// Orbes: fondo luminoso con parallax al mouse
// Paleta exacta del CLAUDE.md
const ORBS = [
  // Orbe principal — azul acero, arriba derecha
  {
    x: '72%', y: '-10%',
    size: 680,
    color: 'rgba(74, 127, 165, 0.22)',
    blur: 90,
    duration: 10,
    parallax: 0.025,
  },
  // Orbe dorado — centro derecha
  {
    x: '60%', y: '35%',
    size: 420,
    color: 'rgba(201, 168, 76, 0.16)',
    blur: 70,
    duration: 13,
    parallax: -0.018,
  },
  // Orbe verde-gris — abajo izquierda
  {
    x: '-8%', y: '55%',
    size: 480,
    color: 'rgba(107, 158, 158, 0.13)',
    blur: 80,
    duration: 9,
    parallax: 0.012,
  },
  // Orbe azul pequeño — arriba izquierda (sutil)
  {
    x: '15%', y: '-5%',
    size: 260,
    color: 'rgba(74, 127, 165, 0.12)',
    blur: 60,
    duration: 11,
    parallax: -0.022,
  },
]

export default function OrbsBackground() {
  const containerRef = useRef(null)
  const orbRefs = useRef([])
  const mouse = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouse.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      }
    }

    container.addEventListener('mousemove', onMouseMove)

    // Animar parallax con RAF para fluidez
    const animate = () => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return
        const { parallax } = ORBS[i]
        const tx = mouse.current.x * parallax
        const ty = mouse.current.y * parallax
        orb.style.transform = `translate(${tx}px, ${ty}px)`
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={el => orbRefs.current[i] = el}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 40% 40%, ${orb.color}, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            willChange: 'transform',
            animation: `orbFloat ${orb.duration}s ease-in-out infinite alternate`,
            animationDelay: `${i * -2.5}s`,
            transition: 'transform 0.15s ease-out',
          }}
        />
      ))}

      <style>{`
        @keyframes orbFloat {
          from { margin-top: 0px; }
          to   { margin-top: 28px; }
        }
      `}</style>
    </div>
  )
}
