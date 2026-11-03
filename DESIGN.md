# DESIGN.md — Drone WhatsApp Quotation Bot (proposal site)

## Overview
Proposal site for a drone-services operator who posted a hiring ad (r/developerjobs, ~2026-10-31) for a WhatsApp chatbot that generates quotations/invoices from Google Drive templates, auto-numbers invoices, prices flight hours, writes totals to Google Sheets, and improves quotes for repeat clients. The site IS the pitch: a working simulated demo of the exact bot they asked for. Built by Tiyan Digital as a concept proposal — not a live product.

## Psychology brief
- Visitor: drone-services operator, technical buyer, ROI-driven, allergic to vendor fluff.
- Pain: quoting is slow; invoice numbers mistyped; totals re-entered into Sheets; repeat-client pricing is guesswork.
- One action: try the demo, then start a scoping conversation.
- Trust gap: "AI" vendors overpromise; quotes must be EXACT. Deterministic beats clever.
- Emotion: relief + control — quoting handled while they fly.

## Mood (three words)
Cockpit-precise. Warm. Confident.

## Tokens
| token | value |
|---|---|
| --paper | #FAF7F2 (page bg, warm off-white) |
| --ink | #15211B (deep green-black text) |
| --muted | #5F6E64 (secondary text) |
| --line | rgba(21,33,27,.14) (hairlines) |
| --surface | #FFFFFF (cards) |
| --accent | #1C9E4E (CTA + key highlights ONLY) |
| --accent-ink | #FFFFFF |
| --chat-in | #FFFFFF |
| --chat-out | #D8F0E1 (outgoing bubble tint) |
| --phone | #101915 (phone frame) |
| radius | 6px cards / 18px chat bubbles / 999px quick-reply pills |
| selection | #1C9E4E bg, #fff text |

One-voltage rule: #1C9E4E does ALL CTA work. Nothing else chromatic.

## Typography
- Display: "Space Grotesk" 500/700, H1 clamp(44px,7vw,88px), lh 0.95, tracking -0.03em.
- Body: "Inter" 400/500/600, 17px, lh 1.65.
- Mono accent: ui-monospace stack, 12-13px, uppercase labels +0.18em tracking, 60% opacity (invoice numbers, step labels, timestamps).
- Max 2 families + system mono. Contrast: ink on paper 15.4:1; accent #1C9E4E on white 3.9:1 (large/UI only, never body text); white on accent 3.6:1 (button labels ≥18px bold = large text, 3:1 pass).

## Layout idea
Asymmetric split hero: left column headline + sub + CTA; right column a phone frame where the bot conversation auto-plays (the product is the hero). Below: capability marquee (text strip), old-way-vs-bot-way comparison table, 3-step teaser, honesty strip, final CTA. Editorial numbered sections elsewhere. 12-col grid, max 1160px, margins 24px desktop / 18px mobile.

## Signature idea per page
- Home: the chat types itself on load (autoplay script, pauses on reduced-motion with static transcript).
- Demo: full interactive state machine — pick client → hours → extras → quotation card in-chat → confirm → "written to Sheets" ledger row. Replayable.
- How It Works: animated data-flow diagram (WhatsApp → bot → Drive templates → Sheets ledger), CSS/SVG, numbers not screenshots.
- Pricing: anchor-first honest tiers straight from Catalog v3.
- Contact: one form, explicit consent, states exactly what happens to the data.

## Components
- Nav: logo "Tiyan Digital" left; links Demo, How it works, Pricing, Contact; CTA "Start scoping" (accent). Mobile: hamburger → full menu.
- Phone frame: 300×610, dark bezel, WhatsApp-ish header ("QuoteBot · online"), chat area, quick-reply pills.
- Quotation card (in-chat): mono invoice no., line items, total, [Looks good] [Edit] buttons.
- Ledger row: mono row mimicking a Sheets append ("INV-2026-0148 · SkyView Realty · 4.0h · $1,240 → row 212").
- Buttons: primary accent pill (44px+), secondary outline.
- Footer: nav + Privacy + Terms + "Concept proposal by Tiyan Digital — simulated demo, no real messages sent."

## Motion
- Entrance: nav → eyebrow → H1 → sub → CTA → phone, 0.12s stagger, opacity 0→1 + translateY 24px, 0.8s, cubic-bezier(0.16,1,0.3,1). Done by ~1.5s.
- Chat: messages rise in; typing dots 900ms before bot replies.
- Hover ≤1.04 scale, 200ms. No pulsing, no shimmer, no animated backgrounds.
- prefers-reduced-motion: everything static, autoplay replaced by full transcript.

## Copy rules
- Headlines 3–9 words, concrete. Banned: delve, leverage, unlock, game-changer, seamless, cutting-edge, "in today's fast-paced".
- Every page carries the honesty strip: "Concept demo — simulated. No real WhatsApp messages are sent."
- No stats, no testimonials, no invented prices. Pricing = Catalog v3 Workflow Automation tiers only.

## Legal (checklist §3)
- privacy.html + terms.html included. Contact form: explicit consent checkbox, minimal fields (name, email, message), note on data use. No analytics, no cookies → no banner needed.

## Known gaps
- Demo is scripted simulation, not a live bot (stated on-page).
- Exact Reddit thread URL not yet captured (Reddit blocks scraping) — parent to pull via browser before outreach.
- No real client assets; all visuals are CSS/SVG/type.
