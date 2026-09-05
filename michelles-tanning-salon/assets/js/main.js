/* ============================================================
   Michelle's Tanning Lounge — interactions
   Vanilla JS, no dependencies. All motion respects
   prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Sticky header + scroll progress ---------- */
  var header = $('.header');
  var progress = $('.progress');
  var dock = $('.dock');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 24);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
    if (dock) dock.classList.toggle('is-visible', y > 420);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var burger = $('.burger');
  var drawer = $('.drawer');
  if (burger && drawer) {
    var toggle = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        $$('.drawer__link', drawer).forEach(function (l, i) {
          l.style.animationDelay = (0.08 + i * 0.06) + 's';
        });
      }
    };
    burger.addEventListener('click', function () {
      toggle(burger.getAttribute('aria-expanded') !== 'true');
    });
    $$('.drawer a').forEach(function (a) {
      a.addEventListener('click', function () { toggle(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) toggle(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = $$('[data-reveal],[data-stagger]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = $$('[data-count]');
  if (counters.length) {
    var run = function (el) {
      var target = parseFloat(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = target + suffix; return; }
      var start = performance.now();
      var dur = 1500;
      var tick = function (now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = (target % 1 ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          run(e.target);
          cio.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { cio.observe(c); });
    } else {
      counters.forEach(run);
    }
  }

  /* ---------- Cursor glow on cards ---------- */
  if (!reduced && window.matchMedia('(hover:hover)').matches) {
    $$('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Parallax hero glows ---------- */
  var glows = $$('.hero__glow');
  if (glows.length && !reduced) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        glows.forEach(function (g, i) {
          g.style.translate = '0 ' + (y * (0.06 + i * 0.045)).toFixed(1) + 'px';
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Testimonial slider ---------- */
  var slider = $('.quotes');
  if (slider) {
    var track = $('.quotes__track', slider);
    var slides = $$('.quote', track);
    var dots = $('.quotes__dots', slider);
    var index = 0;
    var timer;

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Review ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dots.appendChild(b);
    });

    function go(i, manual) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      $$('button', dots).forEach(function (d, di) {
        d.setAttribute('aria-selected', String(di === index));
      });
      if (manual) restart();
    }
    function restart() {
      clearInterval(timer);
      if (!reduced) timer = setInterval(function () { go(index + 1); }, 6000);
    }
    go(0);
    restart();

    /* swipe */
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true);
      x0 = null;
    }, { passive: true });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faq = $('.faq');
  if (faq) {
    $$('details', faq).forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        $$('details', faq).forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  /* ---------- Highlight today's opening hours ---------- */
  $$('.hours').forEach(function (list) {
    var today = new Date().getDay(); /* 0 = Sun */
    $$('li', list).forEach(function (li) {
      var days = (li.dataset.days || '').split(',').map(Number);
      if (days.indexOf(today) > -1) li.classList.add('is-today');
    });
  });

  /* ---------- Booking form (front-end only) ---------- */
  var form = $('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = $('.form__ok', form.parentNode) || document.createElement('p');
      ok.className = 'form__ok';
      ok.setAttribute('role', 'status');
      ok.textContent = 'Thanks! Your request has been noted. Connect this form to a booking system or email inbox to receive it — see README.';
      form.after(ok);
      form.reset();
    });
  }

  /* ---------- Set year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
