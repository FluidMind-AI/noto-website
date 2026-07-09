# NotoNote Website

Official website for NotoNote - your clarity companion for turning conversations into understanding.

**Live site:** https://notonote.ai

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | [notonote.ai](https://notonote.ai) | Cinematic scroll-driven landing page |
| School Mode | [notonote.ai/school-mode.html](https://notonote.ai/school-mode.html) | School Mode feature story |
| Pricing | [notonote.ai/pricing.html](https://notonote.ai/pricing.html) | Free · Local / Pro · Cloud / Pro+ plans |
| Privacy Policy | [notonote.ai/privacy.html](https://notonote.ai/privacy.html) | Privacy policy |
| Terms of Service | [notonote.ai/terms.html](https://notonote.ai/terms.html) | Terms of service |
| Cookie Policy | [notonote.ai/cookies.html](https://notonote.ai/cookies.html) | Cookie policy |
| Email Confirmed | [notonote.ai/email-confirmed.html](https://notonote.ai/email-confirmed.html) | Post-signup confirmation page |

## Local Development

```bash
# Clone the repo
git clone git@github.com:FluidMind-AI/noto-website.git
cd noto-website

# Open in browser
open index.html
```

## How the scroll scenes work

Home and School Mode tell their story with scroll-pinned scenes. Each scene is a tall
section (`.scene`, 240vh) with a sticky 100vh viewport inside. A rAF-throttled scroll
handler in `script.js` computes a progress value `--p` (0→1) per scene; elements inside
reveal via CSS `clamp()`/`calc()` utilities (`.rv`, `.wipe`, etc.) in `style.css`.
Users with `prefers-reduced-motion` get every scene in its final state.

## Deployment

This site is automatically deployed via GitHub Pages when changes are pushed to `main`.

## Tech Stack

- Static HTML/CSS/JS
- Google Fonts (DM Sans, Poppins, Manrope)
