import { useEffect, useRef } from 'react'

// ── Dibuja un engranaje con perspectiva 3D ───────────────
function drawGear(ctx, x, y, outerR, innerR, teeth, angle, depth, color, highlight) {
  const toothAngle = (Math.PI * 2) / teeth
  const half = toothAngle * 0.35

  // Sombra lateral (efecto 3D)
  ctx.save()
  ctx.translate(x + depth, y + depth)
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = i * toothAngle + angle
    ctx.lineTo(Math.cos(a - half) * outerR, Math.sin(a - half) * outerR)
    ctx.lineTo(Math.cos(a + half) * outerR, Math.sin(a + half) * outerR)
    ctx.lineTo(Math.cos(a + toothAngle - half) * innerR, Math.sin(a + toothAngle - half) * innerR)
    ctx.lineTo(Math.cos(a + toothAngle + half - toothAngle) * innerR, Math.sin(a + toothAngle + half - toothAngle) * innerR)
  }
  ctx.closePath()
  ctx.fillStyle = 'rgba(0,0,0,0.35)'
  ctx.fill()
  ctx.restore()

  // Cuerpo principal del engranaje
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = i * toothAngle + angle
    ctx.lineTo(Math.cos(a - half) * outerR, Math.sin(a - half) * outerR)
    ctx.lineTo(Math.cos(a + half) * outerR, Math.sin(a + half) * outerR)
    ctx.lineTo(Math.cos(a + toothAngle - half) * innerR, Math.sin(a + toothAngle - half) * innerR)
    ctx.lineTo(Math.cos(a + toothAngle + half - toothAngle) * innerR, Math.sin(a + toothAngle + half - toothAngle) * innerR)
  }
  ctx.closePath()

  // Gradiente radial para efecto metálico
  const grad = ctx.createRadialGradient(outerR * 0.2, -outerR * 0.2, outerR * 0.05, 0, 0, outerR)
  grad.addColorStop(0, highlight)
  grad.addColorStop(0.5, color)
  grad.addColorStop(1, 'rgba(0,0,0,0.5)')
  ctx.fillStyle = grad
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Círculo interior (hub)
  const hubR = outerR * 0.22
  ctx.beginPath()
  ctx.arc(0, 0, hubR, 0, Math.PI * 2)
  const hubGrad = ctx.createRadialGradient(-hubR * 0.3, -hubR * 0.3, 1, 0, 0, hubR)
  hubGrad.addColorStop(0, highlight)
  hubGrad.addColorStop(1, 'rgba(0,0,0,0.6)')
  ctx.fillStyle = hubGrad
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 0.8
  ctx.stroke()

  // Agujero central
  ctx.beginPath()
  ctx.arc(0, 0, hubR * 0.38, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(0,0,0,0.7)'
  ctx.fill()

  ctx.restore()
}

// ── Dibuja marcadores tipo reloj ─────────────────────────
function drawClockMarkers(ctx, x, y, r, angle) {
  ctx.save()
  ctx.translate(x, y)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + angle
    const isMajor = i % 3 === 0
    const r1 = r * (isMajor ? 0.82 : 0.86)
    const r2 = r * 0.94
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1)
    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2)
    ctx.strokeStyle = isMajor ? 'rgba(201,162,39,0.6)' : 'rgba(201,162,39,0.25)'
    ctx.lineWidth = isMajor ? 2 : 1
    ctx.stroke()
  }
  ctx.restore()
}

// ── Partículas flotantes ─────────────────────────────────
function createParticles(count, w, h) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
  }))
}

export default function GearsCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const W = canvas.width
    const H = canvas.height

    // Engranajes: { x, y, outerR, innerR, teeth, speed, color, highlight, depth }
    const gears = [
      // Grande central
      { x: W * 0.58, y: H * 0.48, outerR: 110, innerR: 82, teeth: 22, speed: 0.003,
        color: 'rgba(74,124,148,0.75)', highlight: 'rgba(106,156,180,0.9)', depth: 8, angle: 0 },
      // Mediano superior derecha
      { x: W * 0.82, y: H * 0.22, outerR: 64, innerR: 48, teeth: 13, speed: -0.0052,
        color: 'rgba(201,162,39,0.7)', highlight: 'rgba(220,185,80,0.9)', depth: 6, angle: 0.3 },
      // Mediano inferior izquierda
      { x: W * 0.34, y: H * 0.76, outerR: 72, innerR: 54, teeth: 15, speed: -0.0046,
        color: 'rgba(201,162,39,0.65)', highlight: 'rgba(220,185,80,0.85)', depth: 6, angle: 1.1 },
      // Pequeño superior izquierda
      { x: W * 0.28, y: H * 0.25, outerR: 42, innerR: 32, teeth: 9, speed: 0.009,
        color: 'rgba(74,124,148,0.6)', highlight: 'rgba(106,156,180,0.8)', depth: 4, angle: 0.7 },
      // Pequeño inferior derecha
      { x: W * 0.86, y: H * 0.78, outerR: 38, innerR: 28, teeth: 8, speed: 0.01,
        color: 'rgba(74,124,148,0.55)', highlight: 'rgba(106,156,180,0.75)', depth: 4, angle: 1.9 },
    ]

    const particles = createParticles(40, W, H)

    let frame = 0

    function render() {
      // Fondo
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(15,23,42,0)'
      ctx.fillRect(0, 0, W, H)

      // Partículas
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74,124,148,${p.alpha})`
        ctx.fill()
      })

      // Líneas de conexión entre engranajes (sutiles)
      ctx.save()
      gears.forEach((g, i) => {
        gears.forEach((g2, j) => {
          if (j <= i) return
          const dist = Math.hypot(g2.x - g.x, g2.y - g.y)
          if (dist < 250) {
            ctx.beginPath()
            ctx.moveTo(g.x, g.y)
            ctx.lineTo(g2.x, g2.y)
            const alpha = (1 - dist / 250) * 0.08
            ctx.strokeStyle = `rgba(74,124,148,${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })
      ctx.restore()

      // Marcadores reloj en engranajes grandes
      drawClockMarkers(ctx, gears[0].x, gears[0].y, gears[0].outerR * 0.95, gears[0].angle)
      drawClockMarkers(ctx, gears[1].x, gears[1].y, gears[1].outerR * 0.95, gears[1].angle)

      // Engranajes (de atrás para adelante)
      ;[...gears].reverse().forEach(g => {
        drawGear(ctx, g.x, g.y, g.outerR, g.innerR, g.teeth, g.angle, g.depth, g.color, g.highlight)
        g.angle += g.speed
      })

      frame++
      rafRef.current = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '480px',
      borderRadius: '1rem',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
      background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(8,15,30,0.8) 100%)',
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        width={520}
        height={480}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '1rem',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,15,30,0.6) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
