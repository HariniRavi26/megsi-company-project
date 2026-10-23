# MEGSI Security Workforce Management Dashboard

A React (Vite) dashboard for security workforce operations: KPI cards, interactive charts
(Recharts), live-style tables and a Manchester site map (Leaflet + OpenStreetMap).
All data is mock data in `src/data/mockData.js`. There is no backend, database or paid API.

Three pages are built: **Dashboard** (`/`), **Operations** (`/operations`) and **Patrols** (`/patrols`). They share one sidebar, header, logo and design tokens. Other sidebar entries remain navigable placeholder pages.

## Operations page

- Files: `src/pages/Operations.jsx`, `src/components/Operations/*`, `src/data/operationsMockData.js`,
  `src/styles/operations.css`.
- Five action buttons (Assign Shift, Deploy Guard, Create Task, Log Operation, Report Issue) open validated
  forms. Submitting updates the tables, counters and Recent Activities feed and shows a toast.
- Six summary cards, the status doughnut, trend chart and task progress rows all open details; their period
  selectors switch between predefined mock datasets.
- Rows in Live Operations, Today's Deployment, Recent Operations, Open Operational Tasks and Recent Activities
  open detail modals with actions (update status, assign guards, complete or edit tasks). Every View All opens
  the full list.
- Operations Map is a local SVG map of Manchester (no tiles, no API key) with five clickable markers, popups
  and zoom controls; View All opens a larger map plus a location list.
- Operations data lives in React state on that page and resets on reload or when you leave the page.
- Shared components were only extended in backward-compatible ways: `Modal` (optional `wide`), `ViewAllButton`
  (optional `onClick`), `StatusBadge` (extra statuses) and the sidebar (group headings are now links).

## Tech stack

- React 18 + Vite 5 (JavaScript / JSX)
- React Router DOM 6
- Lucide React (icons)
- Recharts (charts)
- Leaflet + OpenStreetMap tiles (map, no API key)
- Plain organised CSS

## Run it on Windows

1. **Install Node.js** (version 18 or newer, LTS recommended) from https://nodejs.org if it is not
   installed. Check with `node -v` and `npm -v` in a terminal.
2. **Extract** the project ZIP (right-click, *Extract All...*).
3. **Open the folder in VS Code** (*File > Open Folder...* and pick `megsi-security-dashboard`).
4. **Open the terminal** in that folder (*Terminal > New Terminal*).
5. Run:
   ```
   npm install
   ```
6. Start the dev server:
   ```
   npm run dev
   ```
7. **Open the local URL** printed by Vite: `http://localhost:5173` (Dashboard) and `http://localhost:5173/operations` (Operations). If the port is busy Vite prints the next free one, such as 5174.

### Other scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the development server              |
| `npm run build`   | Create a production build in `dist/`      |
| `npm run preview` | Serve the production build locally        |

## Project structure

```
megsi-security-dashboard/
├── public/favicon.svg
├── src/
│   ├── components/   Sidebar, TopHeader, DashboardHeader, StatCard, charts, tables, map...
│   ├── data/         mockData.js (all dashboard data), navigation.js (sidebar menu)
│   ├── layouts/      DashboardLayout.jsx (sidebar + header + drawer behaviour)
│   ├── pages/        Dashboard.jsx, Placeholder.jsx
│   ├── styles/       global.css, sidebar.css, header.css, dashboard.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Responsive behaviour

| Width            | Layout                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| 1400px and up    | Fixed sidebar, 6 KPI cards in a row, 3 columns for the panel rows         |
| 1024 - 1399px    | Fixed sidebar, 3 KPI columns, 2-column panel grids                        |
| 768 - 1023px     | Slide-in drawer navigation, 3 KPI columns, 2-column panel grids           |
| below 768px      | Drawer navigation, 2 KPI columns (1 below 340px), stacked panels          |

- The hamburger opens the drawer on small screens and collapses/expands the sidebar on desktop.
- The drawer closes on overlay tap, on selecting a menu item, or with the Escape key.
- Tables sit in horizontally scrollable containers so they never overflow the page.

## Notes

- The map needs an internet connection to load OpenStreetMap tiles. If tiles cannot load, the
  panel shows a schematic fallback background with the site markers still visible.
- The Inter font is loaded from Google Fonts when online; the app falls back to system fonts.
- The quick action buttons (Add Client, Add Site, Add Guard, Create Shift, Log Incident) open demo
  forms that only show a confirmation message. Nothing is saved.


## Patrols page

- Route: `/patrols`; uses the shared sidebar and header and follows the supplied patrol dashboard reference.
- Includes patrol KPIs, completed/missed trend chart, status donut, site comparison chart, searchable/filterable recent patrols, guard performance, upcoming patrols, quick actions and the Manchester site map.
- Map markers can be selected to inspect site details; zoom controls work locally without a map API key.
- Start Patrol, Schedule Patrol, Assign Guard and Log Incident open forms and update the tables/activity list. Patrol data is saved to browser localStorage; Export Patrol Data downloads the current filtered patrol list as CSV.
- Dashboard quick-action forms save records in browser localStorage. Adding a client updates the Dashboard Clients KPI. This is a front-end prototype, not a connected production backend.

## Run locally

1. Extract the ZIP.
2. Open the outer `megsi-security-dashboard` folder (the one containing `package.json`) in VS Code.
3. Open Terminal in that folder.
4. Run `npm install` (or `npm ci` if using the included lockfile).
5. Run `npm run dev`.
6. Open the local URL printed by Vite, usually `http://localhost:5173`.

To navigate between pages, click **Dashboard**, **Operations**, or **Patrols** in the shared left sidebar.
