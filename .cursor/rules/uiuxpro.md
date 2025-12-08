# UI/UX Pro Rules (Dashboards & Ops Tools)

## Principles
- Design for clarity and speed: prioritize key metrics (revenue, orders, latency).
- Consistency: 8px spacing grid, 12/16/20/24 font scale, max width 1200px for main content.
- Accessibility: target WCAG AA; color contrast ≥4.5:1; keyboard navigation; aria labels.

## Layout
- Dashboard hero shows date range, total revenue, orders, uptime; follow with trend charts.
- Use responsive grid (2–4 columns) with cards; avoid horizontal scroll.
- Keep filters persistent and collapsible; default to most-used presets (Today, 7d, 30d).

## Components
- Cards: clear title, primary number, delta vs previous period, sparkline.
- Tables: sticky header, sortable columns, pagination, inline search; show loading/empty/error states.
- Forms: inline validation, helpful defaults, descriptive errors; disable submit while loading.
- Charts: prefer line for trends, bar for categories, pie only for <5 categories; show tooltips + legends.

## States & Feedback
- Always surface Loading / Empty / Error / Success states with guidance.
- Use toast/snackbar for non-blocking success/failure; modal only for destructive actions.
- Skeletons over spinners for main content; show retry on errors.

## Data Integrity
- Show timestamps and timezone; indicate data freshness (e.g., “Updated 20s ago”).
- For async tasks, display progress + status chips (queued, running, failed, done).
- Provide export to CSV/XLS; confirm before destructive actions; include undo when feasible.

## Internationalization
- Support i18n (ID, VI); keep copy concise; use locale-aware numbers/dates.
- Avoid hardcoded currency; show currency code (IDR/VND) and symbol.

## Performance UX
- Debounce search/filter inputs; lazy-load heavy widgets.
- Cache recent filters; remember last selected workspace/tenant.
- Optimize above-the-fold content to render first; defer non-critical widgets.

## Visual Tokens
- Primary: #2563EB; Success: #16A34A; Warning: #F59E0B; Danger: #DC2626; Neutral text: #0F172A/#475569.
- Border radius 8px; shadow for elevation only on interactive cards.
- Icons: use consistent set (e.g., Heroicons/Feather); label critical actions.

## Examples
- Ops dashboard layout: Filters row → KPI cards → Trend charts → Tables (incidents/tasks) → Activity log.
- Incident flow: Alert banner → details drawer → timeline → action buttons (ack/resolve) → comment box.

## UI UX Pro Max Data (local kit)
- Available assets (from `ui-ux-pro-max-skill-main/`): 57 UI styles (glassmorphism, clay, minimal, brutalism, bento, dark mode…), 95 color palettes, 56 font pairings, 24 chart types, 98 UX guidelines, stack presets (HTML+Tailwind, React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter).
- Usage via AI prompt (Cursor): request UI/UX work and refer to style/palette/stack, e.g., “Apply bento grid with SaaS fintech palette using React + Tailwind.”
- For dashboards, always pick palette + font pairing + chart type from the dataset; document chosen style/palette/font in PR/notes for consistency.
- Example prompts (local skill intent):
  - “/ui-ux-pro-max Design an ops dashboard with bento grid, SaaS fintech palette, React + Tailwind.”
  - “Recommend chart types and color palettes for healthcare analytics in dark mode.”
  - “Suggest typography + palette for e-commerce mobile app (React Native).”
- Stack presets (from kit): HTML+Tailwind (default), React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter. Specify stack to guide component/code output.
- Chart guidance (use kit data): lines for trends, bars for categories, pies only <5 categories, donuts for composition, area for stacked volumes; align palette to accessibility targets.
- Keep outputs consistent: spacing 8px grid, states (loading/empty/error), data freshness, i18n (ID/VI), currency code (IDR/VND).

## Inspirations from other kits (actionable)
- ClaudeKit: provide slash commands + multi-agent orchestration. Mirror by keeping prompts concise, documenting style/palette/font per task, and enabling “/ui-ux-pro-max” style triggers.
- Preline / Ant Design / Bootstrap: component completeness and theming. When generating UI, align to Tailwind-friendly tokens and enterprise-ready patterns (tables with filters, forms with validation, modals with a11y).
- Frames X / Relume: rapid layout blocks. Prefer reusable block patterns (hero + filters + KPI cards + charts + tables + activity log) to speed delivery.
- Apple/iOS kits: platform-specific HIG cues. If mobile, respect platform spacing, touch targets (44px), and native controls where possible.
- Accessibility kits: enforce WCAG AA contrast, keyboard focus states, aria labels, and reduced-motion fallbacks.

