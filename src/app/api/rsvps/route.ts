import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fullName = typeof data.fullName === 'string' ? data.fullName.trim().slice(0, 120) : '';
    const attendance = data.attendance;
    const guestCount = Number(data.guestCount);
    if (!fullName || !['Joyfully accepts', 'Regretfully declines'].includes(attendance) || !Number.isInteger(guestCount) || guestCount < 0 || guestCount > 20 || (attendance === 'Joyfully accepts' && guestCount < 1)) {
      return NextResponse.json({ error: 'Check your RSVP details.' }, { status: 400 });
    }
    getDb().prepare('INSERT INTO rsvps (full_name, attendance, guest_count) VALUES (?, ?, ?)').run(fullName, attendance, attendance === 'Joyfully accepts' ? guestCount : 0);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Could not save RSVP.' }, { status: 500 }); }
}
