# SadakSense UI/UX Style Guide

## Antigravity IDE Handoff Specification

**Product:** SadakSense  
**Product type:** Urban mobility intelligence and traffic operations command center  
**Design direction:** Signal Atlas  
**Primary audience:** City traffic operators, mobility planners, control-room leads, and smart-city analysts  
**Design objective:** Make complex live traffic conditions feel composed, legible, and actionable without looking like a generic AI-generated SaaS dashboard.

---

## 1. Product Experience Summary

SadakSense is a live traffic intelligence desk. It should help an operator answer three questions immediately:

1. **Where is the network asking for attention?**
2. **What changed recently?**
3. **What is the next best operational move?**

The interface should prioritize decision-making over data volume. Every element must support situational awareness, interpretation, or action. If a component does not help the operator understand the network or act on it, remove it.

> SadakSense should feel like an authored transportation intelligence system, not a collection of dashboard widgets.

The product should communicate the following qualities:

| Quality | Expression in the interface |
|---|---|
| Observant | Clear live status, concise incident summaries, visible trend changes |
| Grounded | Warm paper surfaces, restrained color, real-world coordinates and district codes |
| Decisive | Strong hierarchy, direct CTAs, one dominant signal at a time |
| Technical | Monospace metadata, route labels, map layers, operational terminology |
| Calm | Spacious composition, limited alerts, no unnecessary animation or visual noise |

---

## 2. Chosen Design Movement

The design combines **contemporary editorial modernism**, **Swiss information design**, and **field-notes materiality**.

The visual language should resemble a carefully composed urban atlas or a professional transportation operations briefing. Use strong typography, fine rules, small coordinate-like metadata, asymmetric layouts, and a small number of highly intentional colors.

Avoid generic startup-dashboard conventions such as:

- Centered hero layouts with equal-width feature cards.
- Repeated rounded cards for every data point.
- Purple gradients or default blue SaaS palettes.
- Excessive glassmorphism, glow, or neon effects.
- Large numbers presented without operational context.
- Decorative charts that do not lead to a decision.
- Too many status pills, badges, and icon containers.
- Multiple competing CTAs in the same view.
- Inter as the only font.
- Dense tables where a short readout would be clearer.

---

## 3. Core Design Principles

### 3.1 One dominant decision at a time

Each screen should make the most important operational signal visually obvious. Supporting information should remain quieter until the operator needs it.

### 3.2 Editorial hierarchy over widget density

Use strong page titles, section numbering, short labels, and composed sections instead of rows of interchangeable cards. Information should read like a briefing, not a component catalog.

### 3.3 Warm precision

The system is technical but not clinical. Warm mineral surfaces soften the interface while petrol green and ink-black maintain authority.

### 3.4 Remove before adding

Before introducing a new component, ask whether an existing component already communicates the same information. Consolidate redundant controls, repeated summaries, and duplicate navigation.

### 3.5 Real-world context matters

Use district codes, street names, timestamps, coordinates, peak-period language, and route labels to make the system feel grounded in an actual city network.

---

## 4. Brand Essence

### Positioning

SadakSense is a live traffic intelligence desk for city operators who need to move from signal to decision quickly. It is different because it makes urban complexity feel composed and actionable.

### Personality

- Observant
- Grounded
- Decisive

### Brand voice

Headlines should be concise and situational. Calls to action should describe the next operator move. Microcopy should be factual, specific, and calm.

Use language such as:

- “Where the network is asking for attention.”
- “North district is absorbing the morning peak.”
- “Rebalance the corridor before the queue reaches the junction.”
- “Signal drift detected.”
- “Open incident log.”
- “Review adjustment.”
- “Apply recommendation.”

Avoid language such as:

- “Welcome to our website.”
- “Get started today.”
- “Unlock powerful insights.”
- “Supercharge your workflow.”
- “The future of traffic management.”
- “Amazing AI-powered dashboard.”

---

## 5. Brand Mark and Wordmark

### Logo concept

The logo is a bold abstract symbol built from two offset road bands forming a subtle capital R and flowing junction shape. Include a small clipped notch in the lower band.

The mark should:

