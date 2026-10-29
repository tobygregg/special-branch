/* ─────────────────────────────────────────────────────────────
   Special Branch – site scripts (no libraries)
   Header, mobile menu, scroll reveals, services explorer,
   falling leaves, gallery lightbox, quote form.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header: solid backing once the page scrolls ─────────── */
  var header = document.getElementById('site-header');
  var bar = document.getElementById('mobile-bar');
  var hero = document.getElementById('top');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    // Mobile call/quote bar appears once the hero buttons are out of view
    if (bar && hero) bar.dataset.show = y > hero.offsetHeight * 0.55 ? 'true' : 'false';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────────── */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    menu.dataset.open = open ? 'true' : 'false';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.querySelector('.menu-open').classList.toggle('hidden', open);
    menuBtn.querySelector('.menu-close').classList.toggle('hidden', !open);
    if (open) header.classList.add('is-scrolled'); else onScroll();
  }
  menuBtn.addEventListener('click', function () { setMenu(menu.dataset.open !== 'true'); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.dataset.open === 'true') { setMenu(false); menuBtn.focus(); } });
  document.addEventListener('click', function (e) {
    if (menu.dataset.open === 'true' && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });

  /* ── Active nav link while scrolling ─────────────────────── */
  var navLinks = document.querySelectorAll('.nav-link');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'process', 'work', 'about', 'contact'].forEach(function (id) {
      var el = document.getElementById(id); if (el) secObs.observe(el);
    });
  }

  /* ── Scroll reveals + self-drawing lines ─────────────────── */
  var revealEls = document.querySelectorAll('.reveal, .draw');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ── Falling leaves in the hero ──────────────────────────── */
  var leafBox = document.getElementById('leaves');
  if (leafBox && !reduceMotion) {
    var colours = ['#8eb06a', '#b3c991', '#6b904c', '#c9a978', '#a8865a'];
    var count = window.innerWidth < 640 ? 6 : 11;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      var size = 12 + Math.random() * 12;
      var dur = 13 + Math.random() * 10;
      s.className = 'leaf-fall';
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = dur + 's';
      s.style.animationDelay = (-Math.random() * dur) + 's';
      s.style.setProperty('--drift', (40 + Math.random() * 120) * (Math.random() < 0.3 ? -1 : 1) + 'px');
      s.style.color = colours[i % colours.length];
      s.style.opacity = '.9';
      s.innerHTML = '<svg width="' + size + '" height="' + size + '" style="animation-duration:' + (2.5 + Math.random() * 2) + 's"><use href="#leaf"/></svg>';
      leafBox.appendChild(s);
    }
  }

  /* ── Services explorer (tabs on desktop, chips on mobile) ── */
  var svc = document.querySelector('[data-svc]');
  if (svc) {
    var tabs = svc.querySelectorAll('[data-svc-tab]');
    var panels = svc.querySelectorAll('.svc-panel');
    function show(key, focusTab) {
      tabs.forEach(function (t) {
        var on = t.dataset.svcTab === key;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (p) {
        var on = p.id === 'panel-' + key;
        if (on && p.hidden) {
          p.hidden = false;
          p.classList.add('is-in');
          p.classList.remove('is-showing'); void p.offsetWidth; p.classList.add('is-showing');
        } else if (!on) { p.hidden = true; }
      });
      if (focusTab) focusTab.focus();
      // keep the selected chip in view on phones
      var chip = svc.querySelector('.svc-chip[aria-selected="true"]');
      if (chip && chip.parentElement.scrollWidth > chip.parentElement.clientWidth) {
        chip.parentElement.scrollTo({ left: chip.offsetLeft - 16, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { show(t.dataset.svcTab); });
      t.addEventListener('keydown', function (e) {
        var list = Array.prototype.slice.call(t.parentElement.querySelectorAll('[data-svc-tab]'));
        var i = list.indexOf(t), next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = list[(i + 1) % list.length];
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = list[(i - 1 + list.length) % list.length];
        if (e.key === 'Home') next = list[0];
        if (e.key === 'End') next = list[list.length - 1];
        if (next) { e.preventDefault(); show(next.dataset.svcTab, next); }
      });
    });
  }

  /* "Ask about…" buttons pre-select the service in the quote form */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-ask]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!serviceSelect) return;
      var want = btn.getAttribute('data-ask');
      Array.prototype.forEach.call(serviceSelect.options, function (o) { if (o.text === want) serviceSelect.value = o.value || o.text; });
      serviceSelect.classList.remove('is-invalid');
    });
  });

  /* ── Gallery lightbox ────────────────────────────────────── */
  var lb = document.getElementById('lightbox');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] [data-full]'));
  if (lb && tiles.length) {
    var lbImg = lb.querySelector('[data-lb-img]');
    var lbCap = lb.querySelector('[data-lb-caption]');
    var lbCount = lb.querySelector('[data-lb-count]');
    var current = 0, lastFocus = null;
    function render(i) {
      current = (i + tiles.length) % tiles.length;
      var t = tiles[current];
      lbImg.classList.add('is-swapping');
      var img = new Image();
      img.onload = img.onerror = function () {
        lbImg.src = t.dataset.full;
        lbImg.alt = t.querySelector('img').alt;
        lbImg.classList.remove('is-swapping');
      };
      img.src = t.dataset.full;
      lbCap.textContent = t.dataset.caption || '';
      lbCount.textContent = (current + 1) + ' / ' + tiles.length;
    }
    function open(i) {
      lastFocus = document.activeElement;
      render(i);
      lb.dataset.open = 'true';
      document.body.style.overflow = 'hidden';
      lb.querySelector('[data-lb-close]').focus();
    }
    function close() {
      lb.dataset.open = 'false';
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
    lb.querySelector('[data-lb-close]').addEventListener('click', close);
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { render(current - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { render(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.hasAttribute('data-lb-stage')) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.dataset.open !== 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') render(current - 1);
      if (e.key === 'ArrowRight') render(current + 1);
      if (e.key === 'Tab') { // keep focus inside the viewer
        var f = lb.querySelectorAll('button'); var vis = Array.prototype.filter.call(f, function (b) { return b.offsetParent; });
        var first = vis[0], last = vis[vis.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // swipe on touch screens
    var sx = null, sy = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) render(current + (dx < 0 ? 1 : -1));
      sx = sy = null;
    });
  }

  /* ── Quote form: inline validation + sending state ───────── */
  var form = document.getElementById('quote-form');
  if (form) {
    var fields = form.querySelectorAll('.field');
    function check(f) {
      var ok = f.checkValidity() && (f.tagName !== 'TEXTAREA' || f.value.trim().length > 0) && (f.type !== 'text' || f.value.trim().length > 0);
      f.classList.toggle('is-invalid', !ok);
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    }
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.classList.contains('is-invalid')) check(f); });
      f.addEventListener('change', function () { if (f.classList.contains('is-invalid')) check(f); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = form.querySelector('[data-submit]');
      btn.disabled = true;
      btn.querySelector('[data-label]').textContent = 'Sending…';
      var arrow = btn.querySelector('[data-arrow]');
      if (arrow) arrow.outerHTML = '<span class="spinner" aria-hidden="true"></span>';
    });
  }

  /* ── Footer year ─────────────────────────────────────────── */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
