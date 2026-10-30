import { createHmac, timingSafeEqual } from 'node:crypto';

export const adminCookieName = 'wedding_admin';

export function validAdminToken(token?: string) {
  const password = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET || password;
  if (!token || !password || !secret) return false;
  const expected = createHmac('sha256', secret).update(password).digest('hex');
  const expectedBytes = Buffer.from(expected);
  const tokenBytes = Buffer.from(token);
  return expectedBytes.length === tokenBytes.length && timingSafeEqual(expectedBytes, tokenBytes);
}

export function makeAdminToken() {
  const password = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET || password;
  if (!password || !secret) throw new Error('Dashboard authentication is not configured.');
  return createHmac('sha256', secret).update(password).digest('hex');
}
