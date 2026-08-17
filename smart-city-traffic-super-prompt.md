# Super Prompt: Smart City Traffic Management Platform (Registration + Simulation)

Build a two-part, production-quality web platform for a Smart City hackathon submission ("Manthan 4 Yuva" style event). Part 1 is a polished **team registration flow** matching the official portal's visual identity. Part 2 is the actual **deliverable** — an intelligent traffic simulation and command-center dashboard that solves the assigned problem statement. Both parts should share a consistent design language so the whole thing feels like one cohesive product.

---

## PROJECT CONTEXT

**Theme:** Smart City
**Problem Statement:** Uneven distribution of traffic over planning authorities' jurisdictions.
**Expected Solution:** A traffic-management simulation covering peak hours:
- Morning peak: **9:00 AM – 12:00 PM**
- Evening peak: **4:00 PM – 7:00 PM**

Goal: simulate traffic conditions, detect congestion and jurisdictional imbalance, and dynamically recommend/apply traffic-control strategies — then prove the improvement with before/after metrics.

---

## TECH STACK

- **Frontend:** React + Vite, TypeScript where possible
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Maps:** OpenStreetMap + Leaflet
- **Charts:** Recharts or Chart.js
- **Backend:** Python FastAPI (structured for future SUMO/TraCI integration)
- **Simulation engine (future-ready):** SUMO (Simulation of Urban MObility) via TraCI
- **Data exchange:** REST API + JSON, with mock data now, modular enough to swap in live TraCI data later
- **Real-time updates:** WebSockets or 1–2s polling — no page reloads during simulation

Project structure:
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
No broken buttons, dead links, console errors, or placeholder sections. Every page must be fully navigable and functional with realistic mock data.

---

## DESIGN SYSTEM (applies to both parts)

- **Background:** warm cream/light beige (`#FFF8F0` / `#FAF7F2`) for registration screens; deep dark command-center theme (default) with a light-mode toggle for the dashboard.
- **Cards:** clean white containers (`#FFFFFF`), rounded corners (`border-radius: 16px`), soft shadows, subtle amber/orange border accents.
- **Text:** deep navy/indigo (`#1A2B4C`).
- **Typography:** modern sans-serif (Inter, Poppins, or Plus Jakarta Sans), crisp hierarchy.
- **Motion:** smooth transitions, interactive hover states, subtle animated road/network background on hero sections.
- **Avoid:** excessive gradients, cartoon graphics, huge empty sections, generic SaaS templates, overly bright colors, unlabeled fake statistics.

---

## PART 1 — REGISTRATION FLOW

### Header / Navigation
- Sticky rounded navbar card.
- Left: event/org logo ("Manthan 4 Yuva" placeholder).
- Right: hamburger menu opening a sidebar drawer.
- Top progress/step bar (e.g., "REGISTERING FOR" with an orange progress indicator) showing where the user is in the multi-step flow.

### Step: Theme & Team
- Title: "Theme & Team"
- Subtitle: "Add one to four members in addition to the team lead."
- **Theme dropdown** (required, marked `*`) with options: Smart City, Healthcare & MedTech, Agriculture & Rural Development, FinTech & Cybersecurity, Clean & Green Tech.
- Below the dropdown: a red/orange link with info icon — "View detailed information about this theme - PDF".
- **Dynamic cards that update based on selected theme:**
  - **Problem Statement** card (e.g., "Uneven distribution of traffic over planning authorities jurisdiction").
  - **Expected Solution** card (e.g., "Simulation to create a traffic management during traffic hours (9 AM to 12 Noon) and (4PM to 7PM)").

### Team Member Registration
- **Team Lead** fields: Full Name, Email, Phone, College/Org ID (editable, can be pre-filled).
- **Dynamic member list:** "+ Add Member" button, 1–4 additional members allowed (team size 2–5 total).
- Each member row: Full Name, Email, Role/Skill, Remove (trash icon) button.
- Form **state must persist** — adding/removing members never resets other fields.
- Client-side validation: required fields, valid email format, max member cap enforced.

### Actions
- "Previous" (outline button) and "Proceed to Next Step" / "Submit" (primary filled button).
- On successful submission, transition into Part 2 as the team's live workspace — e.g., "Your project workspace is ready → Launch Simulation."

---

## PART 2 — TRAFFIC SIMULATION COMMAND CENTER

This is the actual hackathon deliverable and should feel like a real-world **Smart City command center**, not a student dashboard demo.

### Landing / Overview
- Header nav: Dashboard, Live Simulation, Analytics, Traffic Control, About, Settings, dark/light toggle.
- Hero title: **"Intelligent Traffic Management for Smarter Cities"**
- Subtitle: "Simulate, monitor and optimize urban traffic using real-time data and intelligent traffic-control strategies."
- Primary CTA: **"Launch Simulation"**; secondary CTA: **"View Live Dashboard"**.
- Subtle animated city/road-network background.

