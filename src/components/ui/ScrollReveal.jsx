import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollReveal({ children, delay = 0, className = '', y = 28 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}
