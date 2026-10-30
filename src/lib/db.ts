import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

export function getDb() {
  if (!databaseUrl) throw new Error('Set DATABASE_URL or POSTGRES_URL to connect to Neon.');
  return neon(databaseUrl);
}

export async function ensureRsvpsTable() {
  const sql = getDb();
  await sql`CREATE TABLE IF NOT EXISTS rsvps (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    attendance TEXT NOT NULL,
    guest_count INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}
