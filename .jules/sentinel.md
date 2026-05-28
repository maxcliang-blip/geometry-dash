## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-16 - [Harden CSP and Referrer Policy]
**Vulnerability:** Overly permissive CSP ('default-src 'self'') and missing Referrer Policy.
**Learning:** Hardening CSP to 'default-src 'none'' and adding a 'no-referrer' policy provides better defense-in-depth against XSS and information leakage.
**Prevention:** Always start with 'default-src 'none'' in CSP and only allow necessary sources. Use 'no-referrer' to prevent leaking internal URLs.
