/**
 * Topic page behaviour (all topic pages).
 *
 * - Renders the program navigator in the sidebar from MyExportsCurriculum.
 * - Tracks completion in localStorage under the same key the home page uses,
 *   so ticks on the program tree and on topic pages stay in sync.
 * - Off-canvas sidebar drawer on tablets and phones, reading progress bar,
 *   back-to-top button and a small confirmation toast.
 *
 * Requires assets/js/data/curriculum.js to be loaded first.
 */
(function () {
  'use strict';

  var curriculum = window.MyExportsCurriculum;
  if (!curriculum) return;

  var body = document.body;
  var root = body.getAttribute('data-root') || '../../';
  var current = curriculum.findByPath(body.getAttribute('data-topic-path') || window.location.pathname);

  /* ------------------------------------------------------------------ */
  /* Progress store                                                       */
  /* ------------------------------------------------------------------ */
  var completed = readProgress();

  function readProgress() {
    try {
      var saved = JSON.parse(localStorage.getItem(curriculum.storageKey) || '[]');
      return new Set(Array.isArray(saved) ? saved.map(String) : []);
    } catch (e) {
      return new Set();
    }
  }

  function writeProgress() {
    try {
      localStorage.setItem(curriculum.storageKey, JSON.stringify(Array.from(completed)));
    } catch (e) {
      /* Storage can be unavailable (private mode); progress is then per-visit. */
    }
  }

  /* ------------------------------------------------------------------ */
  /* Sidebar program navigator                                            */
  /* ------------------------------------------------------------------ */
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function renderToc() {
    var toc = document.getElementById('tp-toc');
    if (!toc) return;

    var html = '';
    var lastPhase = null;
    curriculum.modules.forEach(function (mod) {
      var phase = curriculum.phaseOf(mod);
      if (phase !== lastPhase) {
        html += '<p class="tp-toc__phase" style="--phase-accent:' + phase.accent + '">Phase 0' + phase.id + ' · ' + escapeHtml(phase.title) + '</p>';
        lastPhase = phase;
      }

      var done = mod.topics.filter(function (topic) { return completed.has(topic.id); }).length;
      var isCurrent = current && current.module === mod;
      var classes = 'tp-toc__module' + (isCurrent ? ' is-current' : '') + (done === mod.topics.length ? ' is-complete' : '');

      html += '<details class="' + classes + '"' + (isCurrent ? ' open' : '') + '>' +
        '<summary class="tp-toc__summary">' +
          '<span class="tp-toc__num">' + mod.num + '</span>' +
          '<span class="tp-toc__title">' + escapeHtml(mod.title) + '</span>' +
          '<span class="tp-toc__count" aria-label="' + done + ' of ' + mod.topics.length + ' topics complete">' + done + '/' + mod.topics.length + '</span>' +
          '<span class="tp-toc__chev" aria-hidden="true"></span>' +
        '</summary>' +
        '<ol class="tp-toc__topics">';

      mod.topics.forEach(function (topic) {
        var here = current && topic.id === current.id;
        html += '<li><a class="tp-toc__link' + (completed.has(topic.id) ? ' is-done' : '') + '" href="' + root + topic.path + '"' +
          (here ? ' aria-current="page"' : '') + ' data-topic-id="' + topic.id + '">' +
          '<span class="tp-toc__dot" aria-hidden="true"></span>' +
          '<span class="tp-toc__name">' + escapeHtml(topic.title) + '</span>' +
          '<span class="tp-toc__id">' + topic.id + '</span>' +
          '</a></li>';
      });

      html += '</ol></details>';
    });

    toc.innerHTML = html;
  }

  function renderProgress() {
    var total = curriculum.topics.length;
    var done = curriculum.topics.filter(function (topic) { return completed.has(topic.id); }).length;
    var pct = total ? Math.round((done / total) * 100) : 0;

    var ring = document.querySelector('.tp-ring__value');
    if (ring) {
      var circumference = 2 * Math.PI * Number(ring.getAttribute('r'));
      ring.style.strokeDasharray = String(circumference);
      ring.style.strokeDashoffset = String(circumference * (1 - pct / 100));
    }
    setText('.tp-ring__label', pct + '%');
    setText('.tp-progress-card__meta', done + ' of ' + total + ' topics complete');

    document.querySelectorAll('.tp-steps__item[data-topic-id]').forEach(function (step) {
      step.classList.toggle('is-done', completed.has(step.getAttribute('data-topic-id')));
    });
    document.querySelectorAll('.tp-toc__link[data-topic-id]').forEach(function (link) {
      link.classList.toggle('is-done', completed.has(link.getAttribute('data-topic-id')));
    });

    var button = document.querySelector('.tp-complete');
    if (button && current) {
      var isDone = completed.has(current.id);
      button.setAttribute('aria-pressed', isDone ? 'true' : 'false');
      var label = button.querySelector('.tp-complete__label');
      if (label) label.textContent = isDone ? 'Completed' : 'Mark as complete';
    }
  }

  function setText(selector, text) {
    var el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  /* ------------------------------------------------------------------ */
  /* Completion toggle                                                    */
  /* ------------------------------------------------------------------ */
  function initCompleteButton() {
    var button = document.querySelector('.tp-complete');
    if (!button || !current) return;

    button.addEventListener('click', function () {
      if (completed.has(current.id)) {
        completed.delete(current.id);
        toast('Marked as not complete');
      } else {
        completed.add(current.id);
        toast('Nice work — topic ' + current.id + ' completed');
      }
      writeProgress();
      renderToc();
      renderProgress();
    });

    window.addEventListener('storage', function (event) {
      if (event.key !== curriculum.storageKey) return;
      completed = readProgress();
      renderToc();
      renderProgress();
    });
  }

  var toastTimer = null;
  function toast(message) {
    var el = document.querySelector('.tp-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'tp-toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      body.appendChild(el);
    }
    el.innerHTML = CHECK.replace('<svg ', '<svg width="18" height="18" ') + '<span>' + escapeHtml(message) + '</span>';
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2400);
  }

  /* ------------------------------------------------------------------ */
  /* Drawer (tablet & phone)                                              */
  /* ------------------------------------------------------------------ */
  function initDrawer() {
    var toggle = document.querySelector('.tp-toc-toggle');
    var sidebar = document.getElementById('tp-sidebar');
    var scrim = document.querySelector('.tp-scrim');
    if (!toggle || !sidebar) return;

    var closeButton = sidebar.querySelector('.tp-sidebar__close');
    var desktop = window.matchMedia('(min-width: 1100px)');

    function syncInert() {
      if (desktop.matches) {
        sidebar.removeAttribute('inert');
        sidebar.removeAttribute('aria-modal');
        sidebar.removeAttribute('role');
      } else if (!body.classList.contains('tp-drawer-open')) {
        sidebar.setAttribute('inert', '');
      }
    }

    function open() {
      body.classList.add('tp-drawer-open');
      sidebar.removeAttribute('inert');
      sidebar.setAttribute('role', 'dialog');
      sidebar.setAttribute('aria-modal', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      var currentLink = sidebar.querySelector('[aria-current="page"]');
      if (currentLink) currentLink.scrollIntoView({ block: 'center' });
      (closeButton || sidebar).focus({ preventScroll: true });
    }

    function close(returnFocus) {
      if (!body.classList.contains('tp-drawer-open')) return;
      body.classList.remove('tp-drawer-open');
      sidebar.removeAttribute('role');
      sidebar.removeAttribute('aria-modal');
      toggle.setAttribute('aria-expanded', 'false');
      syncInert();
      if (returnFocus) toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener('click', function () {
      if (body.classList.contains('tp-drawer-open')) close(true);
      else open();
    });
    if (closeButton) closeButton.addEventListener('click', function () { close(true); });
    if (scrim) scrim.addEventListener('click', function () { close(true); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close(true);
    });
    var onChange = function () {
      if (desktop.matches) close(false);
      syncInert();
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else desktop.addListener(onChange);
    syncInert();
  }

  /* ------------------------------------------------------------------ */
  /* Reading progress & back to top                                       */
  /* ------------------------------------------------------------------ */
  function initScrollHelpers() {
    var bar = document.querySelector('.tp-readbar');
    var toTop = document.querySelector('.tp-totop');
    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var y = window.scrollY || doc.scrollTop;
      if (bar) bar.style.setProperty('--tp-read', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
      if (toTop) toTop.classList.toggle('is-visible', y > 700);
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        var main = document.getElementById('tp-main');
        if (main) main.focus({ preventScroll: true });
      });
    }
    update();
  }

  renderToc();
  renderProgress();
  initCompleteButton();
  initDrawer();
  initScrollHelpers();
})();
