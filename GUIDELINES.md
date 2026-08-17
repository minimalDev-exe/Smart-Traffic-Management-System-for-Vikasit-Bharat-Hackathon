# Guidelines — Smart City Traffic Management Platform

Technical, structural, and design-system conventions for all code generated in this project. Follow these exactly unless `SYSTEM_INSTRUCTIONS.md` or the user directs otherwise.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React + Vite, TypeScript where possible |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Maps | OpenStreetMap + Leaflet |
| Charts | Recharts or Chart.js (pick one and stay consistent) |
| Backend | Python FastAPI (structured for future SUMO/TraCI integration) |
| Simulation engine (future) | SUMO via TraCI |
| Data exchange | REST API + JSON; mock data now, modular enough to swap in live TraCI data later |
| Real-time updates | WebSockets or 1–2s polling — never full page reloads mid-simulation |

## 2. Project Structure

```
components/
  DashboardCard, TrafficMap, SimulationControls, TrafficChart,
  CongestionPanel, AlertPanel, AuthorityCard, AIRecommendation,
  SignalControl, ScenarioManager, RegistrationForm, TeamMemberCard,
  ThemeSelector, StepProgressBar
pages/
services/
hooks/
utils/
data/
```

- Keep components single-purpose and reusable across both Part 1 and Part 2 (e.g., `DashboardCard` should work for both registration summary stats and simulation stats).
- Put all mock datasets in `data/`, typed where possible, so swapping to live API calls later only touches `services/`.
- API calls live in `services/`; components never fetch directly.

## 3. Design System

- **Registration screens background:** warm cream/light beige — `#FFF8F0` / `#FAF7F2`.
- **Command-center default:** deep dark theme, with a light-mode toggle.
- **Cards:** white containers (`#FFFFFF`), `border-radius: 16px`, soft shadows, subtle amber/orange border accents.
- **Text:** deep navy/indigo — `#1A2B4C`.
- **Typography:** Inter, Poppins, or Plus Jakarta Sans — pick one family and use it everywhere for hierarchy consistency.
- **Motion:** smooth transitions, interactive hover states; subtle animated road/network background permitted only on hero sections.
- **Traffic-state color coding (must be used consistently across map, cards, and charts):**
  - Green — free-flowing
  - Yellow — moderate
  - Orange — heavy
  - Red — severe congestion

**Avoid:** excessive gradients, cartoon graphics, large empty sections, generic SaaS-template layouts, overly bright/neon colors, unlabeled or unexplained statistics.

## 4. Part 1 — Registration Flow Requirements

- Sticky rounded navbar: logo (left), hamburger → sidebar drawer (right).
- Step progress bar labeled "REGISTERING FOR" with an orange progress indicator.
- **Theme & Team step:**
  - Required theme dropdown (`*`): Smart City, Healthcare & MedTech, Agriculture & Rural Development, FinTech & Cybersecurity, Clean & Green Tech.
  - Red/orange "View detailed information about this theme - PDF" link with info icon below the dropdown.
  - Dynamic Problem Statement and Expected Solution cards that update when the theme changes.
- **Team fields:**
  - Team Lead: Full Name, Email, Phone, College/Org ID (pre-fillable, editable).
  - 1–4 additional members via "+ Add Member" (team size 2–5 total).
  - Each member row: Full Name, Email, Role/Skill, Remove (trash icon).
  - Adding/removing a member must never reset other fields' values.
  - Client-side validation: required fields, valid email format, enforced member cap.
- Actions: outline "Previous" button + primary filled "Proceed to Next Step" / "Submit" button.
- On submit, transition directly into Part 2 as the team's live workspace (e.g., "Your project workspace is ready → Launch Simulation").

## 5. Part 2 — Command Center Requirements

### Navigation
Header: Dashboard, Live Simulation, Analytics, Traffic Control, About, Settings, dark/light toggle.
Sidebar (collapses on smaller screens):
```
🏠 Overview   🗺 Live Traffic   ▶ Simulation   📊 Analytics
🚦 Traffic Control   🏙 Authorities   🧠 AI Optimizer
⚠ Alerts   🧪 Scenarios   ⚙ Settings
```

