# PORTFOLIO

Personal portfolio site — static HTML/CSS/JS, deployed via GitHub Pages.

## What this repo contains

- `index.html`, `about.html`, `projects.html`, `contact.html` — site pages
- `styles.css` — main stylesheet
- `main.js` — shared JavaScript
- `.github/workflows/deploy.yml` — GitHub Actions workflow to deploy to Pages

## Preview locally

Open `index.html` in your browser or use the VS Code Live Server extension.

## Deploy to GitHub (automated)

1. Create a repository on GitHub named `PORTFOLIO` (or use this name when pushing).
2. Add remote and push the `main` branch:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/PORTFOLIO.git
git push -u origin main
```

3. The included GitHub Actions workflow will run on push to `main` and publish to GitHub Pages.

Your site will be available at:

```
https://YOUR_USERNAME.github.io/PORTFOLIO/
```

## Rating and Review System

The portfolio now includes a rating and review feature for each project. Visitors can rate projects from 1-5 stars and leave comments. Reviews are sent to your WhatsApp using 360dialog.

### Setup WhatsApp Notifications with 360dialog

1. **Sign up for 360dialog**: Go to [360dialog.com](https://www.360dialog.com/) and create an account.

2. **Connect your WhatsApp Business number**: Follow 360dialog onboarding to link your WhatsApp number.

3. **Get your API token**:
   - In the 360dialog dashboard, copy the API token for the WhatsApp Business API.

4. **Configure environment variables in Vercel**:
   - Go to your Vercel dashboard for the portfolio project.
   - Navigate to Settings > Environment Variables.
   - Add:
     - `WHATSAPP_360DIALOG_TOKEN`: Your 360dialog API token
     - `WHATSAPP_RECIPIENT_NUMBER`: Your personal WhatsApp number, e.g. `+1234567890`

5. **Deploy**:
   - The function in `api/submit-review.js` will use 360dialog to send each review as a WhatsApp message.

Once set up, review submissions from the Projects page will be forwarded directly to your WhatsApp number.

## Notes

- This repo is set up to use a custom domain: **www.ayosportfolio.com**.

- A `CNAME` file has been added to the repo root. To complete DNS configuration:
  1.  At your DNS provider, add a CNAME record for `www` that points to `YOUR_USERNAME.github.io` (replace `YOUR_USERNAME` with your GitHub username).
  2.  If you want the apex domain (`ayosportfolio.com`) to redirect to `www`, add A records pointing to GitHub Pages IPs:
      - `185.199.108.153`
      - `185.199.109.153`
      - `185.199.110.153`
      - `185.199.111.153`

  3.  Wait for DNS to propagate (can take up to 24-48 hours). GitHub Pages will provision HTTPS automatically.

- If you prefer I set a different domain or update DNS instructions for a specific registrar, tell me which provider you use.

- If you prefer a `gh-pages` branch deploy or a different workflow, tell me and I can update the workflow.
