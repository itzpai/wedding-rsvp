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

2. Create `.env.local` from `.env.example` and set a strong dashboard password:

   ```env
   DASHBOARD_PASSWORD=your-long-random-password
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000).

## RSVP dashboard

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard). Sign in with the password from `DASHBOARD_PASSWORD`; the username field accepts any value.

RSVP submissions are stored in `data/wedding.sqlite`. Keep this file backed up if you need to retain responses.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |

## Deployment notes

Deploy to a Node.js host with a persistent writable disk so the SQLite database remains available. Serverless platforms generally need a managed database instead. Set `DASHBOARD_PASSWORD` in the host's environment configuration, use a unique password, and serve the dashboard over HTTPS.
