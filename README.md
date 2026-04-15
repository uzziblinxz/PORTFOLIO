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

The portfolio now includes a rating and review feature for each project. Visitors can rate projects from 1-5 stars and leave comments. Reviews are sent directly to your WhatsApp using Twilio.

### Setup WhatsApp Notifications

1. **Sign up for Twilio**: Go to [twilio.com](https://www.twilio.com/) and create an account.

2. **Get WhatsApp enabled**: In your Twilio Console, enable WhatsApp Sandbox or upgrade to use WhatsApp Business API.

3. **Get your credentials**:
   - Account SID
   - Auth Token
   - WhatsApp number (from Twilio)

4. **Configure environment variables in Vercel**:
   - Go to your Vercel dashboard for the portfolio project.
   - Navigate to Settings > Environment Variables.
   - Add:
     - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
     - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
   - In `api/submit-review.js`, replace `+YOUR_WHATSAPP_NUMBER` with your actual WhatsApp number (e.g., `+1234567890`).

5. **Update the Twilio number in the code**:
   - In `api/submit-review.js`, replace `'whatsapp:+14155238886'` with your Twilio WhatsApp number if using a different one.

Once set up, when someone submits a review, you'll receive a WhatsApp message with the rating and comment.

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
