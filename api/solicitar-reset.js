// api/solicitar-reset.js
// Vercel Function: el usuario pide "he olvidado mi contraseña".
// Genera un token temporal y envía un email con el enlace para cambiarla.
// Por seguridad, SIEMPRE responde con éxito exista o no ese email en la
// base de datos — así no revelamos qué correos están registrados.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Falta el correo electrónico" });
    }

    const { data: usuario } = await supabase
      .from("usuarios")
      .select("id, nombre_alumno, email_tutor")
      .eq("email_tutor", email)
      .single();

    // Si existe, generamos token y enviamos email. Si no existe, no hacemos
    // nada pero respondemos igual "ok" — evita que alguien pueda comprobar
    // qué correos están registrados probando uno a uno.
    if (usuario) {
      const token = crypto.randomUUID();
      const expira = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hora

      await supabase
        .from("usuarios")
        .update({ token_reset: token, token_reset_expira: expira })
        .eq("id", usuario.id);

      await enviarEmailReset({ email, nombreAlumno: usuario.nombre_alumno, token });
    }

    return res.status(200).json({
      ok: true,
      mensaje: "Si ese correo está registrado, te hemos enviado un enlace para restablecer la contraseña.",
    });
  } catch (err) {
    console.error("Error en /api/solicitar-reset:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function enviarEmailReset({ email, nombreAlumno, token }) {
  const enlace = `${process.env.SITE_URL}/restablecer-password?token=${token}`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Tu Profe en Casa <onboarding@resend.dev>",
      to: email,
      subject: "Restablece tu contraseña — Tu Profe en Casa",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Hola 👋</h2>
          <p>Hemos recibido una solicitud para restablecer la contraseña de la cuenta de
          <strong>${nombreAlumno}</strong> en Tu Profe en Casa.</p>
          <p style="margin: 2rem 0;">
            <a href="${enlace}"
               style="background:#1a73e8; color:white; padding:0.9rem 1.6rem; border-radius:8px; text-decoration:none; font-weight:bold;">
              Elegir nueva contraseña
            </a>
          </p>
          <p style="font-size:0.85rem; color:#666;">
            Este enlace caduca en 1 hora. Si no has solicitado esto, ignora este correo —
            tu contraseña actual seguirá funcionando con normalidad.
          </p>
        </div>
      `,
    }),
  });
}