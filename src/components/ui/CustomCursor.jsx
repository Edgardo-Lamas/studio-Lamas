import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING_DOT  = { damping: 50, stiffness: 500, mass: 0.2 }
const SPRING_RING = { damping: 26, stiffness: 200, mass: 0.8 }

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX  = useSpring(mx, SPRING_DOT)
  const dotY  = useSpring(my, SPRING_DOT)
  const ringX = useSpring(mx, SPRING_RING)
  const ringY = useSpring(my, SPRING_RING)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [role="button"], .card, [data-hover]')) {
        setHovered(true)
      }
    }

    const out = (e) => {
      if (e.target.closest('a, button, [role="button"], .card, [data-hover]')) {
        setHovered(false)
      }
    }

    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [visible])

  if (isTouch) return null

  return (
    <>
      {/* Ring exterior — sigue con retraso */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          translateX: '-50%',
          translateY: '-50%',
          x: ringX,
          y: ringY,
          borderRadius: '50%',
          border: '1.5px solid rgba(74,127,165,0.7)',
          boxShadow: hovered ? '0 0 12px rgba(74,127,165,0.3)' : 'none',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovered ? 46 : 30,
          height: hovered ? 46 : 30,
          borderColor: hovered ? 'rgba(201,168,76,0.85)' : 'rgba(74,127,165,0.7)',
        }}
        transition={{ opacity: { duration: 0.15 }, width: { duration: 0.18 }, height: { duration: 0.18 }, borderColor: { duration: 0.18 } }}
      />

      {/* Dot interior — sigue al instante */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
          x: dotX,
          y: dotY,
          borderRadius: '50%',
          background: hovered ? 'var(--gold)' : 'var(--accent)',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovered ? 5 : 5,
          height: hovered ? 5 : 5,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      />

      <style>{`
        @media (pointer: fine) {
          html, html * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
