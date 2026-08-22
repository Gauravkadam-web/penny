# Penny — Design System

Source of truth: `frontend/src/styles/variables.css` (tokens) + `frontend/src/styles/components.css` (components). Never hardcode a hex/px value in a `.jsx` file — reference a token or class from these two files only.

## Style
Modern premium financial dashboard. Codename "Ledger." Calm, precise, trustworthy — not flashy fintech.

## Layout
Responsive. Desktop: sidebar (`--sidebar-width-expanded` 240px, collapsible to `--sidebar-width-collapsed` 72px) + top navbar (`--topbar-height`) + content (`--content-max-width` 1200px). Mobile (`≤--breakpoint-mobile` 640px): sidebar → `.tabbar` bottom nav, cards stack full width.

## Colors — semantic roles (see `variables.css` for hex)
| Role | Token | Use |
|---|---|---|
| Background | `--color-paper` | page |
| Surface | `--color-surface` | cards, inputs, modals |
| Primary text | `--color-ink` | headings, values |
| Secondary text | `--color-ink-soft` | labels |
| Muted text | `--color-ink-muted` | placeholders |
| Brand/accent | `--color-ledger` | primary buttons, positive, active nav |
| Highlight | `--color-gold` | focus rings, premium accents (sparing use) |
| Negative | `--color-rose` | expense deltas, destructive actions, errors |
| Divider | `--color-rule` | hairlines |
Dark mode: same roles, values flip under `[data-theme="dark"]`. No component ever references raw hex.

## Typography
| Role | Token | Font |
|---|---|---|
| Money figures, page titles | `--font-display` | Fraunces (serif) |
| All UI text | `--font-body` | Inter |
| Table numbers/dates | `--font-mono` | IBM Plex Mono, right-aligned |
Scale: `--font-size-display-xl` 48px → `--font-size-caption` 12px (full scale in `variables.css`).

## Components (all in `components.css`, class-based only)
`.btn` (`--primary/--secondary/--danger/--ghost`, `--sm/--lg`) · `.card` (`--clickable`) · `.input` (`--error`) · `.select` · `.modal-overlay`/`.modal` · `.table` (`.table__cell--numeric` for mono amounts) · `.navbar` (`--scrolled`) · `.sidebar` (`--collapsed`) + `.tabbar` (mobile) · `.toast` (`--success/--error/--info`) · `.empty-state` · `.skeleton`/`.spinner` · `.error-state` (`--inline`)

Each has exactly one implementation. Feature components (`ExpenseForm.jsx`, `CategoryList.jsx`, etc.) import and compose these — never re-style or duplicate.

## Spacing / Radius / Shadows / Motion
All via tokens only: `--space-1..8` (4–64px), `--radius-sm/md/lg/full`, `--shadow-xs/sm/md/lg/focus`, `--duration-fast/base/slow` + `--ease-standard`. Motion: subtle only, always wrapped for `prefers-reduced-motion`.

## Theme
Light default, dark via `[data-theme="dark"]` on root. Toggle state lives in `AppContext.jsx`.

## Hard restrictions
- No inline styles (`style={{...}}`) — class names only. Exception: skeleton width/height (layout, not token).
- No hardcoded business data (categories, amounts) in components — fetch via API/services.
- No duplicated UI — one component per pattern in `components/common/`.

## Agent instruction
When building any screen: use only classes above + tokens from `variables.css`/`components.css`. If a needed style isn't covered by an existing token/class, add it to those two files first — don't invent one-off styles inline.