- Work without text.
- Remain recognizable at favicon size.
- Use crisp geometry rather than rounded cartoon forms.
- Use ink black, petrol green, and a small citrus accent.
- Have generous clear space around it.

### Wordmark

Use a tightened Space Grotesk wordmark. The “O” in SADAKSENSE can be slightly squared or customized to echo a junction marker.

Do not render the logo as an unstyled brand name in a default font.

### Asset references

Use the following generated assets in the SadakSense project:

```text
Logo mark:
/manus-storage/sadaksense-mark_b7af6139.png

Atlas texture:
/manus-storage/sadaksense-atlas-texture_48f4e038.png
```

---

## 6. Color System

### 6.1 Primary palette

| Token | Hex | Usage |
|---|---:|---|
| `paper` | `#F3F1EA` | Main page background and warm surface |
| `paper-2` | `#E9E8E1` | Secondary surface, bars, quiet controls |
| `ink` | `#1D2421` | Primary text, navigation, high-contrast controls |
| `muted` | `#76807A` | Secondary labels, metadata, supporting copy |
| `petrol` | `#176C68` | Intelligence, active navigation, positive trend, focus |
| `petrol-dark` | `#0F4E4B` | Deep action panel background and strong emphasis |
| `citrus` | `#F2B24A` | Active routes, attention states, primary signal, key CTA |
| `rust` | `#C45D43` | Critical congestion, incidents, urgent states |
| `sage` | `#7BA58B` | Clear flow, resolved incidents, healthy network states |

### 6.2 Color philosophy

The base color is warm mineral paper rather than pure white. It lowers visual fatigue and supports the editorial atlas metaphor.

Ink carries navigation and primary data. Petrol communicates intelligence and active system state without relying on default technology blue. Citrus is the ownable brand color and must be used sparingly. Rust is reserved for meaningful operational risk. Sage indicates healthy or resolved conditions.

### 6.3 Usage rules

- Use citrus for active routes, attention, and the primary next action.
- Use rust only when there is a real critical condition.
- Do not use red for decorative emphasis.
- Use petrol for active navigation and positive operational change.
- Keep text on warm surfaces dark and high contrast.
- Never put muted text on a low-contrast surface.
- Do not introduce additional accent colors without a product reason.

---

## 7. Typography System

### 7.1 Font pairing

Use:

- **Space Grotesk** for display text, navigation, headings, buttons, and primary interface labels.
- **IBM Plex Mono** for timestamps, district codes, coordinates, operational metadata, and numeric values.

### 7.2 Typography hierarchy

| Element | Font | Suggested size | Weight | Notes |
|---|---|---:|---:|---|
| Landing headline | Space Grotesk | `clamp(58px, 8.3vw, 124px)` | 600 | Tight line height and negative tracking |
| Command center title | Space Grotesk | `clamp(30px, 4vw, 49px)` | 600 | Compact, direct, situational |
| Section title | Space Grotesk | `20–22px` | 600 | Use editorial section hierarchy |
| Card/panel title | Space Grotesk | `15–18px` | 500–600 | Avoid oversized card headings |
| Body copy | Space Grotesk | `12–16px` | 400 | Relaxed line height |
| Metadata | IBM Plex Mono | `9–11px` | 400–500 | Uppercase or coordinate-like notation |
| Numeric metric | IBM Plex Mono or Space Grotesk | `48–72px` | 500 | Keep context nearby |
| Button label | Space Grotesk | `11–13px` | 600 | Use verbs, not marketing phrases |

### 7.3 Type rules

- Use negative letter spacing for large headlines.
- Use generous line height for body copy.
- Do not use all caps for long sentences.
- Use monospace only for metadata and values, not for paragraph copy.
- Use italic emphasis rarely and only for editorial words such as “move.”
- Keep titles short enough to scan quickly.

---

## 8. Layout Paradigm

### 8.1 Desktop structure

Use a persistent narrow left rail and an asymmetric main workspace.

