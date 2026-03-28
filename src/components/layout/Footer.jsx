import LogoSVG from '../ui/LogoSVG'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--nav-bg)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '2.5rem 1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
      }}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <LogoSVG size={22} />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Studio Lamas</span>
        </a>
        <p style={{ color: 'var(--signature)', fontSize: '0.8rem' }}>
          © 2026 Edgardo Lamas · La Plata, Argentina
        </p>
        <p style={{ color: '#4a5568', fontSize: '0.75rem' }}>
          Desarrollo Digital · Sistemas a medida · LegalTech · IA aplicada
        </p>
      </div>
    </footer>
  )
}
