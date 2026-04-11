import { Component, lazy, Suspense } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

// ── Error boundary — si Spline falla, muestra nada ──────
class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

// ── Placeholder visual mientras no hay escena ────────────
function SplinePlaceholder() {
  return (
    <div style={{
      width: '100%',
      height: '480px',
      borderRadius: '1rem',
      background: 'linear-gradient(135deg, rgba(74,124,148,0.08) 0%, rgba(201,162,39,0.04) 100%)',
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decoración geométrica como fallback */}
      <div style={{
        position: 'absolute',
        width: '300px', height: '300px',
        borderRadius: '50%',
        border: '1px solid rgba(74,124,148,0.15)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        position: 'absolute',
        width: '200px', height: '200px',
        borderRadius: '50%',
        border: '1px solid rgba(201,162,39,0.12)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div style={{
        width: '60px', height: '60px',
        borderRadius: '14px',
        background: 'rgba(74,124,148,0.12)',
        border: '1px solid rgba(74,124,148,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem',
        position: 'relative',
      }}>
        ⬡
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.06em', position: 'relative' }}>
        Studio Lamas — Desarrollo Digital
      </p>
    </div>
  )
}

// ── Componente principal ─────────────────────────────────
export default function SplineScene({ url }) {
  if (!url) return <SplinePlaceholder />

  return (
    <SplineErrorBoundary fallback={<SplinePlaceholder />}>
      <Suspense fallback={<SplinePlaceholder />}>
        <Spline
          scene={url}
          style={{ width: '100%', height: '480px', borderRadius: '1rem' }}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