### Main Dashboard
Top stat cards (clearly labeled as simulation values):
```
Vehicles       12,843
Avg Speed      31 km/h
Congestion     7 zones
Travel Time    18.4 min
CO₂            4.2 tons
Efficiency     78%
```

### Interactive Traffic Map (central feature)
Leaflet/OSM map showing roads, junctions, traffic lights, vehicles, congestion zones, blockages, and planning-authority boundaries.

Traffic-state color coding: Green (free-flowing) → Yellow (moderate) → Orange (heavy) → Red (severe congestion).

Interactions: zoom, pan, select junction/road, view stats, toggle traffic layers, congestion heatmap, authority boundaries, and signal overlays.

Clicking a road shows a popup:
```
Road: MG Road
Vehicles: 642 | Avg Speed: 18 km/h | Density: High
Queue Length: 134 m | Travel Time: 6.4 min | Status: Congested
```

### Simulation Control Panel
Controls: Simulation Date, Time, Peak Period, Simulation Speed.
Buttons: Start, Pause, Resume, Stop, Reset, Run Scenario.
Timeline scrubber (09:00 → 12:00 with a current-time marker).
Speed multipliers: 1x / 2x / 5x / 10x / 50x / 100x.
Backend endpoints structured for a SUMO + TraCI integration.

### Traffic Analytics
- Vehicle Count vs Time (line)
- Average Speed vs Time (line)
- Congestion Level vs Time (area/line)
- Traffic Distribution by planning authority (bar chart) — directly visualizes the core problem statement.

### Planning Authority Comparison ("Traffic Distribution" page)
Per-authority cards:
```
Planning Authority A
Vehicles: 3,420 | Road Utilization: 82% | Congestion: HIGH
Avg Speed: 21 km/h | Traffic Share: 34%
```
Comparison chart across authorities, plus a computed **Traffic Distribution Imbalance Score** (e.g., 72/100 → "HIGH IMBALANCE") with a short explanation of what drives the score.

### AI Traffic Optimizer
Recommendation cards, e.g.:
```
⚠ Congestion detected at Junction J-14
Recommended Action: Increase green signal duration for North-South traffic by 18 seconds.
Expected Result: ↓21% queue length · ↓14% avg wait · ↑9% throughput
```
Recommendation types: signal retiming, rerouting, alternate routes, temporary one-way streets, corridor prioritization, cross-authority load balancing, abnormal-congestion detection, blockage detection.
Each card has **Apply Strategy** and **Simulate Impact** actions.

### Before vs After Comparison
Side-by-side metrics (Avg Speed, Congestion %, Avg Delay, CO₂) with animated improvement arrows and a comparison chart.

### Traffic Signal Control
Junction view with per-direction vehicle counts, live signal-phase status, and simulation-only controls (adjust green duration, change phase, enable adaptive signals) with a predicted-effect preview before applying.

### Scenario Manager
Preset scenarios: Normal Traffic, Morning Peak, Evening Peak, Accident, Road Closure, Heavy Rain, Festival/Event, Emergency Vehicle.
"Create Scenario" form: name, traffic volume, affected roads, start time, duration, traffic increase %, blocked roads.

### Live Alerts Panel
Severity-tagged, timestamped alerts, e.g.:
```
🔴 Severe congestion — Junction J-14 — Queue 310m
🟠 Traffic imbalance — Authority B — 37% above normal
🟡 Speed decreasing — Ring Road — 19 km/h
🟢 Congestion resolved — MG Road — speed +18%
```

### Sidebar Navigation
```
🏠 Overview   🗺 Live Traffic   ▶ Simulation   📊 Analytics
🚦 Traffic Control   🏙 Authorities   🧠 AI Optimizer
⚠ Alerts   🧪 Scenarios   ⚙ Settings
```
Collapses on smaller screens.

### Demo Mode (for judging)
A **"Start Full Demo"** button that auto-runs a ~2–3 minute narrative:
Normal traffic → volume increases → congestion forms → AI detects it → recommendation generated → signal adjusted → traffic redistributed → congestion drops → before/after metrics displayed.

### API Surface (mocked now, TraCI-ready later)
```
GET  /api/simulation/status
POST /api/simulation/start | pause | stop
GET  /api/traffic | /api/roads | /api/junctions | /api/congestion | /api/authorities
POST /api/strategy/apply
POST /api/scenario/run
GET  /api/analytics
```
Architecture: `React Dashboard → FastAPI Backend → TraCI → SUMO`.

---

## THE CORE LOOP TO COMMUNICATE VISUALLY

```
SIMULATE → MONITOR → DETECT → ANALYZE → OPTIMIZE → SIMULATE AGAIN → COMPARE RESULTS
```

Every screen should help answer: **Where is congestion? Why is it happening? Which authority is overloaded? What action should be taken? What happens if applied? Did distribution improve?**

---

## DELIVERABLE BAR

The finished app should look like a real smart-city operations platform suitable for a national-level hackathon: a judge should be able to register a team, open the workspace, launch the simulation, watch congestion form, see the AI flag the imbalance, apply a strategy, and immediately see measurable improvement — all without a page reload or a dead button.
