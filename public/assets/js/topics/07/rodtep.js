/* Topic 7.12 · RoDTEP Calculation — interactive behaviour for this topic's content. */

(function () {
  document.querySelectorAll('.sec-div').forEach(function(section) {
    const header = section.querySelector('.sec-head');
    const body = section.querySelector('.sec-body');
    if (!header || !body) return;

    header.classList.add('toggle-header');

    const wrap = document.createElement('div');
    wrap.className = 'sec-head-text';

    while (header.firstChild) wrap.appendChild(header.firstChild);
    header.appendChild(wrap);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'section-toggle';
    button.textContent = '⏶';
    button.setAttribute('aria-label','Collapse section');
    header.appendChild(button);

    button.addEventListener('click', function(e) {
      e.stopPropagation();
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
  const heroButton = document.querySelector('.hero-expand');
  const heroBody = document.querySelector('.hero-card .hero-body');

  if (heroButton && heroBody) {
    heroButton.addEventListener('click', function (event) {
      event.stopPropagation();

      const collapsed = heroBody.classList.toggle('card-body-collapsed');
      heroButton.textContent = collapsed ? '⏷' : '⏶';
      heroButton.setAttribute(
        'aria-label',
        collapsed
          ? 'Expand RoDTEP information'
          : 'Collapse RoDTEP information'
      );
    });
  }

  const scripButton = document.querySelector('.scrip-expand');
  const scripBody = document.querySelector('.scrip-collapsible');

  if (scripButton && scripBody) {
    scripButton.addEventListener('click', function (event) {
      event.stopPropagation();

      const collapsed = scripBody.classList.toggle('card-body-collapsed');
      scripButton.textContent = collapsed ? '⏷' : '⏶';
      scripButton.setAttribute(
        'aria-label',
        collapsed
          ? 'Expand RoDTEP calculation'
          : 'Collapse RoDTEP calculation'
      );
    });
  }
})();
