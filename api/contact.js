// Lo que escribe un desconocido termina dentro del HTML del mail. Sin escapar,
// puede meter etiquetas y falsear cómo se ve el mensaje que recibís.
const escapar = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Faltan campos requeridos' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'lamasedgardo2024@gmail.com',
        // Sin esto, "Responder" le contesta a Resend en vez de al cliente y hay
        // que copiar la dirección a mano desde el cuerpo del mensaje.
        reply_to: email,
        subject: `Nuevo contacto de ${name} — Studio Lamas`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c9a84c;">Nuevo mensaje desde Studio Lamas</h2>
            <p><strong>Nombre:</strong> ${escapar(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapar(email)}">${escapar(email)}</a></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 1rem 0;" />
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${escapar(message)}</p>
          </div>
        `,
      }),
    })

    if (response.ok) {
      return res.status(200).json({ ok: true })
    } else {
      const error = await response.json()
      console.error('Resend error:', error)
      return res.status(400).json({ ok: false, error })
    }
  } catch (err) {
    console.error('Handler error:', err)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
