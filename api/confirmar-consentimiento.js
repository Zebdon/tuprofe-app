// api/confirmar-consentimiento.js
// Vercel Function: se ejecuta cuando el padre/madre/tutor hace clic en el enlace
// del email de consentimiento. Activa la cuenta del menor.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-error.html?motivo=falta_token`);
  }

  try {
    const { data: usuario, error: errorBusqueda } = await supabase
      .from("usuarios")
      .select("*")
      .eq("token_confirmacion", token)
      .single();

    if (errorBusqueda || !usuario) {
      return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-error.html?motivo=token_invalido`);
    }

    if (usuario.estado_consentimiento === "confirmado") {
      // Ya estaba confirmado (el tutor pulsó el enlace dos veces): no es un error
      return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-ok.html?ya_estaba=true`);
    }

    if (new Date(usuario.token_expira_en) < new Date()) {
      return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-error.html?motivo=token_caducado`);
    }

    const { error: errorUpdate } = await supabase
      .from("usuarios")
      .update({
        estado_consentimiento: "confirmado",
        fecha_confirmacion: new Date().toISOString(),
      })
      .eq("id", usuario.id);

    if (errorUpdate) {
      console.error("Error al confirmar consentimiento:", errorUpdate);
      return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-error.html?motivo=error_servidor`);
    }

    return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-ok.html`);
  } catch (err) {
    console.error("Error en /api/confirmar-consentimiento:", err);
    return res.redirect(302, `${process.env.SITE_URL}/pages/consentimiento-error.html?motivo=error_servidor`);
  }
}
