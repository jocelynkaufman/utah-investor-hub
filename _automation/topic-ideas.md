# Utah Investor Hub — Topic Pipeline

Topics queued for weekly auto-articles. The weekly routine picks the TOP unchecked topic from the Queue, writes the article, previews in chat, and commits on your approval.

**Add/edit topics freely. The weekly routine reads from this file.**

---

## Queue (next to publish, top first)

_Queue is empty. The monthly research routine will add topics on the first Monday of each month. Add topics manually here if you want to seed the queue sooner._

---

## Published (auto-maintained by weekly routine)

_Entries move here after the weekly routine publishes them._

---

## Image queue (user action required)

For each topic, drop a WebP image into `/wp-content/uploads/<year>/<month>/<topic-slug>.webp`, then fill in the "Hero image path" field in the topic entry. If no image is provided, the weekly routine will skip the hero image and use text-only.

---

## Notes for the automation

- Topics at the top are oldest / highest priority. The weekly routine always picks the first unchecked (`- [ ]`) item.
- The weekly routine commits straight to main after your explicit approval in chat and moves the published topic to the Published section.
- Edit, reorder, delete, or add topics freely — the routine respects whatever's in the Queue section when it runs.
- Compliance rules are enforced in the writer prompt regardless of what's in this file.
