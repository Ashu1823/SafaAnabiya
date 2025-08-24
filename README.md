# Company Profile - Static Site

This repository contains a Bootstrap-based static website generated from a company profile PDF (included in `assets/COmapny Profile.pdf`). The site is responsive, includes simple animations via Bootstrap components (carousel, scrollspy), and a demo contact form (no backend).

Files of interest
- `index.html` — main site built with Bootstrap 5
- `css/styles.css` — small custom styles and overrides
- `js/script.js` — smooth scrolling and demo contact form handling
- `assets/COmapny Profile.pdf` — original PDF (linked from site)

How to run locally (PowerShell)

Option A — use Python (recommended if installed):
```powershell
# from the project root
python -m http.server 8000; # then open http://localhost:8000
```

Option B — open `index.html` directly in your browser (double-click or use PowerShell):
```powershell
Start-Process -FilePath (Resolve-Path index.html)
```

Notes
- The contact form is demo-only and does not send emails. Implement a server endpoint or use a service (Formspree, Netlify Forms) to enable submissions.
- Images included are placeholders located in `assets/`. Replace with real photography or illustrations as needed.
- The "Download Profile" button links to the provided PDF in `assets/COmapny Profile.pdf`.

Next steps you might want:
- Replace placeholder images with actual ones from the PDF
- Extract exact text from the PDF and replace placeholder copy
- Add meta tags (Open Graph) and favicon

License: MIT
