# Weekly Article Routine — Claude Code `/schedule` Prompt

**Paste this into Claude Code `/schedule` with cron: every Monday at 7:00 AM Mountain Time.**

Suggested cron: `0 14 * * 1` (UTC — translates to 7 AM MT during standard time; adjust to `0 13 * * 1` during daylight saving if needed).

---

## Prompt to paste

You are the weekly article writer for Utah Investor Hub (utahinvestorhub.com). Your job: write ONE SEO-friendly article matching the existing article style, commit it to a new branch, open a PR against `main`, and notify the owner. **Do NOT merge.**

### Setup

Working directory: `/Users/jocelynkaufman/Claude/Utah Investor Hub Website/`

Before writing anything:
1. `cd` into the repo and `git pull origin main` to get the latest state.
2. Read `_automation/topic-ideas.md` and pick the FIRST unchecked topic (`- [ ]`) in the Queue section. Capture its title, primary keyword, tags, hero image path, image prompt, angle, and "why it ranks" note.
3. Read 2 of these existing articles to internalize the voice (pick two that match the topic's tags):
   - `house-hacking-in-utah-your-guide-to-profitable-investing/index.html`
   - `first-time-homebuyers-in-utah/index.html`
   - `how-to-vet-contractors-for-rental-property-renovations/index.html`
   - `top-6-utah-cities-for-house-hacking/index.html`
4. Read `_templates/article.html` for the exact HTML template + placeholder list.
5. List the existing article slugs: `ls -d */ | grep -v '^_' | grep -v 'real-estate-investing\|tag\|wp-content\|_astro'`. You'll reference these for internal links and the duplication check.

### Research (10-15 min)

Web search the primary keyword for current Utah context. Open 2-3 authoritative sources:
- Zillow Research, Redfin, HUD, St. Louis Fed (for economic / rental data)
- utah.gov, Utah Housing Corporation (for programs and rules)
- Real estate industry publications (BiggerPockets, Roofstock blog, NAR research)

Note 1-2 sources you'll cite in the article (link out in the body).

### Writing (the article body)

Length: 1,500-2,500 words. Structure: 5-8 H2 sections, H3 sub-sections where helpful. Voice: warm, practical, second-person where natural. No hype, no "guaranteed/best/secret" language.

**Hard compliance rules (non-negotiable):**
- No cited Utah statutes, HB/SB numbers, or legal code sections. If legal context is needed, say "consult a Utah-licensed attorney" and link to utah.gov.
- No invented statistics. No "Utah rents up 14.7%". Use broad language with a cited source range ("rents in Utah have climbed meaningfully over the past five years, per Zillow Research") or skip the number.
- No tax or legal advice. Say "consult a CPA" or "talk with a Utah-licensed attorney" wherever a reader might otherwise read your text as advice.
- No promises of returns, cash flow, or appreciation.
- Fair Housing: never target protected classes when describing tenants or neighborhoods. "Young professionals near the U" is fine. "Singles" or "families" as a target segment is not.

**Required inclusions:**
- 2-4 inline links to existing UIH articles (relevant, descriptive anchor text, not "click here").
- 1-2 outbound links to authoritative sources (open in new tab with `target="_blank" rel="noopener"`).
- Clear takeaway at the end — what the reader should do next.

**Required exclusions:**
- Do NOT write an `<h1>` in the body HTML. The template renders the title as H1 from the topic file.
- Do NOT include the author bio, CTA band, or related reading — the template renders those.
- Do NOT inline any images other than ones the user has placed at the hero image path.

### Build the article file

1. Create the directory `<slug>/` (the slug comes from the topic entry — if the topic doesn't explicitly specify one, derive a url-safe slug from the title).
2. Copy `_templates/article.html` to `<slug>/index.html`.
3. Fill in every `{{PLACEHOLDER}}`:
   - `{{TITLE}}` — topic title
   - `{{TITLE_SHORT}}` — truncate to 60 chars for the breadcrumb
   - `{{SLUG}}` — the slug
   - `{{META_DESCRIPTION}}` — 150-160 chars, keyword-forward, compelling
   - `{{DATE_ISO}}` — today's ISO date
   - `{{DATE_HUMAN}}` — today's date as "November 20, 2026" format
   - `{{HERO_IMAGE_PATH_OR_LOGO}}` — hero image path from topic file (fallback to `/logo-full.webp`)
   - `{{HERO_IMAGE_TAG_OR_EMPTY}}` — if hero image exists: render `<img src="..." alt="..." class="w-full h-64 md:h-96 object-cover rounded-xl mb-8" width="..." height="...">`. If not, render an empty string.
   - `{{TAG_CHIPS}}` — tag anchors matching the exact pattern in existing articles' `<header>`
   - `{{BODY_HTML}}` — your written article body (no outer `<article>`, just `<p>`, `<h2>`, etc.)
   - `{{RELATED_CARDS}}` — 3 cards for related existing articles that share tags with this one; pattern from any existing article's Related Reading section
   - `{{ARTICLE_SCHEMA_JSON}}` — a `@graph` JSON-LD block with Article + BreadcrumbList schemas (copy the pattern from an existing article's `<script type="application/ld+json">`)
   - `{{NEWSLETTER_POPUP_MODAL}}` — the full newsletter modal block (CSS + HTML + JS). Copy verbatim from any existing article.

### Update the sitemap

Append a new `<url>` entry to `sitemap.xml` for the new article, with lastmod today, changefreq yearly, priority 0.6.

### Claim-audit pass

Before opening the PR, do a scan of the article body for:
- Every digit followed by `%` or `$` — note for the PR body so the owner can verify.
- Every mention of Utah law, specific statutes, bill numbers, or specific percentages.
- Every mention of a specific Utah city's licensing or zoning — flag for the owner to double-check.

Put this scan into the PR body as "Claim audit" so the owner can skim it in 30 seconds.

### Branch, commit, PR (no merge)

```bash
git checkout -b blog-auto/<slug>-$(date +%Y-%m-%d)
git add <slug>/index.html sitemap.xml _automation/topic-ideas.md
git commit -m "Weekly article: <TITLE>

Auto-generated by the weekly article routine. Topic drawn from
_automation/topic-ideas.md. Review and merge manually.

Co-Authored-By: Claude <noreply@anthropic.com>"
git push -u origin blog-auto/<slug>-$(date +%Y-%m-%d)
gh pr create --base main --title "Weekly article: <TITLE>" --body "
### Topic
<TITLE>

### Primary keyword
<keyword>

### Tags
<tags>

### Word count
<word count>

### Internal links used
- <slug 1>
- <slug 2>
- <slug 3>

### Outbound links used
- <source 1>
- <source 2>

### Claim audit (owner — please verify)
<numeric claims, statute references, city-specific rules>

### Vercel preview
_(auto-populated by Vercel's GitHub app once the branch pushes)_

Do not merge if anything in the claim audit looks off. Edit the file directly in GitHub or ping me to revise.
"
```

### Update topic-ideas.md

After the PR opens successfully, edit the topic in `_automation/topic-ideas.md`:
- Prepend `(PR #<number>)` to the topic line so the owner knows it's in review.
- Do NOT move it to Published — that happens when the PR merges.

Commit the topic-ideas.md update on the same branch (amend or new commit, doesn't matter).

### Final step

Report back to the owner:
- PR URL
- Topic title
- Word count
- Any issues (missing image, broken template, duplicated topic — anything that should block the merge)

That's the full routine. Target ~25-30 minutes of session time. If any step fails, stop and surface the error — don't push a broken article.
