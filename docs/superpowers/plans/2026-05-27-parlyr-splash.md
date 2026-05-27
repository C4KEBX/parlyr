# Parlyr Splash Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a static splash page for parlyr.site that drives contact inquiries and communicates Parlyr's AI-powered creative services.

**Architecture:** Single `index.html` with three CSS files (tokens, global, components) and one JS file for GSAP animations. No build step — served directly as static files. Brand tokens are isolated in `tokens.css` so the palette/typography can be swapped in one file when brand assets arrive.

**Tech Stack:** HTML5, CSS3 custom properties, GSAP 3 + ScrollTrigger (CDN), Formspree (form handler), Playwright (visual + a11y testing), Cloudflare Pages (deployment)

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Full page structure — all sections, semantic HTML |
| `assets/css/tokens.css` | All design tokens — colors, type scale, spacing, motion |
| `assets/css/global.css` | CSS reset, base typography, `.btn`, `.container`, `.sr-only` |
| `assets/css/components.css` | Section-specific styles: nav, hero, services, why, contact, footer |
| `assets/js/main.js` | All GSAP animations + nav scroll behavior |
| `assets/images/logo.svg` | Placeholder wordmark — replaced when brand assets arrive |
| `package.json` | Dev dependencies: Playwright + serve |
| `playwright.config.ts` | Playwright config — serves site locally on port 3000 |
| `tests/visual.spec.ts` | Screenshots at 320, 768, 1024, 1440 + CTA interaction |
| `tests/a11y.spec.ts` | axe-core accessibility checks + keyboard navigation |

---

## Task 1: Scaffold project structure

**Files:**
- Create: `assets/css/tokens.css` (empty)
- Create: `assets/css/global.css` (empty)
- Create: `assets/css/components.css` (empty)
- Create: `assets/js/main.js` (empty)
- Create: `assets/images/logo.svg`
- Create: `package.json`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p assets/css assets/js assets/images tests
```

Expected: directories created, no output.

- [ ] **Step 2: Create placeholder logo SVG**

Create `assets/images/logo.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 36" fill="none">
  <text x="0" y="27" font-family="system-ui, -apple-system, sans-serif"
        font-size="26" font-weight="700" letter-spacing="-0.5" fill="white">PARLYR</text>
</svg>
```

- [ ] **Step 3: Create package.json**

```json
{
  "name": "parlyr",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "npx serve . -p 3000 --no-clipboard",
    "test": "playwright test",
    "test:visual": "playwright test tests/visual.spec.ts",
    "test:a11y": "playwright test tests/a11y.spec.ts"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.0",
    "@playwright/test": "^1.50.0",
    "serve": "^14.2.0"
  }
}
```

- [ ] **Step 4: Install dev dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 5: Create empty CSS and JS files**

```bash
touch assets/css/tokens.css assets/css/global.css assets/css/components.css assets/js/main.js
```

- [ ] **Step 6: Commit scaffold**

```bash
git add assets/ package.json package-lock.json
git commit -m "chore: scaffold project structure"
```

---

## Task 2: Design tokens

**Files:**
- Modify: `assets/css/tokens.css`

- [ ] **Step 1: Write design tokens**

Write `assets/css/tokens.css`:

```css
/* ─────────────────────────────────────────────────────────────────
   PARLYR DESIGN TOKENS
   Placeholder values — replace with brand assets when delivered.
   All visual decisions flow through this file.
   ───────────────────────────────────────────────────────────────── */

