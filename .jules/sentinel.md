## 2025-05-15 - [CSP Implementation and Inline Script/Style Removal]
**Vulnerability:** Use of inline styles and inline event handlers (`onclick`) violates strict Content Security Policy (CSP) and increases XSS risk.
**Learning:** Moving styles to external CSS and event handlers to `addEventListener` in TypeScript/JavaScript is necessary for `style-src 'self'` and `script-src 'self'`.
**Prevention:** Avoid inline styles and event handlers. Use external CSS and DOM event listeners. Always implement a strict CSP meta tag in `index.html`.

## 2025-05-16 - [Defensive Whitelisting for Resource Loading]
**Vulnerability:** Potential for arbitrary data injection if level loading logic trust user-provided keys without validation.
**Learning:** Using a hardcoded `switch` statement or an explicit whitelist to map external keys (like `data-level` attributes) to internal data structures prevents attackers from accessing unintended objects or triggering logic with malicious inputs.
**Prevention:** Always use exhaustive whitelisting (e.g., `switch` with `default` case) when resolving external identifiers to internal application state.
