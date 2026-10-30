# Pyae & Mon Wedding Website

A responsive wedding invitation and RSVP website for Pyae and Mon. It includes an animated envelope introduction, event information, a gift registry QR code, an RSVP form, and a password-protected dashboard for viewing responses.

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example`. Set a strong dashboard password, a separate random session secret, and your Neon connection string (`DATABASE_URL`):

   ```env
   DASHBOARD_PASSWORD=your-long-random-password
   ADMIN_SESSION_SECRET=another-long-random-secret
   DATABASE_URL=your-neon-pooled-connection-string
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000).

## RSVP dashboard

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) and sign in with `DASHBOARD_PASSWORD`. Set `DATABASE_URL` (or `POSTGRES_URL`) and `DASHBOARD_PASSWORD` in Vercel's Production environment, then redeploy after changing them. Set `ADMIN_SESSION_SECRET` to a separate random secret to sign and validate dashboard sessions.

RSVP submissions are stored in the Neon Postgres database. The app creates the `rsvps` table on first use.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |

## Deployment notes

Set `DATABASE_URL`, `DASHBOARD_PASSWORD`, and `ADMIN_SESSION_SECRET` in the host's environment configuration. Use unique random secrets and serve the dashboard over HTTPS.
