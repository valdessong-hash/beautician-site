(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* sticky nav */
  var nav = $('.nav');
  addEventListener('scroll', function () {
    nav.classList.toggle('stuck', scrollY > 30);
  }, { passive: true });

  /* mobile sheet */
  var burger = $('.burger'), sheet = $('.sheet');
  function setSheet(open) {
    burger.setAttribute('aria-expanded', String(open));
    sheet.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setSheet(burger.getAttribute('aria-expanded') !== 'true');
  });
  $$('.sheet a').forEach(function (a) {
    a.addEventListener('click', function () { setSheet(false); });
  });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setSheet(false);
  });

  /* reveal */
  var items = $$('[data-rv],[data-rvs]');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* today's hours */
  var today = new Date().getDay();
  $$('.hrs li').forEach(function (li) {
    if (Number(li.dataset.d) === today) li.classList.add('today');
  });

  /* newsletter — front end only */
  var form = $('.join form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('#em'), msg = $('.msg', form);
      if (!input.value || input.value.indexOf('@') < 0) {
        msg.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      msg.textContent = 'Thank you — connect this form to your mailing list to receive sign-ups.';
      form.reset();
    });
  }

  $$('[data-yr]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
