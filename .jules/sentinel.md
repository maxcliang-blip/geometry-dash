## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-15 - [Hardened Content Security Policy and Referrer Policy]
**Vulnerability:** Permissive `default-src 'self'` and missing `base-uri`, `object-src`, and `referrer` policies leave the application vulnerable to various injection and information leakage attacks.
**Learning:** The `base-uri` and `form-action` CSP directives do not fall back to `default-src`, meaning they must be explicitly set to `'none'` to prevent `<base>` tag hijacking and unauthorized form submissions even if a restrictive `default-src` is in place.
**Prevention:** Adopt a "deny-by-default" security posture by starting with `default-src 'none'` and explicitly whitelisting only necessary sources. Always include `base-uri 'none'`, `object-src 'none'`, and a `no-referrer` policy.
