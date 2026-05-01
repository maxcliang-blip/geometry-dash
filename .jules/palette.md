## 2026-04-18 - Semantic Level Selection
**Learning:** Using a `<nav>` with `aria-label` for level selection improves screen reader navigation by clearly identifying the navigation landmark and its purpose.
**Action:** Always wrap menu-like button groups in semantic navigation elements with descriptive labels.

## 2026-04-18 - Scoped UI Styling
**Learning:** Styling global elements like `button` can cause unintended side effects across the app. Scoping styles to a parent ID (e.g., `#ui button`) ensures UI consistency without regressions.
**Action:** Always scope CSS rules for common elements to their specific UI container.

## 2026-04-18 - Visual Key Hints
**Learning:** Using the `<kbd>` tag paired with "key-like" CSS (shadows, borders) provides immediate visual intuition for keyboard controls compared to plain text.
**Action:** Use semantic `<kbd>` tags and physical-style CSS for all keyboard control instructions.
