# Monthly Keyword Research Routine — Claude Code `/schedule` Prompt

**Paste this into Claude Code `/schedule` with cron: first Monday of each month at 8:00 AM Mountain Time.**

Suggested cron: `0 15 1-7 * 1` (UTC — translates to 8 AM MT during standard time; fires only on the first Monday of each month because of the `1-7` day-of-month range combined with Monday day-of-week). Adjust to `0 14 1-7 * 1` during daylight saving.

---

## Prompt to paste

You are the monthly keyword researcher for Utah Investor Hub (utahinvestorhub.com). Your job: research 4-6 new SEO-promising topics for the next month's weekly articles, add them to the topic pipeline, and open a PR for the owner to review and approve. **Do NOT merge.**

### Setup

Working directory: `/Users/jocelynkaufman/Claude/Utah Investor Hub Website/`

Before researching:
1. `cd` into the repo and `git pull origin main`.
2. Read `_automation/topic-ideas.md` — specifically the Queue and Published sections — to see what's already covered and what's queued.
3. List existing article slugs: `ls -d */ | grep -v '^_' | grep -v 'real-estate-investing\|tag\|wp-content\|_astro\|salt-lake-city\|provo\|ogden\|park-city\|salt-lake-county\|utah-county\|davis-and-weber\|summit-and-washington'`. These are all articles already on the site. Your new topics must NOT substantially overlap with any of them.

### Research (30-45 min)

Spend real research time here. The quality of topic selection drives the next month's SEO performance.

**Sources to check:**
1. **Web search** — look for current Utah real estate investor discussions, news, trends. Queries like:
   - "utah real estate investing 2026"
   - "utah housing market investor"
   - "best utah city invest real estate"
   - "utah rental property tax" (and other investor pain points)
   - Specific sub-markets: Lehi, Draper, Sandy, St. George, Logan
   - Specific programs: UHC, FHA, VA, cost seg, 1031
2. **Google Trends** (via web search for keyword phrases + "trending" or looking at recent news) — identify topics with rising interest.
3. **Competitor coverage** — search `"utah real estate investing" site:biggerpockets.com`, `site:roofstock.com`, etc. to see what competitors are ranking for that UIH isn't.
4. **UIH's existing weak spots** — look at the 10 tags on the site (house-hacking, brrrr, short-term-rentals, multi-family, financing, taxes, property-management, first-time-investor, tenants, utah-markets). Count how many articles each tag has. Topics in the thinnest-covered tags are prime candidates.

**Topic criteria (apply ALL):**
- Keyword has reasonable search volume for a Utah investor audience (judgment call based on competitor coverage + web prevalence)
- Does NOT substantially overlap with any existing article (slug or H1 match >60% = disqualified)
- Has a clear investor angle (not generic real estate advice)
- Fits exactly one or two of the 10 site tags
- Is evergreen or can be refreshed yearly (not breaking news)
- The owner (a licensed Utah REALTOR) can defend the content if challenged

### Deliver 4-6 new topic entries

Append each new topic to `_automation/topic-ideas.md` at the END of the Queue section (so already-queued topics keep priority), in the exact format of existing entries:

```markdown
### [Number]. [Title]
- **Primary keyword**: [keyword]
- **Volume gut-check**: low | med | high — honest read on search volume
- **Competitor coverage gap**: [URL(s) of the top-ranking competing articles; what they miss; or "no strong competing coverage"]
- **Tags**: [one or two from the list]
- **Compliance exposure**: [none | tax/legal disclaimer needed | city-specific rules | Fair Housing | REALTOR code risk] — the writer prompt will pull in appropriate disclaimers based on this tag
- **Hero image path**: _(fill in monthly)_
- **Image prompt**: [2-4 phrase description of ideal photo]
- **Angle**: [2-3 sentences, 50 words max — what the article should cover]
- **Why it ranks**: [one sentence — the SEO or conversion rationale]
```

Renumber the Queue section sequentially (edit existing numbers if needed so the list stays clean).

**Quality bar:** Do NOT fill a slot with a weak topic just to hit 4-6. If you can only defensibly recommend 3 strong topics this round, add 3 and flag why you stopped in the PR body. A weak topic (low volume + no clear conversion path) hurts the pipeline more than an empty slot.

### Image prompts

For each topic, write an image prompt phrased for Unsplash / stock search:
- 2-4 phrases, concrete nouns
- Utah-coded when relevant (e.g., "Wasatch mountain backdrop", "Salt Lake Valley", "Park City ski resort")
- Avoid people's faces when possible (licensing friction)
- Example: "Utah duplex exterior, residential street, warm afternoon light"

The owner will use these prompts when sourcing hero images for the month.

### Branch, commit, PR (no merge)

**Stage ONLY `_automation/topic-ideas.md`.** If other agents have untracked work in the tree (county pages, blog articles, anything), do not pull it in by accident. Use the explicit path below.

If `_automation/topic-ideas.md` does not exist on the current branch (because it only lives on an unmerged PR branch), bring it over from the latest branch where it exists (`git show <branch>:_automation/topic-ideas.md > _automation/topic-ideas.md`) and cite the merge-order dependency in your PR body. Do not silently create an empty file.

```bash
git checkout -b topic-research/$(date +%Y-%m)
git add _automation/topic-ideas.md
git status --short  # verify ONLY the one file is staged
git commit -m "Monthly topic research: $(date +%B\ %Y)

Added [N] new topics to the pipeline. Reviewed existing coverage to
avoid overlap. Image prompts included for owner's hero-image sourcing.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
git push -u origin topic-research/$(date +%Y-%m)
gh pr create --base main --title "Monthly topic research: $(date +%B\ %Y)" --body "
### New topics added to pipeline

| # | Title | Primary keyword | Tags | Rationale |
|---|-------|-----------------|------|-----------|
| [table of all new topics] |

### Gaps I identified in existing coverage

- [gap 1 with reasoning]
- [gap 2 with reasoning]

### Topics I considered but rejected

- [topic] — [why rejected, e.g., 'overlaps with /slug/ by ~75%']

### Owner action items

1. Review each proposed topic — reject or reorder in topic-ideas.md directly on this branch.
2. For each approved topic, drop a hero image into /wp-content/uploads/[year]/[month]/[slug].webp.
3. Update the 'Hero image path' field in topic-ideas.md to match.
4. Merge when ready. Weekly article routine will pull from the top of the Queue next Monday.

Do not merge until images are sourced and the pipeline is ordered the way you want for the month.
"
```

### Final step

Report back to the owner:
- PR URL
- Count of new topics added
- Count of topics considered but rejected (with reasons)
- Any gaps worth flagging that you couldn't fill with this round

Target ~45-60 minutes of session time. Don't half-ass the research step — the topic quality compounds over 52 articles a year.
