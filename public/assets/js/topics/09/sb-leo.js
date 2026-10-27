/* Topic 9.5 · Port Gate to Destination — interactive behaviour for this topic's content. */

document.addEventListener('DOMContentLoaded', function () {
  const sections = Array.from(document.querySelectorAll('.scroll-content .sec'));

  sections.slice(0, -1).forEach(function (section) {
    const head = section.querySelector(':scope > .sec-head');
    const body = section.querySelector(':scope > .sec-body');

    if (!head || !body || head.querySelector('.mobile-expand-btn')) return;

    head.style.position = 'relative';
    head.style.paddingRight = '54px';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mobile-expand-btn';
    btn.textContent = '⏶';
    btn.setAttribute('aria-label', 'Collapse section');

    btn.style.position = 'absolute';
    btn.style.top = '8px';
    btn.style.right = '8px';
    btn.style.left = 'auto';

    head.appendChild(btn);

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const collapsed = body.classList.toggle('sec-body-collapsed');
      btn.textContent = collapsed ? '⏷' : '⏶';
      btn.setAttribute(
        'aria-label',
        collapsed ? 'Expand section' : 'Collapse section'
      );
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const faqWrap = document.querySelector('.faq-wrap');
  const faqToggle = document.querySelector('.faq-toggle');

  if (!faqWrap || !faqToggle) return;

  faqToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const collapsed = faqWrap.classList.toggle('faq-collapsed');
    faqToggle.textContent = collapsed ? '⏷' : '⏶';
    faqToggle.setAttribute('aria-expanded', String(!collapsed));
    faqToggle.setAttribute(
      'aria-label',
      collapsed ? 'Expand FAQ' : 'Collapse FAQ'
    );
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const sagarToggle = document.querySelector('.sagar-toggle');
  if (!sagarToggle) return;

  const sagarSection = sagarToggle.closest('.sec');
  if (!sagarSection) return;

  sagarToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const collapsed = sagarSection.classList.toggle('sagar-collapsed');
    sagarToggle.textContent = collapsed ? '⏷' : '⏶';
    sagarToggle.setAttribute('aria-expanded', String(!collapsed));
    sagarToggle.setAttribute(
      'aria-label',
      collapsed ? 'Expand SAGAR SETU and ONOP' : 'Collapse SAGAR SETU and ONOP'
    );
  });
});
