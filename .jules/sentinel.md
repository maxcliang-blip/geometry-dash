## 2025-05-14 - Implementation of Strict Content Security Policy
**Vulnerability:** XSS and Clickjacking risks due to lack of CSP, and potential for script injection through inline event handlers and styles.
**Learning:** Modern web apps should avoid inline scripts and styles to allow for a strict CSP. Vite's default dev server behavior might inject inline styles, which can trigger CSP violations during development if not handled carefully. Refactoring from `element.style` to CSS classes is necessary for strict CSP compliance.
**Prevention:** Always use external CSS and JS, use event listeners instead of inline `onclick` attributes, and implement a strict CSP from the start of the project.