```text
┌──────────────────────┬──────────────────────────────────────────────┐
│                      │ Topbar / breadcrumbs / time / operator       │
│   Persistent rail    ├──────────────────────────────────────────────┤
│                      │ Page intro / primary action                  │
│                      ├──────────────────────────────┬───────────────┤
│                      │ Live traffic atlas           │ Operator      │
│                      │                              │ readout       │
│                      ├──────────────────────────────┼───────────────┤
│                      │ District pulse               │ Next move     │
└──────────────────────┴──────────────────────────────┴───────────────┘
```

### 8.2 Desktop dimensions

- Rail width: approximately `232px`.
- Topbar height: approximately `72px`.
- Main content horizontal padding: `36–48px`.
- Main content max width: approximately `1500px`.
- Primary layout gap: `32–40px`.
- Section spacing: `32–44px`.
- Avoid symmetrical equal-width columns unless the content truly has equal importance.

### 8.3 Mobile structure

On screens below approximately `760px`:

- Convert the left rail into a slide-in drawer.
- Show a compact topbar with menu, time, theme, notifications, and avatar.
- Stack the map and readout vertically.
- Move the next-best-move panel below district pulse.
- Hide secondary metadata when it does not aid scanning.
- Preserve clear section numbering and spacing.
- Keep primary actions full-width or comfortably tappable.

### 8.4 Whitespace

Whitespace is an active part of the design. Use it to separate operational stories. Do not fill empty space simply because it exists.

---

## 9. Navigation Model

### Primary rail sections

Use only four main workspace destinations:

| Code | Label | Purpose |
|---:|---|---|
| `01` | Overview | Primary situation summary and next action |
| `02` | Live map | Spatial traffic network and route conditions |
| `03` | Optimizer | Recommended interventions and expected impact |
| `04` | Signals | Signal control and corridor timing |

Supporting areas such as settings and help should remain visually secondary at the bottom of the rail.

### Navigation behavior

- Active item uses a citrus signal and subtle warm background.
- Hover adds a small horizontal shift or background lift.
- Use a chevron only for the active destination.
- Do not use a large collection of nested navigation items.
- Always provide a visible route back to the overview.
- On mobile, close the rail after selecting a destination.

---

## 10. Page Architecture

### 10.1 Landing page

The landing page is editorial and minimal. It should introduce the product without becoming a marketing site full of sections.

Recommended structure:

1. Compact header with logo and “Open command center” link.
2. Small live network eyebrow with current local time.
3. Large headline: “Make the next move visible.”
4. Short explanation of SadakSense’s purpose.
5. One primary CTA: “Enter live workspace.”
6. Quiet footer metadata such as network status and product label.

The landing page should use the atlas texture as a quiet background. Ensure text remains dark because the background is light.

### 10.2 Command center overview

Recommended structure:

1. Global topbar.
2. Page intro with greeting, monitoring context, and simulation action.
3. Primary signal banner.
4. Live traffic atlas.
5. Operator readout.
6. District pulse.
7. Next-best-move panel.

Do not add separate stat-card rows for every metric. Combine the most important metric into the operator readout and provide context alongside it.

---

## 11. Component Specifications

### 11.1 Topbar

Purpose: global orientation and small set of high-frequency controls.

Include:

- Mobile menu button.
- Breadcrumb such as `Workspace > Overview`.
- Current local time.
- Date or peak-period context.
- Theme toggle if needed.
- Notification indicator.
- Operator avatar.

Avoid:

- Multiple large pills.
- Redundant backend status badges.
- Large “demo” CTA in the global header.
- Too many simulation controls in the topbar.

### 11.2 Primary signal banner

Purpose: communicate the most important network condition and its immediate consequence.

Structure:

- Citrus top rule.
- Compact alert icon on a citrus square.
- Kicker with district code.
- One clear headline.
- One short explanation.
- One action button.

Example:

```text
PRIMARY SIGNAL / N-04
North district is absorbing the morning peak.
Queue depth is up 14% in the last 12 minutes.
[Review adjustment →]
```

### 11.3 Traffic atlas

Purpose: provide spatial context without becoming a technically noisy GIS screen.

Visual treatment:

