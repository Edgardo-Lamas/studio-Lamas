import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useScrollReveal(0.12)
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