:root {
  /* ─── Colors ─── */
  --color-bg:             oklch(8% 0 0);
  --color-surface:        oklch(12% 0 0);
  --color-surface-raised: oklch(16% 0 0);
  --color-text:           oklch(95% 0 0);
  --color-text-muted:     oklch(55% 0 0);
  --color-accent:         oklch(68% 0.21 250);
  --color-accent-hover:   oklch(74% 0.21 250);
  --color-border:         oklch(22% 0 0);

  /* ─── Typography — placeholder fonts ─── */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;

  /* ─── Type scale (fluid) ─── */
  --text-sm:   clamp(0.875rem, 0.82rem + 0.28vw, 1rem);
  --text-base: clamp(1rem,     0.92rem + 0.4vw,  1.125rem);
  --text-lg:   clamp(1.125rem, 1rem    + 0.6vw,  1.375rem);
  --text-xl:   clamp(1.5rem,   1.2rem  + 1.5vw,  2rem);
  --text-2xl:  clamp(2rem,     1.5rem  + 2.5vw,  3.5rem);
  --text-hero: clamp(3rem,     1.5rem  + 7.5vw,  8rem);
  --text-why:  clamp(2.5rem,   1rem    + 7vw,    6.5rem);

  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  --leading-tight:   1.1;
  --leading-normal:  1.5;
  --leading-relaxed: 1.7;

  /* ─── Spacing (fluid) ─── */
  --space-xs:      clamp(0.5rem,  0.4rem  + 0.5vw,  0.75rem);
  --space-sm:      clamp(0.75rem, 0.6rem  + 0.7vw,  1rem);
  --space-md:      clamp(1rem,    0.8rem  + 1vw,    1.5rem);
  --space-lg:      clamp(1.5rem,  1.2rem  + 1.5vw,  2.5rem);
  --space-xl:      clamp(2rem,    1.5rem  + 2.5vw,  4rem);
  --space-2xl:     clamp(3rem,    2rem    + 5vw,    7rem);
  --space-section: clamp(5rem,    3rem    + 10vw,   12rem);

  /* ─── Layout ─── */
  --container-max:     1200px;
  --container-padding: clamp(1.25rem, 5vw, 4rem);

  /* ─── Motion ─── */
  --duration-fast:    150ms;
  --duration-normal:  300ms;
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);

  /* ─── Border ─── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

- [ ] **Step 2: Open tokens.css in a browser to verify it has no syntax errors**

Open `index.html` in a browser (it doesn't exist yet, but you can validate the CSS by opening it directly in Chrome DevTools → Sources). Alternatively, proceed to Task 3 and verify then.

- [ ] **Step 3: Commit tokens**

```bash
git add assets/css/tokens.css
git commit -m "feat: add design token layer"
```

---

## Task 3: Global styles

**Files:**
- Modify: `assets/css/global.css`

- [ ] **Step 1: Write global.css**

```css
/* ─── Reset ─── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background-color: var(--color-bg);
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  background: none;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: var(--leading-tight);
  font-weight: var(--weight-bold);
}

/* ─── Layout utilities ─── */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ─── Button ─── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65em 1.5em;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.02em;
  border-radius: var(--radius-md);
  transition:
    background-color var(--duration-normal) var(--ease-out-expo),
    color var(--duration-normal) var(--ease-out-expo),
    transform var(--duration-fast) var(--ease-out-expo);
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.btn--primary:hover {
  background-color: var(--color-accent-hover);
}

.btn--primary:active {
  transform: scale(0.98);
}

.btn--large {
  padding: 0.85em 2em;
  font-size: var(--text-base);
}

