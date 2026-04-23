## 2025-05-15 - Strict CSP and Inline Asset Elimination
**Vulnerability:** Use of inline scripts (`onclick`) and inline styles in `index.html` prevented the implementation of a strict Content Security Policy, leaving the app vulnerable to XSS.
**Learning:** Modern web apps should favor external assets and event listeners to support restrictive security headers. Even simple clones benefit from early adoption of CSP.
**Prevention:** Avoid `onclick` handlers and `<style>` blocks in HTML; use `addEventListener` and external CSS files.
