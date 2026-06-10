# Daqeeq — daqeeqgroup.com

Official landing site for Daqeeq: precision discovery for Kuwait.

Static site — no build step. Deployed on Vercel.

- `index.html` — one-page landing site
- `privacy.html` — served at `/privacy` (Vercel clean URLs)
- `terms.html` — served at `/terms`
- `assets/` — styles and scripts
- `vercel.json` — clean URLs, caching, and security headers

## Local preview

```sh
python3 serve.py
```

Serves on http://localhost:4173 with the same clean URLs as Vercel (`/privacy`, `/terms`).
