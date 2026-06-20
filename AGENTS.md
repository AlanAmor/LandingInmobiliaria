# InmoLan Landing Page

## Project Shape
- Static landing page in Spanish.
- No build system, package manager, or external dependencies.
- Main files: `index.html`, `styles.css`, `script.js`, and `img/`.

## Editing Rules
- Keep code feeling hand-written: prefer small, direct changes over abstractions or generic scaffolding.
- Preserve the existing tone and structure unless a change clearly needs a refactor.
- Keep UI copy, ARIA labels, and validation messages in Spanish.
- Do not add frameworks, CDNs, remote fonts, or APIs unless the CSP is updated at the same time.

## File Responsibilities
- `index.html`: semantic layout, section structure, accessibility, and asset references.
- `styles.css`: all visual design, spacing, responsiveness, and theme variables.
- `script.js`: carousel behavior and client-side form validation.
- `img/`: carousel assets; keep filenames in sync with `script.js`.

## Known Constraints
- The site uses a restrictive self-only CSP, so external resources will be blocked.
- The carousel state is local to `script.js`; update the slide list and logic together.
- The contact form is client-side only; there is no backend submission flow.

## Validation
- Open `index.html` in the browser after changes.
- Check the carousel navigation, autoplay, and form feedback after touching `script.js`.
- Check responsive layout after touching `styles.css`.