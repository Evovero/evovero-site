// W100 preview starter: phone menu and soft fade ins. No dependencies.
document.documentElement.classList.add('js');

// Hamburger opens the drop panel under the header; the call bar hides while it is open.
(function () {
  var btn = document.querySelector('.menu-btn'), menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  function set(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  btn.addEventListener('click', function () { set(menu.hidden); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 960) set(false); });
})();

// Each .reveal block fades up as it scrolls into view.
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

// Trial countdown. Counts to data-end (an exact moment), shown in days, hours, minutes and seconds.
// At zero the page grays out under the ended card. ?timer=test shows the ended state right away.
(function () {
  var bar = document.querySelector('.trialbar'), ended = document.querySelector('.trial-ended');
  if (!bar || !ended) return;
  var end = Date.parse(bar.getAttribute('data-end'));
  var test = /[?&]timer=test\b/.test(location.search);
  var cells = {};
  ['d', 'h', 'm', 's'].forEach(function (k) { cells[k] = bar.querySelector('[data-u="' + k + '"]'); });
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function finish() {
    ended.hidden = false;
    document.body.classList.add('is-ended');
    // Nothing behind the card can be clicked, tabbed to or scrolled.
    Array.prototype.forEach.call(document.body.children, function (el) { if (el !== ended && el.tagName !== 'SCRIPT') el.setAttribute('inert', ''); });
    var first = ended.querySelector('a, button'); if (first) first.focus();
    clearInterval(timer);
  }
  function tick() {
    var left = test || isNaN(end) ? 0 : Math.max(0, end - Date.now());
    if (left <= 0) { finish(); return; }
    var s = Math.floor(left / 1000);
    cells.d.textContent = Math.floor(s / 86400);
    cells.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cells.m.textContent = pad(Math.floor(s % 3600 / 60));
    cells.s.textContent = pad(s % 60);
  }
  var timer = setInterval(tick, 1000);
  tick();
})();

// Estimate form: picking Email makes the email field required.
document.querySelectorAll('.qform').forEach(function (f) {
  var box = f.querySelector('.pref-email'), wrap = f.querySelector('.qf-email');
  if (!box || !wrap) return;
  var input = wrap.querySelector('input'), opt = wrap.querySelector('.opt');
  function sync() { input.required = box.checked; wrap.classList.toggle('req', box.checked); opt.textContent = box.checked ? '(required)' : '(optional)'; }
  box.addEventListener('change', sync); sync();
});

/* hero video: load only the file this screen plays */
(function(){var v=document.querySelector("video.hero-video");if(!v)return;
var tall=window.matchMedia("(max-width:960px)").matches;
v.poster=tall?v.dataset.posterTall:v.dataset.posterWide;
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
v.src=tall?v.dataset.tall:v.dataset.wide;v.preload="auto";var p=v.play();if(p&&p.catch)p.catch(function(){});})();
