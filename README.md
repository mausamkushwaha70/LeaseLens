# LeaseLens

Every Lease. Clearly Understood.

LeaseLens is a commercial lease intelligence frontend for reviewing commercial lease portfolios. This phase is a clickable product preview powered by illustrative mock data. Authentication, document storage, REST API integration, and AI analysis are not connected yet.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

Open http://localhost:3000. Explore the dashboard at `/dashboard`, the searchable sample lease library at `/leases`, and the other workspace views from the sidebar. The upload screen accepts a local PDF selection for preview only; it does not send or store the file.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, Lucide, Recharts, React Hook Form, Zod, Axios, and Sonner.

## Structure

- `src/app`: App Router pages and route groups (overview, leases, upload, analysis, deadlines, reports, settings, and help)
- `src/components`: shared layout and feature components
- `src/lib`: app constants and API configuration
- `src/mock`: illustrative sample data clearly separated from real API output

Set `NEXT_PUBLIC_API_URL` to the REST API base URL when a backend is available.
