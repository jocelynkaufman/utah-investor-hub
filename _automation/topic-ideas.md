# Utah Investor Hub — Topic Pipeline

Topics queued for weekly auto-articles. The weekly routine picks the TOP unchecked topic from the Queue, writes the article, previews in chat, and commits on your approval.

**Add/edit topics freely. The weekly routine reads from this file.**

---

## Queue (next to publish, top first)

### 3. Utah Security Deposit Law: The 30-Day Rule, Deductions and Penalties for Landlords
- **Primary keyword**: utah security deposit law
- **Volume gut-check**: high
- **Competitor coverage gap**: https://ipropertymanagement.com/laws/utah-security-deposit-returns, https://www.hemlane.com/resources/utah-security-deposit-laws/ (contradict each other on penalties; most miss the 2025 amendment to Utah Code 57-17-3: https://le.utah.gov/xcode/Title57/Chapter17/C57-17-S3_2025050720250507.html)
- **Tags**: tenants, property-management
- **Compliance exposure**: tax/legal
- **Angle**: Landlord-side deposit timeline (30 days, or 15 days after a forwarding address), the itemized deduction notice, normal wear and tear, the 2025 changes (5-business-day response after written demand), and a move-out checklist that heads off small-claims cases.
- **Why it ranks**: Highest-volume topic in this batch, and current competing articles are out of date and contradict each other.

### 4. Utah's 45% Residential Exemption on Rentals: The Declaration Landlords Forget to File
- **Primary keyword**: utah residential exemption rental property
- **Volume gut-check**: low
- **Competitor coverage gap**: https://tax.utah.gov/property/exemptions/primary, https://utahcounty.gov/dept/assess/Data/ResidentialExemptionExplained.pdf (government pages only; nothing from the investor side)
- **Tags**: taxes, property-management
- **Compliance exposure**: tax/legal
- **Angle**: Long-term rentals can qualify for the 45% primary residential exemption if the tenant lives there 183+ days and the owner files a residential declaration; STRs and vacation homes can't. Covers filing in each county and the savings on a typical rental.
- **Why it ranks**: Low competition and high value to readers; many landlords miss this, and it showcases local authority.

### 5. Renting an ADU in Utah: Owner-Occupancy Rules, Permits and the 30-Day Minimum
- **Primary keyword**: utah adu rental rules
- **Volume gut-check**: med
- **Competitor coverage gap**: https://le.utah.gov/xcode/Title10/Chapter21/C10-21-S303_2025110620251206.html (statute text, renumbered from 10-9a-530 in Nov 2025), https://commerce.utah.gov/?p=32391 (brief summary); existing house-hacking posts never cover the owner-occupancy rule
- **Tags**: house-hacking, utah-markets
- **Compliance exposure**: city rules
- **Angle**: What state law makes a permitted use, what cities can still restrict (owner occupancy, rentals under 30 days, separate meters, recorded notices), how HOA limits interact, and a city-by-city "check before you buy" list for house hackers.
- **Why it ranks**: Most sources still cite the old code section, so an updated plain-English guide can win the term.

### 6. Salt Lake City Short-Term Rental Rules: The 2026 License, 200-Night Cap and What Investors Need to Know
- **Primary keyword**: salt lake city short term rental rules
- **Volume gut-check**: med
- **Competitor coverage gap**: https://www.axios.com/local/salt-lake-city/2026/07/01/short-term-rental-regulations-utah-limit, https://www.ksl.com/article/51512655/salt-lake-city-to-begin-requiring-business-licenses-for-short-term-rentals, https://www.sltrib.com/news/2026/08/14/airbnb-vs-salt-lake-city-short/, https://www.avalara.com/mylodgetax/en/blog/2026/07/what-to-know-about-new-Salt-Lake-City-Airbnb-laws-and-short-term-rental-regulations.html (news and tax-vendor coverage; no buyer-side guide; Millcreek and unincorporated Salt Lake County uncovered)
- **Tags**: short-term-rentals, utah-markets
- **Compliance exposure**: city rules
- **Angle**: The July 1, 2026 ordinance (license before listing, 2-night minimum, 200-night cap, 10% cap in 10+ unit buildings, off-street parking), 200-night STR vs. 30-day-plus rental math, Millcreek's owner-occupancy contrast, and a pre-offer checklist. Writer must check https://www.slc.gov/Finance/short-term-rentals/ for current status (applications were paused; council studying amendments) and frame it as "how to check," not settled rules.
- **Why it ranks**: The ordinance is new, nobody has written the investor version yet, and it links naturally from the Salt Lake City page.

---

## Published (auto-maintained by weekly routine)

_Entries move here after the weekly routine publishes them._

- [x] 2026-11-19 - DSCR Loans in Utah: How to Qualify on Rental Income Instead of W-2s
- [x] 2026-11-19 - BRRRR in Utah: Does the Strategy Still Work With Today's Prices and Rates?

---

## Image queue (user action required)

For each topic, drop a WebP image into `/wp-content/uploads/<year>/<month>/<topic-slug>.webp`, then fill in the "Hero image path" field in the topic entry. If no image is provided, the weekly routine will skip the hero image and use text-only.

---

## Notes for the automation

- Topics at the top are oldest / highest priority. The weekly routine always picks the first unchecked (`- [ ]`) item.
- The weekly routine commits straight to main after your explicit approval in chat and moves the published topic to the Published section.
- Edit, reorder, delete, or add topics freely — the routine respects whatever's in the Queue section when it runs.
- Compliance rules are enforced in the writer prompt regardless of what's in this file.