/* ─── Focus ─── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* ─── Section label ─── */
.section-label {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xl);
}
```

- [ ] **Step 2: Commit global styles**

```bash
git add assets/css/global.css
git commit -m "feat: add global styles and utility classes"
```

---

## Task 4: HTML structure

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parlyr — AI-Powered Creative Solutions</title>
  <meta name="description" content="Creative solutions for businesses, brands, and agencies ready to move at the speed of AI.">

  <!-- Placeholder fonts — replace with brand typography when assets arrive -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="assets/css/tokens.css">
  <link rel="stylesheet" href="assets/css/global.css">
  <link rel="stylesheet" href="assets/css/components.css">
</head>
<body>

  <!-- Navigation -->
  <header class="nav" id="nav">
    <nav class="nav__inner" aria-label="Main navigation">
      <a href="/" class="nav__logo" aria-label="Parlyr — home">
        <img src="assets/images/logo.svg" alt="Parlyr" width="120" height="32">
      </a>
      <a href="#contact" class="btn btn--primary nav__cta">Get in Touch</a>
    </nav>
  </header>

  <main>

    <!-- Hero -->
    <section class="hero" id="hero" aria-labelledby="hero-heading">
      <div class="hero__content container">
        <h1 class="hero__heading" id="hero-heading">
          <span class="hero__word">Built</span>
          <span class="hero__word">Different.</span>
          <span class="hero__word hero__word--accent">Powered</span>
          <span class="hero__word">by</span>
          <span class="hero__word hero__word--accent">AI.</span>
        </h1>
        <p class="hero__subheading">
          Creative solutions for businesses, brands, and agencies ready to move at the speed of AI.
        </p>
        <a href="#contact" class="btn btn--primary btn--large hero__cta">Get in Touch</a>
      </div>
    </section>

    <!-- What We Do -->
    <section class="services" id="services" aria-labelledby="services-heading">
      <div class="container">
        <h2 class="section-label" id="services-heading">What We Do</h2>
        <div class="services__grid">
          <article class="service-card">
            <h3 class="service-card__title">AI Workflow Automation</h3>
            <p class="service-card__body">Streamline operations through intelligent, connected pipelines that eliminate bottlenecks and scale with your business.</p>
          </article>
          <article class="service-card">
            <h3 class="service-card__title">Multi-agent Systems</h3>
            <p class="service-card__body">Deploy coordinated AI agents that work in parallel to solve complex problems faster than any single system could.</p>
          </article>
          <article class="service-card">
            <h3 class="service-card__title">Consulting</h3>
            <p class="service-card__body">Strategic guidance on integrating AI into your business, brand, or agency — with a clear roadmap from day one.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Why Parlyr -->
    <section class="why" id="why" aria-labelledby="why-heading">
      <div class="container">
        <h2 class="sr-only" id="why-heading">Why Parlyr</h2>
        <div class="why__list">
          <div class="why__item">
            <span class="why__word">Personalized.</span>
            <span class="why__detail">Every engagement is shaped around your specific needs.</span>
          </div>
          <div class="why__item">
            <span class="why__word">Agile.</span>
            <span class="why__detail">We move fast without sacrificing quality.</span>
          </div>
          <div class="why__item">
            <span class="why__word">Affordable.</span>
            <span class="why__detail">Premium output without the agency overhead.</span>
          </div>
          <div class="why__item">
            <span class="why__word">Effective.</span>
            <span class="why__detail">Results-first thinking in everything we build.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact" id="contact" aria-labelledby="contact-heading">
      <div class="container">
        <h2 class="contact__heading" id="contact-heading">Let's build something.</h2>
        <form
          class="contact__form"
          action="https://formspree.io/f/REPLACE_WITH_FORM_ID"
          method="POST"
        >
          <div class="form-field">
            <label for="name" class="form-field__label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-field__input"
              required
              autocomplete="name"
            >
          </div>
          <div class="form-field">
            <label for="email" class="form-field__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-field__input"
              required
              autocomplete="email"
            >
          </div>
          <div class="form-field">
            <label for="message" class="form-field__label">Message</label>
            <textarea
              id="message"
              name="message"
              class="form-field__textarea"
              required
              rows="5"
            ></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--large">Send Message</button>
        </form>
        <p class="contact__email">
          Or reach us directly at
          <a href="mailto:hello@parlyr.site">hello@parlyr.site</a>
        </p>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer__inner">
      <a href="/" class="footer__logo" aria-label="Parlyr — home">
        <img src="assets/images/logo.svg" alt="Parlyr" width="100" height="26">
      </a>
      <p class="footer__copy">© 2026 Parlyr. All rights reserved.</p>
      <div class="footer__social" aria-label="Social links">
        <!-- Social links added when handles are confirmed -->
      </div>
    </div>
  </footer>

  <!-- GSAP via CDN — SRI hashes lock to gsap@3.12.5 exactly -->
  <script
    src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
    integrity="sha384-g4NTh/Iv5PPU4xPyhEWqPcwtNXOvdaDI8LLnyYfyNZOjKJeYQyjzQ9X5275eBjpt"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
    integrity="sha384-Z3REaz79l2IaAZqJsSABtTbhjgOUYyV3p90XNnAPCSHg3EMTz1fouunq9WZRtj3d"
    crossorigin="anonymous"
  ></script>
  <script src="assets/js/main.js"></script>

</body>
</html>
```

