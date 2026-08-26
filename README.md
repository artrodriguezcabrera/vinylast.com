# vinylast.com

Contractor site for Vinylast Inc. — Astro static site, Contentful for products/resources, Netlify hosting.

## Local development

```bash
npm install
npm run dev
```

Without Contentful keys, the build uses a local fallback catalog so pages can be reviewed. Product copy currently comes from the WEB DESIGN 2026 workbook (9 sheets). Empty Contentful space = empty catalog states.

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` (never commit `.env`):

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
```

Set the same values in **Netlify → Site configuration → Environment variables**. Content is fetched **only at build time**, not per visitor.

## Contentful model

Create a space, then add the three content types in [contentful/content-model.json](contentful/content-model.json):

| Type ID | Use |
| --- | --- |
| `category` | Product grouping (name, slug, optional image) |
| `product` | Catalog item (slug, copy, images, features, specs, videos, related resources, featured) |
| `resource` | Download or video (type: `install`, `spec`, `warranty`, `catalog`, `video`, `other`) |

Field IDs must match the JSON (`shortDescription`, `relatedResources`, etc.). Specs are one `Label: Value` per line. Videos are one `Title | https://youtube.com/watch?v=...` per line.

Publish entries, then trigger a Netlify rebuild (see webhook below).

## Contentful → Netlify rebuild

1. Netlify → Site configuration → Build & deploy → Build hooks → add a hook (e.g. “Contentful publish”).
2. Contentful → Settings → Webhooks → add that URL for **Entry publish** / **unpublish** (and Asset publish if you want image-only edits to rebuild).

Editors can update products and PDFs in Contentful; the site updates after the build finishes.

## Contact form

The contact page posts to **Netlify Forms** (`name="contact"`). After the first deploy:

1. Confirm the form appears under **Netlify → Forms**.
2. Add a notification: email **customerservice@vinylast.com** on submission.
3. Optional: set the form’s outgoing address if you want replies to go to the office.

Honeypot field: `bot-field`.

## DNS cutover (GitHub Pages → Netlify)

The repo currently has a `CNAME` for GitHub Pages (`vinylast.com`). After Netlify is serving a good preview:

1. Import this GitHub repo in Netlify and confirm the site builds.
2. Netlify → Domain management → add `vinylast.com` and `www.vinylast.com`.
3. At the DNS host, point the apex and `www` to Netlify (Netlify will show the records). Remove GitHub Pages A/CNAME records.
4. You can delete the root `CNAME` file once GitHub Pages is no longer used.

ezpostpocket.com is unchanged.

## Stack

- Astro (static HTML)
- Contentful (products + resources)
- Netlify (hosting + forms)
