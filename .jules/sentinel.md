## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-16 - [Hardening CSP and Referrer-Policy]
**Vulnerability:** Weak Content Security Policy (missing base-uri, object-src, form-action) and missing Referrer-Policy meta tag.
**Learning:** Even with a basic CSP, omitting specific directives like `base-uri 'none'` allows for base hijacking attacks. Missing a `Referrer-Policy` can lead to unintended information leakage via HTTP headers.
**Prevention:** Always implement a defense-in-depth approach by including strict CSP directives (`base-uri`, `object-src`, `form-action`) and a restrictive Referrer-Policy (`no-referrer`) to minimize the attack surface.