- [ ] **Step 2: Open index.html in a browser**

```bash
open index.html
```

Expected: page loads, fonts from Google load, all six sections are present (nav, hero, services, why, contact, footer). No styles yet — that's fine.

- [ ] **Step 3: Commit HTML**

```bash
git add index.html
git commit -m "feat: add full page HTML structure"
```

---

## Task 5: Component styles

**Files:**
- Modify: `assets/css/components.css`

- [ ] **Step 1: Write all component styles**

Write `assets/css/components.css`:

```css
/* ═══════════════════════════════════════════════════════════════
   PARLYR COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── Navigation ─── */

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-block: var(--space-md);
  transition:
    background-color var(--duration-normal) var(--ease-in-out),
    backdrop-filter var(--duration-normal) var(--ease-in-out),
    transform var(--duration-normal) var(--ease-out-expo);
}

.nav.is-scrolled {
  background-color: oklch(8% 0 0 / 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.nav__logo img {
  height: 32px;
  width: auto;
}

/* ─── Hero ─── */

.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: 100px;
}

.hero__content {
  padding-block: var(--space-2xl);
}

.hero__heading {
  font-size: var(--text-hero);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-lg);
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
}

.hero__word {
  display: inline-block;
}

.hero__word--accent {
  color: var(--color-accent);
}

.hero__subheading {
  font-size: var(--text-xl);
  color: var(--color-text-muted);
  max-width: 640px;
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-xl);
}

/* ─── Services ─── */

.services {
  padding-block: var(--space-section);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}

.service-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition:
    border-color var(--duration-normal) var(--ease-out-expo),
    background-color var(--duration-normal) var(--ease-out-expo);
}

.service-card:hover {
  border-color: var(--color-accent);
  background-color: var(--color-surface-raised);
}

.service-card__title {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-sm);
}

.service-card__body {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

/* ─── Why Parlyr ─── */

.why {
  padding-block: var(--space-section);
  border-top: 1px solid var(--color-border);
}

.why__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

.why__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.why__word {
  font-family: var(--font-heading);
  font-size: var(--text-why);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.03em;
  display: block;
}

.why__detail {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  max-width: 520px;
  display: block;
}

/* ─── Contact ─── */

.contact {
  padding-block: var(--space-section);
  border-top: 1px solid var(--color-border);
}

.contact__heading {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-2xl);
}

.contact__form {
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-field__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

.form-field__input,
.form-field__textarea {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  width: 100%;
  transition: border-color var(--duration-normal) var(--ease-out-expo);
}

.form-field__input:focus,
.form-field__textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-field__textarea {
  resize: vertical;
  min-height: 140px;
}

.contact__email {
  margin-top: var(--space-lg);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.contact__email a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ─── Footer ─── */

.footer {
  padding-block: var(--space-xl);
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.footer__logo img {
  height: 26px;
  width: auto;
  opacity: 0.6;
  transition: opacity var(--duration-normal) var(--ease-out-expo);
}

.footer__logo:hover img {
  opacity: 1;
}

.footer__copy {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
```

- [ ] **Step 2: Open index.html in browser and verify layout**

```bash
open index.html
```

Verify:
- Dark background, white text
- Nav fixed at top
- Hero takes full viewport height with large headline
- Three service cards in a row (or stacked on mobile)
- Four "Why Parlyr" items with large typographic treatment
- Contact form visible
- Footer at bottom

- [ ] **Step 3: Check at mobile width**

Open Chrome DevTools → toggle device toolbar → set to 375px width.

Verify: service cards stack vertically, no horizontal overflow, text scales down.

- [ ] **Step 4: Commit component styles**

```bash
git add assets/css/components.css
git commit -m "feat: add component styles for all page sections"
```

---

## Task 6: GSAP animations

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 1: Write main.js**