### Landing
- Hero: "Intelligent Traffic Management for Smarter Cities."
- Subtitle: "Simulate, monitor and optimize urban traffic using real-time data and intelligent traffic-control strategies."
- Primary CTA "Launch Simulation", secondary CTA "View Live Dashboard".

### Dashboard stat cards (labeled, with units)
`Vehicles`, `Avg Speed (km/h)`, `Congestion (zones)`, `Travel Time (min)`, `CO₂ (tons)`, `Efficiency (%)`.

### Interactive Traffic Map
- Roads, junctions, traffic lights, vehicles, congestion zones, blockages, planning-authority boundaries.
- Interactions: zoom, pan, select junction/road, toggle layers (congestion heatmap, authority boundaries, signal overlays).
- Road-click popup must show: Road name, Vehicles, Avg Speed, Density, Queue Length, Travel Time, Status.

### Simulation Control Panel
- Controls: Date, Time, Peak Period, Simulation Speed.
- Buttons: Start, Pause, Resume, Stop, Reset, Run Scenario.
- Timeline scrubber (09:00 → 12:00) with current-time marker.
- Speed multipliers: 1x / 2x / 5x / 10x / 50x / 100x.

### Analytics
- Vehicle Count vs Time (line), Avg Speed vs Time (line), Congestion Level vs Time (area/line), Traffic Distribution by authority (bar).

### Authority Comparison
- Per-authority card: Vehicles, Road Utilization %, Congestion level, Avg Speed, Traffic Share %.
- Comparison chart + computed **Traffic Distribution Imbalance Score** (0–100) with a short plain-language explanation of what drives the score.

### AI Traffic Optimizer
- Recommendation cards with: detected issue, recommended action, expected quantified result (e.g., ↓queue, ↓wait, ↑throughput).
- Recommendation types to support: signal retiming, rerouting, alternate routes, temporary one-way streets, corridor prioritization, cross-authority load balancing, abnormal-congestion detection, blockage detection.
- Each card: **Apply Strategy** and **Simulate Impact** actions, both functional against mock state.

### Before vs After Comparison
- Side-by-side metrics: Avg Speed, Congestion %, Avg Delay, CO₂ — animated improvement arrows + comparison chart.

### Traffic Signal Control
- Per-direction vehicle counts, live phase status, simulation-only controls (green duration, phase change, adaptive toggle), predicted-effect preview before applying.

### Scenario Manager
- Presets: Normal Traffic, Morning Peak, Evening Peak, Accident, Road Closure, Heavy Rain, Festival/Event, Emergency Vehicle.
- "Create Scenario" form: name, traffic volume, affected roads, start time, duration, traffic increase %, blocked roads.

### Live Alerts
- Timestamped, severity-tagged (🔴🟠🟡🟢) entries reflecting real state changes in the mock simulation.

### Demo Mode
- "Start Full Demo" auto-runs a ~2–3 minute scripted narrative: normal traffic → volume increases → congestion forms → AI detects it → recommendation generated → signal adjusted → traffic redistributed → congestion drops → before/after metrics shown. This must run unattended once started.

## 6. API Surface (mock now, TraCI-ready later)

```
GET  /api/simulation/status
POST /api/simulation/start | pause | stop
GET  /api/traffic | /api/roads | /api/junctions | /api/congestion | /api/authorities
POST /api/strategy/apply
POST /api/scenario/run
GET  /api/analytics
```

Architecture: `React Dashboard → FastAPI Backend → TraCI → SUMO` (SUMO/TraCI wiring is future work — build the seams, not the integration, unless explicitly asked).

## 7. Quality Bar Checklist (apply before marking any task complete)

- [ ] No broken buttons, dead links, console errors, or placeholder sections.
- [ ] Every page is fully navigable with realistic mock data.
- [ ] Design system colors/radii/typography applied consistently.
- [ ] Traffic-state color coding consistent across map, cards, charts.
- [ ] All numeric displays are labeled with units.
- [ ] Registration state persists correctly through add/remove operations.
- [ ] No full-page reloads during an active simulation.
