# Wedding Website — GitHub Pages

A no-framework, mobile-first wedding invitation with:
- Full-screen background hero
- Wedding itinerary
- Scratch-card surprise using HTML Canvas
- Countdown
- Music button
- Add-to-calendar `.ics`
- Location and RSVP buttons
- No backend required

## 1. Replace the assets

Put these files in `assets/`:
- `hero.jpg` — your main background photo
- `music.mp3` — optional wedding music
- `wedding.ics` — edit the included calendar event

## 2. Edit the content

Open `index.html` and change names, dates, venues, RSVP email and Google Maps link.

Open `script.js` and change `weddingDate`.

## 3. Test locally

You can double-click `index.html` for most features, but for the best test use a local server.

With Python:
`python3 -m http.server 8000`

Then open:
`http://localhost:8000`

## 4. Publish on GitHub Pages

Create a public repository on GitHub Free, upload all files, then:
Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → /(root) → Save.

Your site will appear at:
`https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`

For a user site, name the repository:
`YOUR-USERNAME.github.io`

No build tool, Node.js or database is needed.
