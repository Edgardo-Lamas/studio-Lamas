import { useState, useEffect } from 'react'
import LogoSVG from '../ui/LogoSVG'

const links = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Sobre mí', href: '#sobre-mi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(8,15,30,0.95)'
          : 'var(--nav-bg)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.3s, box-shadow 0.3s',
        boxShadow: scrolled ? '0 2px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
          }}
          className="logo-link"
        >
          <span style={{ transition: 'transform 0.3s, filter 0.3s' }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'rotate(6deg) scale(1.08)'
              e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(201,162,39,0.5))'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.filter = 'none'
            }}
          >
            <LogoSVG size={28} />
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em' }}>
              Studio Lamas
            </span>
            <span style={{ color: 'var(--tagline)', fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.08em' }}>
              DESARROLLO DIGITAL
            </span>
          </span>
        </a>

        {/* Links desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          className="nav-desktop">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setActive(href)}
              style={{
                color: active === href ? 'var(--text-nav-active)' : 'var(--text-nav)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '0.4rem 0.75rem',
                borderRadius: '0.375rem',
                transition: 'color 0.2s, background 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.background = 'var(--nav-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = active === href ? '#fff' : 'var(--text-nav)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {label}
            </a>
          ))}
          <a href="#contacto" className="btn btn-gold" style={{ marginLeft: '0.75rem', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
            Hablemos →
          </a>
        </nav>

        {/* Hamburguesa mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '1.5rem',
            padding: '0.25rem',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menú mobile */}
      {menuOpen && (
        <div style={{
          background: 'var(--nav-bg)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => { setMenuOpen(false); setActive(href) }}
              style={{
                color: 'var(--text-nav)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </a>
          ))}
          <a href="#contacto" className="btn btn-gold" style={{ marginTop: '0.75rem', textAlign: 'center', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}>
            Hablemos →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  )
}
