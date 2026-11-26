/* Utah Investor Hub — conversion tracking.
 * Fires GA4 events for booking-call clicks, Stodd Group clicks, phone clicks,
 * and newsletter modal opens. All events use transport_type: 'beacon' so
 * they fire before cross-origin navigation.
 *
 * CRITICAL: Never modifies the href of any go.stoddgroup.com link — GHL
 * depends on their exact UTM + booking_source params for lead attribution.
 * UTM params are only appended to stoddgroup.com / www.stoddgroup.com links.
 */
(function () {
  if (typeof gtag !== 'function') return;

  var pageSlug = (function () {
    var p = location.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    return p || 'home';
  })();

  // -------- 1. Append UTM params to stoddgroup.com (never go.stoddgroup.com) --------
  try {
    var anchors = document.querySelectorAll('a[href]');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      var url;
      try { url = new URL(a.href, location.href); } catch (e) { continue; }
      if (url.hostname !== 'stoddgroup.com' && url.hostname !== 'www.stoddgroup.com') continue;
      if (url.searchParams.has('utm_source')) continue;
      url.searchParams.set('utm_source', 'utahinvestorhub');
      url.searchParams.set('utm_medium', 'referral');
      url.searchParams.set('utm_campaign', pageSlug);
      a.href = url.toString();
    }
  } catch (e) {}

  // -------- 2. Infer link_location for book_call_click --------
  function inferLinkLocation(anchor) {
    var node = anchor;
    while (node && node !== document.body) {
      if (node.tagName === 'FOOTER') return 'footer';
      var cls = (node.className || '').toString();
      // Author bio container on article pages uses inline background #f8faf8
      if (node.getAttribute && node.getAttribute('style') && node.getAttribute('style').indexOf('background:#f8faf8') !== -1) return 'author_box';
      // Final CTA bands use bg-brand-light-green/30 on most pages
      if (cls.indexOf('bg-brand-light-green/30') !== -1) return 'closing_cta';
      // Hero sections wrap the H1 and sit near the top of <main>
      if (node.tagName === 'SECTION' && node.querySelector && node.querySelector('h1')) return 'hero';
      node = node.parentNode;
    }
    return 'other';
  }

  // -------- 3. Delegated click listener for all 4 event types --------
  document.addEventListener('click', function (evt) {
    var a = evt.target && evt.target.closest ? evt.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var page_path = location.pathname;

    // phone_click (tel: scheme)
    if (href.indexOf('tel:') === 0) {
      gtag('event', 'phone_click', { transport_type: 'beacon', page_path: page_path });
      return;
    }

    var url;
    try { url = new URL(a.href, location.href); } catch (e) { return; }

    // book_call_click — strictly the GHL booking widget host
    if (url.hostname === 'go.stoddgroup.com' && url.pathname.indexOf('/widget/bookings/') === 0) {
      gtag('event', 'book_call_click', {
        transport_type: 'beacon',
        link_location: inferLinkLocation(a),
        page_path: page_path
      });
      return;
    }

    // visit_stoddgroup_click — stoddgroup.com (not go.stoddgroup.com)
    if (url.hostname === 'stoddgroup.com' || url.hostname === 'www.stoddgroup.com') {
      gtag('event', 'visit_stoddgroup_click', {
        transport_type: 'beacon',
        link_url: a.href,
        page_path: page_path
      });
      return;
    }
  }, true);

  // -------- 4. Newsletter modal open observer --------
  var modal = document.getElementById('newsletter-modal');
  if (modal && typeof MutationObserver === 'function') {
    var openedOnce = false;
    var mo = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].attributeName === 'class' && modal.classList.contains('is-open')) {
          if (!openedOnce) {
            openedOnce = true;
            gtag('event', 'newsletter_open', {
              transport_type: 'beacon',
              page_path: location.pathname
            });
          }
          // Reset so a subsequent open (after close) fires again
          setTimeout(function () {
            if (!modal.classList.contains('is-open')) openedOnce = false;
          }, 500);
        }
      }
    });
    mo.observe(modal, { attributes: true, attributeFilter: ['class'] });
  }
})();
