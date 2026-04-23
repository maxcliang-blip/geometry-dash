## 2026-04-18 - Implementing Content Security Policy in Legacy-style HTML
**Vulnerability:** Use of inline event handlers (`onclick`) and inline `<style>` tags prevents the implementation of a strict Content Security Policy (CSP).
**Learning:** Even in modern frameworks, developers often use legacy patterns like `onclick` or global `window` exposure for simplicity, which creates a large attack surface for XSS if a CSP cannot be enforced without `'unsafe-inline'`.
**Prevention:** Always use external stylesheets and programmatically attached event listeners (e.g., `addEventListener`) to ensure compatibility with strict CSPs from the start of development.
