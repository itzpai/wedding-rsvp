import { getDb } from '@/lib/db';

type Row = { id: number; full_name: string; attendance: string; guest_count: number; created_at: string };
export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const rows = getDb().prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all() as Row[];
  const attending = rows.filter(row => row.attendance === 'Joyfully accepts');
  const people = attending.reduce((sum, row) => sum + row.guest_count, 0);
  return <main className="mx-auto max-w-[1000px] px-6 py-10 pb-20">
    <a className="border-b border-[#aaa18e] py-1.5 text-[10px] uppercase tracking-widest transition hover:text-olive" href="/">← Wedding site</a>
    <p className="mt-7 text-[10px] uppercase tracking-[.19em] text-muted">P &amp; M · Private</p>
    <h1 className="my-6 font-serif text-5xl sm:text-7xl">RSVPs</h1>
    <div className="grid gap-3 sm:grid-cols-3">{[[attending.length,'acceptances'],[people,'attending guests'],[rows.length-attending.length,'declines']].map(([number,label])=><article className="bg-paper-deep p-5 sm:p-6" key={label}><strong className="block font-serif text-4xl sm:text-5xl">{number}</strong><span className="text-[13px] text-muted">{label}</span></article>)}</div>
    <section className="mt-6 bg-paper-deep p-5 sm:p-6"><h2 className="mb-3 font-serif text-2xl">Responses</h2>{rows.length===0?<p>No responses yet.</p>:rows.map(row=><article className="grid grid-cols-2 items-center gap-3 border-t border-ink/15 py-4 text-sm sm:grid-cols-[1.2fr_1.4fr_.8fr_.8fr]" key={row.id}><strong>{row.full_name}</strong><span className="text-muted">{row.attendance}</span><span className="text-muted">{row.attendance==='Joyfully accepts'?`${row.guest_count} guest${row.guest_count===1?'':'s'}`:'—'}</span><time className="text-muted">{new Date(`${row.created_at}Z`).toLocaleDateString()}</time></article>)}</section>
  </main>;
}
