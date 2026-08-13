-- supabase/schema-consentimiento.sql
-- Esquema para gestionar registro con verificación de edad y consentimiento parental
-- Ejecutar en el SQL Editor de Supabase

create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  nombre_alumno text not null,
  fecha_nacimiento date not null,
  email_tutor text not null,          -- SIEMPRE el email del adulto responsable de la cuenta
  etapa text not null,                 -- 'primaria' | 'eso' | 'bachillerato'
  password_hash text not null,

  -- Campo clave: se calcula en el backend a partir de fecha_nacimiento
  requiere_consentimiento_parental boolean not null default true,

  -- Estado del consentimiento: la cuenta NO es utilizable hasta que esto sea 'confirmado'
  estado_consentimiento text not null default 'pendiente'
    check (estado_consentimiento in ('pendiente', 'confirmado', 'revocado')),

  token_confirmacion uuid default gen_random_uuid(),
  token_expira_en timestamptz default (now() + interval '7 days'),

  fecha_confirmacion timestamptz,
  fecha_revocacion timestamptz,

  created_at timestamptz default now()
);

-- Índice para buscar rápido por token al confirmar el enlace del email
create index if not exists idx_usuarios_token on usuarios (token_confirmacion);

-- Índice para comprobar rápido si una cuenta puede usarse
create index if not exists idx_usuarios_estado on usuarios (estado_consentimiento);

-- Historial de conversaciones con la Profe IA (para poder purgar / exportar por RGPD)
create table if not exists conversaciones (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references usuarios(id) on delete cascade,
  etapa text not null,
  curso text not null,
  materia text not null,
  mensaje_alumno text not null,
  respuesta_profe text not null,
  created_at timestamptz default now()
);

create index if not exists idx_conversaciones_usuario on conversaciones (usuario_id);

-- RLS (Row Level Security) básico: activar y ajustar políticas según tu modelo de auth real
alter table usuarios enable row level security;
alter table conversaciones enable row level security;
