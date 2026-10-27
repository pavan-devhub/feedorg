/* Topic 7.8 · Shipping Bill — interactive behaviour for this topic's content. */

(function () {
  // Section expand / collapse buttons.
  document.querySelectorAll('.sec-div').forEach(function(section) {
    const header = section.querySelector('.sec-head');
    const body = section.querySelector('.sec-body');
    if (!header || !body) return;

    header.classList.add('toggle-header');

    const wrap = document.createElement('div');
    wrap.className = 'sec-head-text';

    while (header.firstChild) {
      wrap.appendChild(header.firstChild);
    }

    header.appendChild(wrap);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'section-toggle';
    button.textContent = '⏶';
    button.setAttribute('aria-label', 'Collapse section');
    header.appendChild(button);

    button.addEventListener('click', function(event) {
      event.stopPropagation();

      const collapsed = body.classList.toggle('section-body-collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute(
        'aria-label',
        collapsed ? 'Expand section' : 'Collapse section'
      );
    });
  });

  // Hero card toggle.
  const heroButton = document.querySelector('.hero-expand');
  const heroBody = document.querySelector('.hero-card .hero-body');

  if (heroButton && heroBody) {
    heroButton.addEventListener('click', function(event) {
      event.stopPropagation();

      const collapsed = heroBody.classList.toggle('card-body-collapsed');
      heroButton.textContent = collapsed ? '⏷' : '⏶';
      heroButton.setAttribute(
        'aria-label',
        collapsed
          ? 'Expand Shipping Bill information'
          : 'Collapse Shipping Bill information'
      );
    });
  }

  // Shipping Bill number card toggle.
  const sbButton = document.querySelector('.sb-expand');
  const sbCard = document.querySelector('.sb-card');

  if (sbButton && sbCard) {
    const children = Array.from(sbCard.children).filter(function(el) {
      return !el.classList.contains('sb-expand');
    });

    sbButton.addEventListener('click', function(event) {
      event.stopPropagation();

      const collapsed = sbCard.classList.toggle('card-body-collapsed');
      children.forEach(function(el) {
        el.style.display = collapsed ? 'none' : '';
      });

      // Keep the circular button visible while collapsed.
      sbButton.style.display = 'flex';
      sbButton.textContent = collapsed ? '⏷' : '⏶';
      sbButton.setAttribute(
        'aria-label',
        collapsed
          ? 'Expand Shipping Bill details'
          : 'Collapse Shipping Bill details'
      );
    });
  }
})();