- Warm paper or atlas texture background.
- Dark gray major roads.
- Lighter gray minor roads.
- Citrus dashed route for the active route or focus corridor.
- Rust, citrus, and petrol points for traffic states.
- Small district labels such as `N-04 / ASH`.
- Coordinate metadata in the lower corner.
- Quiet legend.

Toolbar controls should be minimal:

- Live network status.
- Layers.
- Filter.

Do not place a large collection of map controls over the content.

### 11.4 Operator readout

Purpose: summarize what changed and make the current network state legible.

Structure:

- Section kicker: `02 / What changed`.
- Title: `Operator readout`.
- One primary metric such as network load.
- Trend label.
- Three to five incident rows.
- Link to the full incident log.

Incident rows should contain:

- A thin colored marker.
- Short incident title.
- Time.
- District or operational detail.

Do not use a large rounded alert card for each incident.

### 11.5 District pulse

Purpose: show where network load is distributed across key authorities or districts.

Use a compact list rather than four separate cards.

Each row contains:

- State dot.
- District name and code.
- Horizontal utilization bar.
- Percentage.
- Average speed.

Suggested states:

- Critical: rust.
- Watch: citrus.
- Clear: sage.

### 11.6 Next-best-move panel

Purpose: turn intelligence into an operator action.

Use a deep petrol surface with citrus accents.

Include:

- Kicker: `04 / Next best move`.
- Recommendation title.
- One-sentence explanation.
- Two expected impact values.
- Primary action button.

Example:

```text
REBALANCE N-04
Shift phase 03 by 12 seconds at Ash / 4th to reduce queue depth before 10:00.
-18% queue   +9% throughput
[Apply recommendation →]
```

Do not present recommendations as generic AI copy. Explain the physical or operational effect.

---

## 12. Interaction Rules

### Buttons

- Use direct verbs: `Review`, `Apply`, `Open`, `Run`, `Pause`, `Reset`.
- Buttons should have a clear hierarchy: primary, quiet, and signal/action.
- Add a subtle `scale(.97)` active state.
- Keep transitions between `160–220ms`.
- Use visible focus rings for keyboard users.

### Hover

Hover should reveal affordance rather than decoration.

Recommended hover behavior:

- Rail item shifts horizontally by `2px`.
- Text link gap expands slightly before the arrow.
- Button darkens or shifts to petrol.
- Incident row gains a small elevation only if it is clickable.

### Simulation controls

Simulation controls should be easy to find but should not overpower the operational readout.

Required states:

- Run simulation.
- Pause run.
- Reset simulation.
- Optional speed selection in a dedicated simulation area rather than the main header.

### Notifications

Use notification indicators sparingly. A small citrus dot is enough for unread items. Do not use animated flashing or repeated alert banners.

### Loading and empty states

Loading states should be quiet and informative. Avoid large spinners in the middle of the page.

Example:

```text
Refreshing network signal…
Last reliable snapshot: 09:41:58
```

Empty states should explain what is absent and what to do next.

Example:

```text
No active incidents in Riverside.
The corridor is currently flowing within baseline.
```

---

## 13. Motion and Animation

Animation is restrained and operational.

### Timing

- Button press: `100–160ms`.
- Hover and list interaction: `160–220ms`.
- Dropdowns: `150–250ms`.
- Drawers and panels: `200–300ms`.
- First-load section reveal: subtle, staggered by `45ms`.
- Map route reveal: one-time `400ms` stroke reveal.

### Easing

