## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2026-07-05 - [CSP Hardening and Information Leakage Prevention]
**Vulnerability:** Initial CSP was overly permissive (missing `object-src`, `base-uri`, etc.), and lack of `Referrer-Policy` could lead to information leakage.
**Learning:** Hardening CSP with `object-src 'none'`, `base-uri 'self'`, and `form-action 'none'` provides defense-in-depth against plugin exploits, base hijacking, and unauthorized form submissions. Enforcing `no-referrer` prevents the browser from sending sensitive URL data to third parties.
**Prevention:** Always include restrictive CSP directives and a strict Referrer-Policy to minimize the attack surface and prevent data leakage.
