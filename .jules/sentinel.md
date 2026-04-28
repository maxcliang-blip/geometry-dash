## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2026-04-28 - [DOM-derived Attribute Validation]
**Vulnerability:** Trusting data from DOM attributes (like `data-level`) without validation can lead to unexpected logic execution or crashes if the DOM is tampered with.
**Learning:** Even internal-only data sources like dataset attributes should be treated as untrusted input when they drive critical application flow.
**Prevention:** Implement basic input validation (like length checks and allow-lists) for all data retrieved from the DOM before passing it to core logic.
