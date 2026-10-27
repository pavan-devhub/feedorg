/* Topic 7.14 · eBRC Automation — interactive behaviour for this topic's content. */

(function () {
  const sections = Array.from(document.querySelectorAll('.sec-div'));

  sections.forEach(function (section) {
    const header = section.querySelector('.sec-head');
    const body = section.querySelector('.sec-body');

    if (!header || !body) return;

    header.classList.add('toggle-header');

    const textWrap = document.createElement('div');
    textWrap.className = 'sec-head-text';

    while (header.firstChild) {
      textWrap.appendChild(header.firstChild);
    }

    header.appendChild(textWrap);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'section-toggle';
    button.textContent = '⏶';
    button.setAttribute('aria-label', 'Collapse section');

    header.appendChild(button);

    button.addEventListener('click', function (event) {
      event.stopPropagation();

      const collapsed = body.classList.toggle('section-body-collapsed');

      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute(
        'aria-label',
        collapsed ? 'Expand section' : 'Collapse section'
      );
    });
  });
})();

(function () {
  const heroTop = document.querySelector('.hero-top.toggle-target-header');
  const heroBody = document.querySelector('.hero-card .hero-body');
  const heroButton = heroTop ? heroTop.querySelector('.card-toggle') : null;

  if (heroButton && heroBody) {
    heroButton.addEventListener('click', function (event) {
      event.stopPropagation();

      const collapsed = heroBody.classList.toggle('section-body-collapsed');

      heroButton.textContent = collapsed ? '⏷' : '⏶';
      heroButton.setAttribute(
        'aria-label',
        collapsed ? 'Expand eBRC information' : 'Collapse eBRC information'
      );
    });
  }

  const statusBody = document.querySelector('.ebrc-card .ebrc-collapsible');
  const statusButton = document.querySelector(
    '.ebrc-card .ebrc-toggle-row .card-toggle'
  );

  if (statusButton && statusBody) {
    statusButton.addEventListener('click', function (event) {
      event.stopPropagation();

      const collapsed = statusBody.classList.toggle('section-body-collapsed');

      statusButton.textContent = collapsed ? '⏷' : '⏶';
      statusButton.setAttribute(
        'aria-label',
        collapsed ? 'Expand eBRC status' : 'Collapse eBRC status'
      );
    });
  }
})();