```javascript
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Nav: solid background on scroll, hide on scroll-down ───
const nav = document.getElementById('nav');

ScrollTrigger.create({
  start: 'top -60px',
  onEnter: () => nav.classList.add('is-scrolled'),
  onLeaveBack: () => nav.classList.remove('is-scrolled'),
});

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 120) {
    nav.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastY = y;
}, { passive: true });

// ─── All motion animations — skip when prefers-reduced-motion ───
if (!prefersReducedMotion) {

  // Hero entrance
  const heroWords = gsap.utils.toArray('.hero__word');

  gsap.set(heroWords, { y: 80, opacity: 0 });
  gsap.set('.hero__subheading', { y: 30, opacity: 0 });
  gsap.set('.hero__cta', { y: 20, opacity: 0 });

  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .to(heroWords, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.07,
    })
    .to('.hero__subheading', {
      y: 0,
      opacity: 1,
      duration: 0.7,
    }, '-=0.5')
    .to('.hero__cta', {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, '-=0.3');

  // Service cards stagger
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services__grid',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // Why Parlyr — each item slides in from left
  gsap.utils.toArray('.why__item').forEach((item) => {
    const word = item.querySelector('.why__word');
    const detail = item.querySelector('.why__detail');

    const trigger = { trigger: item, start: 'top 78%' };

    gsap.from(word, {
      scrollTrigger: trigger,
      x: -70,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from(detail, {
      scrollTrigger: trigger,
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power3.out',
    });
  });

  // Contact section fade-in
  gsap.from(['.contact__heading', '.contact__form', '.contact__email'], {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  });

}
```

- [ ] **Step 2: Open index.html in browser and verify animations**

```bash
open index.html
```

Verify:
- Hero words animate in on load (staggered upward fade)
- Subheading and CTA follow after
- Scroll down to services — cards animate up on entry
- Scroll to Why Parlyr — each word/detail slides in from left
- Scroll to Contact — section fades in
- Scroll back to top — nav hides on scroll down, reappears on scroll up

- [ ] **Step 3: Test prefers-reduced-motion**

In Chrome DevTools → Rendering tab → check "Emulate CSS media feature prefers-reduced-motion: reduce".

Expected: page renders fully visible with no animation, all content immediately visible.

- [ ] **Step 4: Commit animations**

```bash
git add assets/js/main.js
git commit -m "feat: add GSAP scroll animations with reduced-motion support"
```

---

## Task 7: Formspree setup

**Files:**
- Modify: `index.html` (one attribute change)

- [ ] **Step 1: Create a Formspree account and form**

1. Go to https://formspree.io and create a free account using hello@parlyr.site
2. Click "New Form"
3. Name it "Parlyr Contact"
4. Copy the form endpoint ID (format: `xabcdefg`)

- [ ] **Step 2: Replace the placeholder form action in index.html**

Find this line in `index.html`:
```html
action="https://formspree.io/f/REPLACE_WITH_FORM_ID"
```

Replace `REPLACE_WITH_FORM_ID` with your actual form ID, e.g.:
```html
action="https://formspree.io/f/xabcdefg"
```

- [ ] **Step 3: Test the form locally**

Open `index.html` in browser. Fill in the contact form with test data and submit.

Expected: Formspree redirects to a thank-you page (or shows inline success). Check hello@parlyr.site inbox for the test submission.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: wire up Formspree contact form"
```

---

## Task 8: Testing infrastructure

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/visual.spec.ts`
- Create: `tests/a11y.spec.ts`

- [ ] **Step 1: Install Playwright browsers**

```bash
npx playwright install chromium
```

Expected: Chromium downloaded, no errors.

- [ ] **Step 2: Create playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npx serve . -p 3000 --no-clipboard',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

- [ ] **Step 3: Create tests/visual.spec.ts**

```typescript
import { test, expect } from '@playwright/test';

const breakpoints = [
  { width: 320,  height: 812,  name: '320-mobile' },
  { width: 768,  height: 1024, name: '768-tablet' },
  { width: 1024, height: 768,  name: '1024-laptop' },
  { width: 1440, height: 900,  name: '1440-desktop' },
];

for (const bp of breakpoints) {
  test(`renders correctly at ${bp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await page.waitForTimeout(1000); // let GSAP animations settle
    await expect(page).toHaveScreenshot(`hero-${bp.name}.png`);
  });
}

