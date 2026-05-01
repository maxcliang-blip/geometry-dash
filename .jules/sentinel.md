## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-16 - [Hardened CSP and Input Allowlisting]
**Vulnerability:** Weak CSP and potential logic flaws in level selection.
**Learning:** Hardening CSP with `object-src 'none'`, `base-uri 'none'`, and `form-action 'none'` provides defense-in-depth. Whitelisting inputs using `switch` statements or Maps is safer than dynamic loading.
**Prevention:** Regularly audit CSP and use exhaustive allowlists for dynamic logic.
