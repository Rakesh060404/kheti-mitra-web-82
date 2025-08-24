# Repo Overview

- **Name**: kheti-mitra-web
- **Stack**: Vite + React + TypeScript + Tailwind + shadcn-ui, React Router
- **Backend**: Node/Express (TypeScript) in `backend/`

## Run scripts
- **Frontend dev**: `npm run dev`
- **Frontend build**: `npm run build`
- **Frontend preview**: `npm run preview`

## App structure
- **src/pages**: Feature pages like `Loans.tsx`, `Insurance.tsx`, `Schemes.tsx`
- **src/components**: UI and composite components
- **src/lib**: Utilities and client setups (e.g., Supabase)
- **backend/src**: API, controllers, routes

## Routing
- React Router is used. Key routes in `Navigation.tsx`:
  - `/` (Home), `/weather`, `/pest-detection`, `/market-prices`, `/loans`, `/insurance`, `/schemes`, `/profile`

## Notes
- Loan schemes in `src/pages/Loans.tsx` include a `website` field used for redirecting users to official portals.
- Scheme apply buttons in `src/pages/Schemes.tsx` open the application link in a new tab when available.