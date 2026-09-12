# Sharif Charity Foundation

Public website for the Sharif Charity Foundation, an Islamic charitable foundation based in Kano,
Nigeria. The foundation sponsors orphans, builds mosques and schools, and delivers food and gifts to
families in hardship during Ramadan and Eid.

The site presents the foundation's programs, delivered projects, accountability practices and ways
to give. Donations are currently arranged through direct contact; an online donation flow is not yet
built.

> **This site still contains placeholder content.** Every impact figure, project and biography on it
> was written to fill the layout and is not real. See [Content to replace](#content-to-replace)
> before publishing.

## Tech stack

| Layer         | Choice                                                       |
| ------------- | ------------------------------------------------------------ |
| Framework     | Angular 18.2, standalone components, no NgModules             |
| Language      | TypeScript 5.5 in strict mode                                 |
| Styling       | Tailwind CSS 3.4 over design tokens in `src/styles/_tokens.scss` |
| Routing       | Angular Router, every page lazy loaded via `loadComponent`    |
| i18n          | ngx-translate 16, with an HTTP loader reading `src/assets/i18n` |
| Forms         | Angular Reactive Forms                                        |
| Form delivery | Web3Forms, posted directly from the browser                   |
| Tooling       | Angular CLI, ESLint, Prettier                                 |
| Hosting       | Vercel                                                        |

Fonts are Playfair Display for headings and Inter for body text, loaded from Google Fonts in
`src/index.html`.

## Local development

Requires Node 20 or later. This project was developed on Node 22.

```bash
npm install          # install dependencies
npm start            # dev server on http://localhost:4200
npm run build        # production build into dist/
npm run lint         # ESLint over TypeScript and templates
npm run format       # Prettier write
```

`npm start` runs `ng serve`. The dev server reloads on save.

### Project layout

```
src/
  app/
    core/          services and configuration shared app-wide
      i18n/        translation loader, language list, missing-key handler
      services/    language, SEO metadata, Web3Forms
    layout/        header, footer, and the shell that wraps every page
    pages/         one folder per route
    shared/        reusable presentational components
  assets/i18n/     translation files, one per language
  styles/          design tokens
```

## Configuration

### Web3Forms access key

Both forms on the site, the contact form and the donation-launch signup, post to Web3Forms. The
access key lives in one place:

```
src/app/core/services/web3forms.service.ts  ->  WEB3FORMS_ACCESS_KEY
```

To change it, edit that constant. Nothing else references the key. The same file also holds the
endpoint and the `from_name` that appears on notification emails.

The key is a public, write-only submission token by design, which is why it sits in source rather
than in an environment variable. It identifies the destination inbox and cannot be used to read
submissions. Rotate it from the Web3Forms dashboard if it is ever abused.

Web3Forms rejects requests that do not come from a browser on the free plan, so neither form can be
tested with curl or from a server. Test through a real page.

### Contact details

The phone number, WhatsApp number and email address are translation values, not hardcoded strings:

```
src/assets/i18n/en.json  ->  contact.phone, contact.whatsapp, contact.email, contact.whatsappLink
```

`contact.whatsappLink` holds the full `wa.me` URL and must be updated alongside `contact.whatsapp`
whenever the number changes.

### Adding a language

Add an entry to `SUPPORTED_LANGUAGES` in `src/app/core/i18n/i18n.config.ts` and drop a matching
`<code>.json` beside `en.json`. Right-to-left languages set `dir: 'rtl'` and the document direction
follows automatically. A key missing from a translation file renders a readable fallback rather than
a raw dotted key.

## Deployment

Hosted on Vercel. Import the Git repository in the Vercel dashboard and it will read `vercel.json`
at the repository root:

- **Build command** `ng build --configuration=production`
- **Output directory** `dist/sharif-charity-foundation/browser`
- **Rewrites** every path falls back to `/index.html`, so client-side routes such as `/programs/orphans`
  resolve on a hard refresh

Static files are matched before rewrites, so `robots.txt`, `sitemap.xml` and the favicons are served
directly rather than being swallowed by the fallback.

`framework` is set to `null` so the explicit build command and output directory are authoritative
rather than Vercel's framework preset.

Pushing to the default branch deploys to production. Other branches get preview deployments. No
environment variables are needed.

### Before the first deployment

`src/robots.txt` and `src/sitemap.xml` both use the placeholder domain
`https://sharifcharityfoundation.org`. Replace it with the real host in both files.

## Content to replace

Everything below is placeholder material that must be swapped before the site goes public.

- [ ] **Founder name, photo and bio** — About page. The name renders as the literal `[Founder Name]`
      and the bio is marked as placeholder text. Keys under `about.founder` in `en.json`.
- [ ] **Real project data** — Projects page. All twelve projects, including their descriptions,
      locations, statuses and funding percentages, are invented. Keys under `projects.items`.
- [ ] **Trustees photo** — Transparency page, governance section. Currently a placeholder frame.
- [ ] **Partner logos** — About page. Four grey boxes reading "Partner logo".
- [ ] **Real impact statistics** — Home page impact band and Transparency page impact band. Every
      figure is invented, including the total raised and total disbursed amounts. Fabricated
      financial figures on a transparency page are the most damaging item on this list.
- [ ] **Web3Forms access key** — confirm the key in `web3forms.service.ts` points at the inbox the
      foundation actually monitors.
- [ ] **Bank details for donations** — not yet on the site. The Donate page tells visitors to make
      contact so a person can supply verified details. Decide whether to publish them.
- [ ] **Social media links** — Footer. All four icons currently link to `#`.
- [ ] **Governance and compliance claims** — Transparency page. The descriptions of fund
      segregation, multi-signatory approval, external audit, and the CAC, FIRS and NDPR
      registrations describe practices that must be verified as accurate before publication.
- [ ] **Allocation chart** — Donate page. The forty, thirty, twenty and ten percent split is a
      placeholder, labelled as such on the page.
- [ ] **Annual reports** — Transparency page. Three rows sit in a "coming soon" state with disabled
      download buttons.
- [ ] **Foundation history** — About page. The four story paragraphs each open with the word
      "Placeholder".

## Accessibility

Text colour pairings across the site meet WCAG AA at 4.5:1 or better. The gold brand colour fails as
text, so `gold-on-dark` and `gold-on-light` token variants are used for text while the base gold is
reserved for surfaces. Do not use `text-gold` for readable text.

A keyboard focus ring is defined once globally. Opening the mobile menu moves focus to its close
button and closing it returns focus to the hamburger. Escape closes it. Focus is not trapped inside
the overlay, so tabbing past the last link reaches the browser chrome.
