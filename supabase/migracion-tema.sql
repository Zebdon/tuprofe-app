-- migracion-tema.sql
-- Ejecutar en el SQL Editor de Supabase (una sola vez).
-- Añade el tema exacto trabajado en cada conversación, para poder medir
-- progreso por tema (no solo por materia) en el panel de la familia.

alter table conversaciones add column if not exists tema text;

create index if not exists idx_conversaciones_tema on conversaciones (usuario_id, materia, tema);
