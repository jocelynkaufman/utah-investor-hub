# Utah Investor Hub Website

This repo IS the deployed static site. There is **no Astro source on this machine** — every file is the build output, carried over from the same pattern used in [stoddgroup](https://github.com/jocelynkaufman/stoddgroup). Edits are made directly to the deployed HTML.

Utah Investor Hub is a lead-generation funnel for Stodd Group real estate, focused on Utah real estate investors.

## CSS gotcha — Tailwind classes are purged

The styling was built with Astro + Tailwind v4, and the compiled bundle at `_astro/_slug_.DtdKSYIE5.css` only contains utility classes that were seen by Tailwind at build time.

**This means: adding a Tailwind class to HTML that isn't already in the bundle will silently have no effect.** The class string is in the markup, the browser sees it, but no rule exists for it.

### Two ways to add styling

1. **Inline `style="..."`** — preferred for one-off tweaks and page-specific pieces.
2. **Append to the extensions block** in `_astro/_slug_.*.css` under `/* HAND-EDITED EXTENSIONS */`. Match the existing `calc(var(--spacing) * N)` format.

   Before adding a new class to HTML, check if it exists:
   ```bash
   grep -F ".class-name{" _astro/_slug_.*.css
   ```

### Cache busting on deploy

Bump the CSS filename hash whenever you edit the CSS file so browsers don't serve the old bundle:

```bash
OLD=DtdKSYIE5 NEW=DtdKSYIE6
mv _astro/_slug_.${OLD}.css _astro/_slug_.${NEW}.css
grep -rl "${OLD}" --include="*.html" . | xargs perl -i -pe "s/${OLD}/${NEW}/g"
```

## Site structure

- Each route is a directory with `index.html` (e.g., `contact-us/`, `strategy-call/`, blog post slugs at the repo root).
- Blog posts carry an inline `<style>` block in `<head>` defining `.prose h2`, `.prose p`, etc. The Tailwind Typography plugin classes (`prose`, `prose-lg`) are only scoping markers here.
- Shared chrome (header + footer) is duplicated on every page. Bulk edits:
  ```bash
  grep -rl "Utah Investor Hub Logo" . --include="*.html" > /tmp/files.txt
  while IFS= read -r f; do perl -i -pe 's|OLD|NEW|g' "$f"; done < /tmp/files.txt
  ```

## Lead capture (critical — do not change IDs)

All lead capture runs through HighLevel (GoHighLevel) iframe embeds. Keep these form IDs unchanged or leads stop flowing to the CRM at `app.utahinvestorhub.com`:

| Form ID | Purpose |
|---|---|
| `e97IL85Q1VR6CiuS8tAY` | Newsletter / general lead (home, learn, blog, bio) |
| `5pQwQUuk8qRVJ4drfA4E` | Contact form (`/contact-us/`) |
| `V37XT7vpXs6AcR3EIS0W` | Strategy-call qualification survey |
| `SZCULglvrfSkRBsWea0L` | Reviews widget (display) |

Required loader scripts (include wherever embeds appear): `widgets.leadconnectorhq.com/loader.js`, `link.msgsndr.com/js/form_embed.js`, `app.utahinvestorhub.com/js/form_embed.js`.

## Analytics / verification

- GA4 measurement ID: `G-V024RX3XS7` (ships in every page's `<head>`)
- Google Search Console verification: `DZLhn6VNe6SoeLyg2C_FYcXE18b7v140aR8OEr22mn8`

## Deploy workflow

Iterate locally → push to `staging` → review Vercel preview → merge `staging` to `main` → live at utahinvestorhub.com.

- Repo: `github.com/jocelynkaufman/utah-investor-hub`.
- **Approval gates:** nothing pushed without an explicit OK. Pushing to `staging` needs one approval; merging `staging` into `main` (production) needs a separate approval after the preview is reviewed.
- Same Vercel account that hosts stoddgroup.com. DNS registrar is Hover; the user handles DNS cutover themselves when the site is ready.
- `/idx-wrapper/` is permanently redirected to `/` via `vercel.json` (the IDX page was dropped from the migration).
