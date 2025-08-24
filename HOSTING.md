# Hosting guide — SAFA ANABIYA static site

This document explains how to deploy the site to GitHub Pages and configure a custom domain purchased at GoDaddy.

---

## 1) Prepare your repository (local -> GitHub)

1. Create a repository on GitHub (e.g., `your-repo`).
2. From your project folder run (PowerShell):

```powershell
cd C:\Users\Syama\Desktop\Website
# initialize (if not already a git repo)
git init
git add .
git commit -m "Initial site"
# connect and push (replace YOUR_GH_USER and YOUR_REPO)
git branch -M main
git remote add origin https://github.com/YOUR_GH_USER/YOUR_REPO.git
git push -u origin main
```

- If your repo already exists and you already pushed, skip the push steps.

## 2) Add a CNAME (optional but recommended for custom domains)

Create a file named `CNAME` (no extension) in the repository root containing your domain on a single line, for example:

```
example.com
```

Commit and push:

```powershell
echo example.com > CNAME
git add CNAME
git commit -m "Add CNAME for GitHub Pages"
git push
```

## 3) Enable GitHub Pages

1. Go to your repository on GitHub → Settings → Pages.
2. Under **Source** choose `Branch: main` and folder `/ (root)` and click Save.
3. In the **Custom domain** field enter your domain (e.g. `example.com`) and save — GitHub will instruct DNS records.
4. Wait for GitHub to provision TLS (HTTPS). This can take a few minutes to a few hours.

## 4) GoDaddy DNS records (how to point your domain)

Open GoDaddy → My Products → DNS (for your domain) → Manage DNS. Add these records.

- Four A records for the apex (example.com):

| Type | Host | Value           |
|------|------|-----------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

- CNAME for www (so `www.example.com` points to your GitHub Pages site):

| Type  | Host | Value                          |
|-------|------|--------------------------------|
| CNAME | www  | YOUR_GH_USER.github.io         |

Notes:
- Remove conflicting A/CNAME records for `@` or `www` before adding the above.
- TTL default is fine.
- DNS propagation may take minutes to hours.

## 5) Verify GitHub Pages and HTTPS

- After DNS updates, GitHub Pages settings should show your custom domain as verified.
- HTTPS will be issued automatically by GitHub; check the `Enforce HTTPS` option once available.
- Visit `https://example.com` and `https://www.example.com` to confirm.

## 6) Updating the site

Make edits locally → commit → push to `main`. GitHub Pages redeploys automatically.

## 7) Troubleshooting

- If GitHub Pages shows "Waiting for the domain to be verified", double-check DNS records and that no other A/CNAME conflicts exist.
- Use `nslookup example.com` or online DNS checkers to confirm A records point to GitHub's IPs.
- If you prefer `www.example.com` as canonical, you can set a redirect at your registrar or configure Cloudflare to redirect apex to `www`.

## 8) Alternatives (fully free)

- Netlify — drag & drop or connect GitHub; very easy custom domain setup and automatic HTTPS.
- Vercel — good for frontend apps; automatic deployments and HTTPS.
- Cloudflare Pages — fast CDN and excellent DNS integration (change nameservers to Cloudflare).

## 9) Quick summary (copy/paste checklist)

- [ ] Create GitHub repo and push site (branch `main`).
- [ ] Add `CNAME` containing `example.com` and push.
- [ ] Enable Pages (Branch: main, root) in repo settings.
- [ ] Add four A records on GoDaddy for `@` pointing to GitHub IPs.
- [ ] Add a CNAME for `www` to `YOUR_GH_USER.github.io`.
- [ ] Wait for propagation then enable `Enforce HTTPS`.

---

If you want, I can:
- create the GitHub repository and push the code (tell me your GitHub username and desired repository name), or
- produce step-by-step screenshots for GoDaddy DNS UI for your specific domain (tell me the domain name).

