// api/registro.js
// Vercel Function: registro de un nuevo alumno.
// - Calcula si es menor de 14 (LOPDGDD art. 7) a partir de la fecha de nacimiento.
// - Si lo es, la cuenta se crea INACTIVA hasta que el tutor confirme por email.
// - Si el alumno tiene 14+ años, la cuenta queda activa de inmediato
//   (puede consentir por sí mismo), pero seguimos guardando el email de un
//   adulto de contacto por buenas prácticas, sin bloquear el acceso.

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { nombreAlumno, fechaNacimiento, emailTutor, etapa, password } = req.body;

    if (!nombreAlumno || !fechaNacimiento || !emailTutor || !etapa || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    const edad = calcularEdad(fechaNacimiento);
    if (edad < 6 || edad > 20) {
      return res.status(400).json({ error: "La fecha de nacimiento no parece válida para esta app" });
    }

    const requiereConsentimiento = edad < 14;
    const passwordHash = await bcrypt.hash(password, 10);

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .insert({
        nombre_alumno: nombreAlumno,
        fecha_nacimiento: fechaNacimiento,
        email_tutor: emailTutor,
        etapa,
        password_hash: passwordHash,
        requiere_consentimiento_parental: requiereConsentimiento,
        // Si NO requiere consentimiento (14+), la cuenta queda operativa desde ya
        estado_consentimiento: requiereConsentimiento ? "pendiente" : "confirmado",
        fecha_confirmacion: requiereConsentimiento ? null : new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      // Email duplicado u otro error de base de datos
      console.error("Error al crear usuario:", error);
      return res.status(400).json({ error: "No se pudo crear la cuenta. ¿Ya existe con ese correo?" });
    }

    if (requiereConsentimiento) {
      await enviarEmailConsentimiento({
        emailTutor,
        nombreAlumno,
        token: usuario.token_confirmacion,
      });
    }

    return res.status(201).json({
      ok: true,
      requiereConsentimiento,
      mensaje: requiereConsentimiento
        ? "Cuenta creada. Hemos enviado un email al tutor/a para confirmar el permiso antes de poder usar la app."
        : "Cuenta creada y activa.",
    });
  } catch (err) {
    console.error("Error en /api/registro:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

function calcularEdad(fechaNacimientoISO) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimientoISO);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const noHaCumplidoAun =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoAun) edad--;
  return edad;
}

async function enviarEmailConsentimiento({ emailTutor, nombreAlumno, token }) {
  // Usamos Resend como proveedor de email transaccional (resend.com).
  // Necesitas una cuenta gratuita y la env var RESEND_API_KEY en Vercel.
  const enlaceConfirmacion = `${process.env.SITE_URL}/api/confirmar-consentimiento?token=${token}`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Tu Profe en Casa <onboarding@resend.dev>",
      to: emailTutor,
      subject: "Confirma el registro de tu hijo/a en Tu Profe en Casa",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Hola 👋</h2>
          <p><strong>${nombreAlumno}</strong> ha solicitado crear una cuenta en <strong>Tu Profe en Casa</strong>,
          una app educativa con tutor de IA alineado con el currículo oficial de Asturias.</p>
          <p>Como es menor de 14 años, necesitamos tu confirmación como padre, madre o tutor/a legal
          antes de activar la cuenta, según la normativa española de protección de datos (LOPDGDD).</p>
          <p style="margin: 2rem 0;">
            <a href="${enlaceConfirmacion}"
               style="background:#1a73e8; color:white; padding:0.9rem 1.6rem; border-radius:8px; text-decoration:none; font-weight:bold;">
              Confirmar y activar la cuenta
            </a>
          </p>
          <p style="font-size:0.85rem; color:#666;">
            Si no reconoces esta solicitud, ignora este correo y la cuenta no se activará.
            Puedes leer nuestra política de privacidad en loentiendes.com/legal/privacidad
          </p>
        </div>
      `,
    }),
  });
}
