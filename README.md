# Wedding Website — GitHub Pages

Responsive, mobile-first wedding invitation.

## Assets

Put the real files in `assets/` with these exact names:

- `gate-opening.mp4` — opening video
- `music.mp3` — background music
- `hero.jpg` — hero background
- `welcome.jpg` — welcome background
- `gallery-1.jpg` — gallery photo

The opening video is now explicitly styled as a full-screen video, including mobile Safari/iPhone handling.

## Opening flow

1. The opening video fills the screen.
2. When it ends, the video softly blurs/fades.
3. The invitation content is revealed.
4. Music attempts to start after the invitation is opened.

If the video cannot be loaded, the envelope fallback appears instead.

## Scratch card

The scratch card is now dedicated to the wedding date:

**30 June 2026 · 10:30 AM**

Scratch with a finger on mobile or a pointer on desktop.

## Responsive layout

The CSS uses responsive `clamp()`, `svh`, safe-area insets and mobile breakpoints so spacing and typography remain readable on phones and laptops.

## Publish

Upload the project to the GitHub repository and keep the folder structure unchanged.
