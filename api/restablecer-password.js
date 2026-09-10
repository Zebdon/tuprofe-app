// api/restablecer-password.js
// Vercel Function: recibe el token del email + la nueva contraseña, y la
// actualiza si el token es válido y no ha caducado.

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { aplicarCors } from "./_cors.js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (aplicarCors(req, res)) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, token_reset_expira")
      .eq("token_reset", token)
      .single();

    if (error || !usuario) {
      return res.status(400).json({ error: "Este enlace no es válido o ya se usó" });
    }

    if (new Date(usuario.token_reset_expira) < new Date()) {
      return res.status(400).json({ error: "Este enlace ha caducado. Solicita uno nuevo." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { error: errorUpdate } = await supabase
      .from("usuarios")
      .update({
        password_hash: passwordHash,
        token_reset: null,
        token_reset_expira: null,
      })
      .eq("id", usuario.id);

    if (errorUpdate) {
      console.error("Error al actualizar contraseña:", errorUpdate);
      return res.status(500).json({ error: "No se pudo actualizar la contraseña" });
    }

    return res.status(200).json({ ok: true, mensaje: "Contraseña actualizada correctamente." });
  } catch (err) {
    console.error("Error en /api/restablecer-password:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}