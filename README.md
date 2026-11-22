# Reohob Limited website

The new reohobenergy.com: a Next.js 16 + Tailwind CSS 4 site with seven pages (Home, Products and Services, Projects, Training, Partnership, Management, Contact Us), plus Warranty, Terms, Privacy and a hidden `/styleguide`. It includes a single contact funnel, a partnership form, and training registration with Paystack payments that the server verifies.

- **Content source:** `content/source-inventory.md` holds every piece of text from the old site, where it went, and what was dropped.
- **Design system:** `/styleguide` (not indexed, not in the navigation) and `DESIGN.md`.

---

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local      # then fill in the values you have
npm run build && npm start      # production build on http://localhost:3000
# or: npm run dev               # development server with hot reload
```

To try the forms without SMTP, set `MAIL_DRY_RUN=true` in `.env.local`. Submissions are then printed to the terminal instead of emailed.

> On Linux, if `npm run dev` fails with "OS file watch limit reached", raise the limit (`sudo sysctl fs.inotify.max_user_watches=524288`) or use `npm run build && npm start`.

---

## Edit company facts: `src/config/site.ts`

Every company fact lives in this one file, and every page reads from it. That includes the name, phones, email, address, hours, WhatsApp number, social links, trust figures, the warranty table, call-out fee, check-up fee, payment-plan rate and feature flags. Change a value here and it updates everywhere: footer, contact page, policies, structured data and emails.

- Values the old site contradicted, or never stated, are marked `confirmed: false` with a `TODO` note. While `NEXT_PUBLIC_SHOW_PLACEHOLDER_FLAGS=true`, the site shows a small **"To confirm"** or **"Sample"** tag next to each of them. Once a value is confirmed, set `confirmed: true`.
- Once everything is confirmed, set `NEXT_PUBLIC_SHOW_PLACEHOLDER_FLAGS=false`. This hides the remaining tags, the empty partner-logo slots and the sample banner.
- `flags.RAPISCAN_PARTNERSHIP_CONFIRMED`: set to `true` once the partnership is confirmed as current. To hide Rapiscan completely, set `flags.SHOW_UNCONFIRMED_RAPISCAN` to `false`.

Other content files:

| File | What it holds |
|---|---|
| `src/config/training.ts` | Training packages and **prices** (the only place prices live) |
| `src/config/forms.ts` | Contact-form services and the extra fields each one shows |
| `src/content/services.ts` | Product specs, sizing tiers, EV, security and engineering-service copy |
| `src/content/projects.ts` | Projects. **All six are samples**; replace them, and add photos as `photos: [{ src, alt }]` |
| `src/content/people.ts` | Leadership and board, bios, certifications |
| `src/content/partners.ts` | Partners and partnership types |

Sample projects are labelled on screen, set to `noindex`, and left out of the sitemap. When you replace a project, remove `sample: true` from it so it gets indexed.

## Replace the company profile PDF

Overwrite `public/downloads/reohob-company-profile.pdf` with the real file, keeping the same name, then redeploy. The "Download company profile" buttons on Management link to that path.

Other assets:
- Logo: `public/brand/logo-black.png` and `logo-white.png`.
- Board portraits: `public/team/*.webp`. These are interim crops from the old flyers, so replace them with proper square portraits at 320 px or larger.
- Partner logos: add them to `public/partners/` and reference them in `src/content/partners.ts`.

---

## Environment variables

All variables are listed and explained in `.env.example`. Set them in Vercel under **Project → Settings → Environment Variables**.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, social cards, Paystack return URL (`https://reohobenergy.com`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Sending form emails through the reohobenergy.com mailbox |
| `MAIL_FROM`, `MAIL_TO`, `MAIL_TO_PARTNERSHIPS`, `MAIL_TO_TRAINING` | Sender and recipient addresses (all default to info@reohobenergy.com) |
| `PAYSTACK_SECRET_KEY` | Training payments. Use `sk_test_…` to test and `sk_live_…` to go live. It stays on the server and never reaches the browser. |
| `NEXT_PUBLIC_SHOW_PLACEHOLDER_FLAGS` | Show or hide the "To confirm" and "Sample" tags |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_GA_ID` | Optional analytics. Google Analytics only loads after the visitor accepts the cookie notice; Plausible needs no notice. |
| `NEXT_PUBLIC_CHATBOT_EMBED_URL` | Optional chat widget. If empty, no widget is shown. |

### How training payments work
1. The visitor picks a package and enters their details. The browser sends only the **package id**.
2. `POST /api/training/initialize` looks up the price in `src/config/training.ts` and starts a Paystack transaction for that amount. Paystack's checkout page opens.
3. Paystack sends the visitor back to `/training/confirmation?reference=…`. The server verifies the transaction with Paystack and confirms the registration only if:
   - the status is `success`,
   - the currency is NGN,
   - the amount paid equals the package price.
4. **Webhook:** in the Paystack dashboard, set the webhook URL to `https://reohobenergy.com/api/paystack/webhook`. The webhook checks Paystack's signature, verifies the payment again, then emails the training team and the trainee. If verification fails, the team gets an alert email instead.

---

## Deploy (Vercel)

1. Push this folder to a Git repository and import it in Vercel. The framework is detected automatically.
2. Add the environment variables above for **Production**. Use test keys for **Preview**. Preview deployments block search engines automatically.
3. **Domains:** add `reohobenergy.com` and `www.reohobenergy.com`, then set the apex `reohobenergy.com` as primary so Vercel redirects `www` to it. The app also redirects `www` itself as a fallback (`next.config.ts`).
4. **DNS (important):** change only the web records to the values Vercel shows: the apex A record (`76.76.21.21`) and a `www` CNAME (`cname.vercel-dns.com`). **Leave the MX records, the SPF/TXT records and the `mail` record exactly as they are**, so that `info@reohobenergy.com` keeps working on the current mail host.
5. After launch, submit `https://reohobenergy.com/sitemap.xml` in Google Search Console.

### Redirect plan
Old Laravel URLs redirect permanently (308) to their new homes, so existing links and search results keep working:

| Old | New |
|---|---|
| `/solar-panels`, `/inverters`, `/batteries` | `/products-and-services#power-systems` |
| `/charging-station`, `/modelx/*` | `/products-and-services#ev-charging` |
| `/security-systems` | `/products-and-services#security-screening` |
| `/payment-plan` | `/products-and-services#financing` |
| `/training-program` | `/training` |
| `/reohob-initiative` | `/partnership#initiative` |
| `/about` | `/management` |
| `/get-quote`, `/contact-reohob` | `/contact` |
| `www.reohobenergy.com/*` | `reohobenergy.com/*` |

---

## Project structure

```
src/
  app/                 routes (one folder per page), API routes under app/api
  components/          shared UI: Header, Footer, SunPathChart, forms, etc.
  config/              site.ts (facts), training.ts (prices), forms.ts (contact funnel)
  content/             services, projects, people, partners
  lib/                 mail (SMTP), paystack, validation (zod), seo, solar maths
public/
  brand/ team/ fonts/ downloads/
content/source-inventory.md   text pulled from the old site and where it went
PRODUCT.md, DESIGN.md         product and design records
```

Fonts (Archivo and Public Sans) are self-hosted in `public/fonts` under the SIL Open Font License, so the site makes no Google Fonts requests.
