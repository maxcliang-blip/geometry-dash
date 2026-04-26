## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-20 - [Strict Content Security Policy (CSP) Hardening]
**Vulnerability:** Overly permissive `default-src 'self'` and missing restrictive directives like `object-src`, `base-uri`, and `form-action` increase the attack surface.
**Learning:** Hardening CSP to `default-src 'none'` while explicitly whitelisting trusted sources for scripts, styles, and assets significantly reduces the risk of XSS and data exfiltration.
**Prevention:** Always default to 'none' in CSP and add only necessary permissions. Include `object-src 'none'`, `base-uri 'none'`, and `form-action 'none'` by default.
