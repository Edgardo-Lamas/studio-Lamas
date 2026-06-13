import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const variants = {
  up:    { hidden: { opacity: 0, y: 32 },       visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -32 },      visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 },      visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },       visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 },              visible: { opacity: 1 } },
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const v = variants[direction] ?? variants.up

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      transition={{
        duration: 0.55,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
