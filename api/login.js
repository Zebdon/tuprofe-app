// api/login.js
// Vercel Function: inicio de sesión del alumno.
// Devuelve el estado de consentimiento para que el frontend pueda mostrar
// el aviso correspondiente si la cuenta de un menor aún no está activada.

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan credenciales" });
    }

    // El login se hace con el email del tutor (email_tutor), que es el que
    // identifica la cuenta — coherente con cómo se registra en api/registro.js.
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, nombre_alumno, etapa, password_hash, estado_consentimiento, requiere_consentimiento_parental")
      .eq("email_tutor", email)
      .single();

    if (error || !usuario) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    if (usuario.estado_consentimiento === "revocado") {
      return res.status(403).json({ error: "Esta cuenta fue desactivada por el tutor/a responsable" });
    }

    return res.status(200).json({
      ok: true,
      usuario: {
        id: usuario.id,
        nombreAlumno: usuario.nombre_alumno,
        etapa: usuario.etapa,
        estadoConsentimiento: usuario.estado_consentimiento,
        requiereConsentimientoParental: usuario.requiere_consentimiento_parental,
      },
    });
  } catch (err) {
    console.error("Error en /api/login:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
