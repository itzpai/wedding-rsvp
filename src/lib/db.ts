import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dataDir = path.join(process.cwd(), 'data');
fs.mkdirSync(dataDir, { recursive: true });
let db: DatabaseSync | undefined;
export function getDb() {
  if (!db) {
    db = new DatabaseSync(path.join(dataDir, 'wedding.sqlite'));
    db.exec(`CREATE TABLE IF NOT EXISTS rsvps (id INTEGER PRIMARY KEY AUTOINCREMENT, full_name TEXT NOT NULL, attendance TEXT NOT NULL, guest_count INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
  }
  return db;
}