Use a strong ease-out curve:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
```

### Restrictions

- Animate only `transform` and `opacity` where possible.
- Do not continuously animate the map.
- Do not use bouncing or playful motion.
- Do not animate layout dimensions unless necessary.
- Do not animate keyboard command interfaces.
- Respect `prefers-reduced-motion`.

Recommended reduced-motion rule:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 14. Surfaces, Borders, and Shape Language

### Surfaces

Use warm solid surfaces and subtle texture. Prefer depth from contrast and spacing instead of many bordered cards.

### Borders

Use fine low-contrast rules:

```css
border-color: rgba(29, 36, 33, 0.13);
```

### Radius

Use square or lightly softened corners. SadakSense should not look like a collection of pills.

Recommended radius range:

- Most panels: `0–6px`.
- Small controls: `3–5px`.
- Avatars and status dots: circular only when semantically appropriate.

### Shadows

Use shadows sparingly. Only drawers, floating overlays, and interactive elevation may use a noticeable shadow.

---

## 15. Data Visualization Rules

Charts and metrics should answer a question. Every visualization needs context.

Good:

```text
Network load
68%
+6.4% since 08:30
```

Less useful:

```text
68%
```

Use color to represent operational state rather than arbitrary series. Prefer compact horizontal bars and trend labels for the overview. Use detailed charts only inside analytics or optimizer views.

Avoid:

- Donut charts for simple percentages.
- Decorative sparkline collections.
- Multiple color scales in one panel.
- Charts without time period or unit labels.

---

## 16. Accessibility Requirements

- Maintain strong text contrast on warm backgrounds.
- Never rely on color alone to communicate a state.
- Pair state colors with labels such as `critical`, `watch`, and `clear`.
- Ensure all buttons and navigation items are keyboard reachable.
- Use semantic headings in order.
- Provide accessible labels for icon-only controls.
- Provide alt text for the logo and meaningful image assets.
- Do not hide essential actions behind hover-only behavior.
- Support reduced motion.
- Make mobile touch targets at least approximately `40px` high.

---

## 17. Responsive Behavior Checklist

### Desktop

- Persistent rail is visible.
- Map and readout appear side by side.
- District pulse and optimizer appear side by side.
- Page intro actions align to the right.

### Tablet

- Rail may narrow.
- Main content padding reduces.
- Map/readout columns remain side by side if readable.
- Secondary metadata may be hidden.

### Mobile

- Rail becomes a drawer.
- Menu button is visible in the topbar.
- Map and readout stack vertically.
- Signal banner wraps into two rows.
- Authority speed column may be hidden.
- Buttons remain tappable and readable.
- No horizontal scrolling.

---

## 18. File and Component Organization

Recommended React structure:

```text
client/
  src/
    App.tsx
    index.css
    pages/
      LandingPage.tsx
      CommandCenterPage.tsx
      LiveMapPage.tsx
      OptimizerPage.tsx
      SignalsPage.tsx
    components/
      brand/
        Logo.tsx
      layout/
        AppShell.tsx
        Rail.tsx
        Topbar.tsx
      overview/
        SignalBanner.tsx
        TrafficAtlas.tsx
        OperatorReadout.tsx
        DistrictPulse.tsx
        NextBestMove.tsx
      shared/
        SectionHeading.tsx
        StatusDot.tsx
        ActionButton.tsx
```

Every edited CSS, JSX, and TSX file should begin with a short reminder comment:

```tsx
// Signal Atlas: warm editorial hierarchy, petrol intelligence, citrus signal, and no redundant UI.
```

Keep page composition separate from reusable visual primitives. Do not duplicate the same markup across multiple pages.

---

## 19. Content and Naming Rules

Use real operational vocabulary:

- Network load
- Queue depth
- Throughput
- Average speed
- Signal drift
- Phase timing
- Corridor
- District
- Junction
- Spillback
- Peak period
- Live network
- Incident log
- Adjustment
- Recommendation

Avoid vague product language:

- Insights
- Performance overview
- Smart solution
- Intelligent platform
- Growth dashboard
- AI magic

When referring to AI recommendations, explain the operational reasoning and expected impact.

---

## 20. Definition of Done

A SadakSense screen is ready when:

- The primary operational signal is obvious within a few seconds.
- No redundant cards or duplicate controls remain.
- The layout feels asymmetric and composed rather than centered and templated.
- Warm paper, ink, petrol, citrus, rust, and sage are used consistently.
- Space Grotesk and IBM Plex Mono are used according to the typography rules.
- Map labels, timestamps, and district codes provide real-world context.
- Every action button communicates a specific next move.
- Mobile navigation and stacked content are usable without horizontal scrolling.
- Critical and clear states are communicated by both color and text.
- Motion remains restrained and respects reduced-motion preferences.
- The page contains enough whitespace to separate different operational stories.

> Final design test: Does this choice reinforce the Signal Atlas philosophy, or does it dilute it?
