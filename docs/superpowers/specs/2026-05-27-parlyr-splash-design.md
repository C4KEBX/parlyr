# Parlyr Splash Page — Design Spec
**Date:** 2026-05-27
**Project:** parlyr.site
**Status:** Approved

---

## Overview

A splash page for Parlyr — an AI-powered creative solutions company serving businesses, brands, and agencies. The page establishes credibility, communicates the core offering, and drives visitors toward a contact conversation.

This is a temporary static implementation. The production site will be rebuilt as a full interactive experience with a proper framework.

---

## Goals

- **Primary:** Drive contact inquiries ("Get in Touch")
- **Secondary:** Communicate what Parlyr does and why it's differentiated
- **Not in scope:** Waitlist capture, white paper download, consultation booking

---

## Audience

Mixed — business owners/founders, marketing and creative directors at brands, and other agencies seeking white-label or referral relationships. Copy must be broad enough to speak to all three without being generic.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Markup | HTML5 | No build step, fast iteration |
| Styles | CSS3 + custom properties | Design tokens isolated for easy brand swap-in |
| Animation | GSAP + ScrollTrigger (CDN) | Framework-agnostic, ports to React/Next.js later |
| Form handler | Formspree | Free tier, no backend, responses to email |
| Deployment | Cloudflare Pages | Free, commercial use OK, unlimited bandwidth, fast CDN |
| DNS | Cloudflare | Domain: parlyr.site |

---

## File Structure

```
parlyr/
├── index.html
├── assets/
│   ├── css/
│   │   ├── tokens.css        # design tokens — swap when brand assets arrive
│   │   ├── global.css        # resets, base styles
│   │   └── components.css    # section-specific styles
│   ├── js/
│   │   └── main.js           # GSAP animations + nav scroll behavior
│   └── images/
│       └── logo.svg          # placeholder until brand assets arrive
└── docs/
    └── superpowers/
        └── specs/
```

All brand tokens (colors, typography, spacing) live exclusively in `tokens.css`. When the palette, fonts, and logo arrive, one file update propagates across the entire site.

---

## Page Sections

### 1. Navigation
- Logo (left), "Get in Touch" CTA link (right)
- Transparent over hero, solid on scroll
- Fades in on scroll-down, hides on scroll-up

### 2. Hero
- Full-viewport height
- Bold headline: e.g. *"Built Different. Powered by AI."*
- Subheadline (one sentence): *"Creative solutions for businesses, brands, and agencies ready to move at the speed of AI."*
- Primary CTA button: *"Get in Touch"* — scrolls to contact section
- Entrance animation: headline words stagger in on load, subheadline and CTA fade up after

### 3. What We Do
- Three service pillars in a horizontal card layout
- Each card: title + 1–2 sentence description
  1. **AI Workflow Automation** — streamline operations through intelligent, connected pipelines
  2. **Multi-agent Systems** — deploy coordinated AI agents that work in parallel to solve complex problems
  3. **Consulting** — strategic guidance on integrating AI into your business, brand, or agency
- Animation: cards stagger up and fade in as section enters viewport

### 4. Why Parlyr
- Editorial typographic section — large, high-contrast text, not a feature grid
- Four differentiators treated as bold typographic moments:
  - **Personalized** — every engagement is shaped around your specific needs
  - **Agile** — we move fast without sacrificing quality
  - **Affordable** — premium output without the agency overhead
  - **Effective** — results-first thinking in everything we build
- Animation: lines reveal left-to-right as user scrolls through the section

### 5. Contact
- Section headline: *"Let's build something."*
- Minimal form: Name, Email, Message
- Submit via Formspree (endpoint configured at build time)
- Email address displayed as plain-text fallback
- CTA button: *"Send Message"*
- Animation: clean fade-in on section enter

### 6. Footer
- Logo (left)
- Copyright: © 2026 Parlyr. All rights reserved.
- Social links (right) — placeholders until handles confirmed

---

## Animation Strategy

All animations use GSAP + ScrollTrigger. Motion respects `prefers-reduced-motion` — animations skip or simplify for users with that system preference set.

| Section | Animation |
|---|---|
| Hero | Words stagger in on load; subheadline and CTA fade up after |
| Nav | Fade in on scroll-down; hide on scroll-up |
| What We Do | Cards stagger up + fade in on viewport entry |
| Why Parlyr | Lines reveal left-to-right on scroll |
| Contact | Fade in on viewport entry |

---

## Brand Asset Integration

Brand assets are pending from a parallel design workstream. The site is built to receive:

- **Logo / wordmark** → `assets/images/logo.svg`
- **Color palette** → CSS custom properties in `tokens.css`
- **Typography** → font imports + CSS custom properties in `tokens.css`
- **Visual mockup** → used as reference for layout refinement post-delivery

No visual decisions are hardcoded. All swap through `tokens.css`.

---

## Deployment

1. Push repo to GitHub
2. Connect to Cloudflare Pages (auto-deploy on push to `main`)
3. Add custom domain: `parlyr.site`
4. Cloudflare handles SSL automatically

---

## Out of Scope (This Phase)

- Waitlist / email capture
- White paper download
- Consultation booking
- Blog or case studies
- Full site navigation (this is a single-page splash)
- CMS integration
