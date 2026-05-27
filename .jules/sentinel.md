## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-15 - [Hardened CSP and functional regressions]
**Vulnerability:** Weak CSP allowing 'self' as default.
**Learning:** Changing `default-src 'self'` to `'none'` can silently break media (audio) and fonts if not explicitly allowed, which is critical for games.
**Prevention:** Always explicitly include `media-src 'self'` and `font-src 'self'` when hardening `default-src` to `'none'` in web applications that may use these assets.
