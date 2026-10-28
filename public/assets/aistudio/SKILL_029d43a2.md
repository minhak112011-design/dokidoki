---
name: minh-web-studio
description: Design, build, improve, or review polished Vietnamese portfolio and small-business websites for Nhật Minh. Use for responsive landing pages, gift websites, service listings, truthful sales copy, performance, accessibility, and human-sounding UI text.
---

# Minh Web Studio — Website Design & Build Skill

## Purpose

Use this skill when creating or improving a website for Nhật Minh or a similarly small creator-led service. Deliver a complete, usable website, not a static mockup disguised as a finished product. Preserve the existing project's stack unless there's a clear reason to change it.

## Brand and voice

- The site owner is Nhật Minh, a student who likes technology and is building skills through small projects.
- Services may include basic websites, gift websites, small landing pages, frontend fixes, and specific digital/audio utilities when their actual capabilities are confirmed.
- Write in natural Vietnamese with a consistent first-person voice (“tui” can be used when a relaxed, youthful tone fits). Sound direct, kind, and believable.
- `/human` means remove generic AI-like phrasing: no empty hype, canned corporate language, repetitive adjectives, fake humility, keyword stuffing, or endless exclamation marks.
- Keep promises proportional to actual evidence. Say what is offered, what the scope includes, and what needs confirmation.
- Never invent customer testimonials, client logos, completed projects, prices, sales numbers, ratings, guarantees, delivery dates, credentials, donation links, or contact details.

## Visual system

- Default direction: premium dark interface with restrained lavender/purple and cyan accents, generous spacing, readable typography, soft borders, subtle gradients, and purposeful motion.
- Make the result look designed for this owner, not like a generic dashboard template.
- Use a clear hierarchy: one main hero message, concise intro, primary CTA, secondary CTA, then scannable service cards.
- Common sections: hero, services, about, process, showcase/concepts, optional support/donation, FAQ, contact, footer.
- Label all unfinished or illustrative work as “concept”, “demo”, or “minh hoạ”. Never let a concept imply a real customer engagement.
- Prefer CSS/SVG for small decorative art. Use image assets only when they contribute real value and usage rights are understood.

## Responsive behavior

- Work mobile-first and inspect at widths around 320, 375, 768, 1024, and 1440 pixels.
- Avoid horizontal scrolling, cramped buttons, tiny body text, hover-only interactions, and desktop navigation that breaks on phones.
- Provide a working mobile menu with appropriate `aria-expanded` state; close it after navigation.
- Use fluid type and spacing with `clamp()` where appropriate, but avoid extremes that damage readability.
- Make touch targets comfortable and leave sufficient space around clickable items.

## UX and interactions

- Every CTA must have a real purpose and valid destination. Never leave accidental `href="#"`, decorative buttons that do nothing, or fake success alerts.
- Use the provided Facebook URL as the contact path when this project is for Nhật Minh: `https://www.facebook.com/profile.php?id=61594074891915&locale=vi_VN`.
- Don't invent Discord invite URLs, payment QR codes, wallets, phone numbers, or email addresses. Use a clearly marked configuration TODO until the owner provides the real value.
- If no backend exists, prefer a real contact link over a fake form. If a form is requested, implement validation and explain that delivery requires an actual endpoint.
- FAQ accordions and mobile menus must be keyboard-operable and expose their state accessibly.
- Respect `prefers-reduced-motion`; animation must not obstruct content or be required for basic comprehension.

## Truthful service and commerce copy

- Prices should say “báo giá theo yêu cầu” until verified amounts are supplied. Explain the factors that affect price rather than guessing.
- Describe digital tools/hooks only within confirmed functionality, supported versions, and test results. Do not promise that something works everywhere.
- Recommend discussing scope, total price, revisions, and handoff before coding starts.
- Donation/support language must remain voluntary and pressure-free. Never create guilt, urgency, or fake funding progress.
- Only describe services within the project owner's stated scope and capability. Avoid pretending to be a large agency.
- Refuse to help market or implement tools intended to steal accounts/data, bypass security, spam users, or harm others; offer a legitimate, consent-based alternative where appropriate.

## Engineering workflow

1. Inspect the current files and determine the app's framework, entry point, dependencies, and current design conventions.
2. Write a short implementation plan internally, then make the actual code changes.
3. Reuse existing conventions and dependencies. Avoid adding a large library for a small interaction.
4. Separate repeated UI into components when it improves maintainability; don't over-engineer a simple static page.
5. Use semantic HTML, ordered headings, descriptive link text, appropriate labels, keyboard focus styles, and sensible contrast.
6. Provide meaningful document title, meta description, language attribute, and social metadata when relevant.
7. Optimize assets, avoid unnecessary JS, prevent layout shifts, and keep the page usable if external decorative assets fail to load.
8. Run available build, lint, or test commands if appropriate. Inspect for missing assets, broken links, console errors, overflowing elements, and non-working controls.
9. Do not claim a test passed unless it was actually run. Report any unverified assumption clearly.
10. Finish with a concise handoff: what changed, how to run it, what values the owner should replace, and any remaining backend/deployment setup.

## Definition of done

- The core page and all requested sections are implemented.
- Navigation and interactions work on mouse, keyboard, and touch.
- Layout responds cleanly from small phones to large desktops.
- Copy is natural, readable, and honest; no fabricated social proof or details.
- Contact links are real; unsupported links and backend actions are not faked.
- Reduced-motion preferences and accessible control states are handled.
- The project has been tested as far as the available environment permits, with limitations stated honestly.

## Example invocation

“Use the minh-web-studio skill to improve this portfolio. Keep its current stack, make the service cards clearer on mobile, rewrite the Vietnamese copy in a natural `/human` voice, and don't invent pricing or customer reviews. Test the available build and tell me which contact/donate settings still need real values.”