test('hero CTA scrolls to contact section', async ({ page }) => {
  await page.goto('/');
  await page.click('.hero__cta');
  await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });
});

test('nav CTA scrolls to contact section', async ({ page }) => {
  await page.goto('/');
  await page.click('.nav__cta');
  await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });
});

test('contact form fields are present and interactive', async ({ page }) => {
  await page.goto('/');
  await page.locator('#name').fill('Test User');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#message').fill('Hello from Playwright');
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
});
```

- [ ] **Step 4: Create tests/a11y.spec.ts**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('all sections have accessible headings', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero-heading')).toBeVisible();
  await expect(page.locator('#services-heading')).toBeVisible();
  await expect(page.locator('#why-heading')).toBeAttached(); // sr-only, not visible
  await expect(page.locator('#contact-heading')).toBeVisible();
});

test('contact form labels are associated with inputs', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('label[for="name"]')).toBeVisible();
  await expect(page.locator('label[for="email"]')).toBeVisible();
  await expect(page.locator('label[for="message"]')).toBeVisible();
});
```

- [ ] **Step 5: Run visual tests (first run generates baseline screenshots)**

```bash
npm test -- --update-snapshots
```

Expected: screenshots generated in `tests/visual.spec.ts-snapshots/`, all tests PASS.

- [ ] **Step 6: Run accessibility tests**

```bash
npm run test:a11y
```

Expected: all 3 a11y tests PASS with zero violations.

- [ ] **Step 7: Commit tests**

```bash
git add playwright.config.ts tests/ package-lock.json
git commit -m "test: add visual regression and accessibility tests"
```

---

## Task 9: Deploy to Cloudflare Pages

**Files:** No file changes — deployment configuration only.

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create parlyr --public --source . --remote origin --push
```

Expected: repository created at github.com/[your-username]/parlyr, initial commit pushed.

- [ ] **Step 2: Connect to Cloudflare Pages**

1. Log in to dash.cloudflare.com
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Authorize GitHub and select the `parlyr` repository
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

Expected: Cloudflare deploys from the `main` branch. A `.pages.dev` preview URL is provided.

- [ ] **Step 3: Verify the .pages.dev deployment**

Open the `.pages.dev` URL Cloudflare provides.

Verify: page loads over HTTPS, all assets (fonts, logo, GSAP) load correctly, form is visible.

- [ ] **Step 4: Add custom domain parlyr.site**

1. In Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `parlyr.site`
3. Cloudflare detects your DNS is managed there and adds the CNAME automatically
4. Wait for SSL propagation (usually < 5 minutes on Cloudflare DNS)

- [ ] **Step 5: Verify parlyr.site is live**

```bash
curl -I https://parlyr.site
```

Expected:
```
HTTP/2 200
content-type: text/html
```

- [ ] **Step 6: Commit deployment notes**

```bash
git commit --allow-empty -m "chore: deployed to parlyr.site via Cloudflare Pages"
```

---

## Post-Deploy Checklist

- [ ] Open parlyr.site — full visual check across hero, services, why, contact, footer
- [ ] Submit a real contact form — verify email received at hello@parlyr.site
- [ ] Run Lighthouse on parlyr.site (Chrome DevTools → Lighthouse → Desktop)
  - LCP target: < 2.5s
  - CLS target: < 0.1
  - Accessibility score target: 95+
- [ ] Test on mobile (real device or BrowserStack)
- [ ] Verify prefers-reduced-motion on macOS: System Preferences → Accessibility → Display → Reduce motion

---

## Brand Asset Swap (when design delivers)

When logo, colors, and typography arrive:

1. Replace `assets/images/logo.svg` with the delivered logo
2. Open `assets/css/tokens.css` and update:
   - All `--color-*` variables with brand palette
   - `--font-heading` and `--font-body` with brand fonts
   - Replace Google Fonts `<link>` in `index.html` with brand font imports
3. Push to `main` — Cloudflare Pages auto-deploys

No other files need to change.
