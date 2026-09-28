/* EvoVero — tiny interaction layer (no dependencies) */
(function () {
  var nav = document.querySelector('.nav');
  var progress = document.querySelector('.progress');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav + scroll progress
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-stuck', y > 64);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Count-up stats
  var nums = document.querySelectorAll('[data-count]');
  if (!reduce && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.getAttribute('data-count')),
            suffix = el.getAttribute('data-suffix') || '', dec = (target % 1 !== 0) ? 1 : 0,
            start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step); io2.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io2.observe(el); });
  } else {
    nums.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
  }
})();

/* ----------------------------------------------------------------
   Conversion signals. These are the events that make the site
   measurable. They no-op silently until an analytics ID exists, so
   they are safe to ship now and start working the moment it does.

   Added 2026-09-27 as part of the GA4 tracking retrofit (see MN Valley
   Concrete's public/site.js for the pattern this was copied from).
---------------------------------------------------------------- */
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    else if (window.dataLayer) window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  // Phone taps, anywhere on the site.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) track('contact_phone', { method: 'phone', link_url: a.getAttribute('href'), page_path: location.pathname });
  }, true);

  // Form submissions, captured at submit so it fires even if the
  // redirect to the thank-you page is slow or blocked.
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f && f.getAttribute && f.getAttribute('name') === 'contact') {
      track('generate_lead', { form_name: f.getAttribute('name'), page_path: location.pathname });
    }
  }, true);

  // The thank-you page is the confirmed conversion.
  if (location.pathname.indexOf('/thank-you') === 0) {
    track('generate_lead_confirmed', { page_path: location.pathname });
  }
})();
