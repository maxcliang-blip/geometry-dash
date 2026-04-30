## 2026-04-18 - Semantic Level Selection
**Learning:** Using a `<nav>` with `aria-label` for level selection improves screen reader navigation by clearly identifying the navigation landmark and its purpose.
**Action:** Always wrap menu-like button groups in semantic navigation elements with descriptive labels.

## 2026-05-22 - Tactile Interactive Feedback
**Learning:** Adding a small vertical translation (`translateY(1px)`) on `:active` buttons combined with `:focus-visible` outlines provides clear tactile and accessibility feedback without cluttering the UI for mouse users.
**Action:** Use the `transform: translateY(1px)` pattern for buttons to provide "pressed" feedback and always include `:focus-visible` for keyboard accessibility.

## 2026-05-22 - Visual Keyboard Cues
**Learning:** Using `<kbd>` tags styled to look like physical keys (with background, border, and shadow) makes keyboard instructions more intuitive and scanable than plain text.
**Action:** Wrap keyboard shortcuts in `<kbd>` tags and apply the "key" styling pattern to improve instruction clarity.
