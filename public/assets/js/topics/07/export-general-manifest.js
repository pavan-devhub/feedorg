/* Topic 7.11 · Export General Manifest — interactive behaviour for this topic's content. */

(function () {
  // Add circular expand/collapse buttons to content sections.
  document.querySelectorAll('.sec-div').forEach(function(section) {
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

  // Requested EGM Filing status button at the TOP-RIGHT.
  const egmCard = document.querySelector('.egm-status-card');
  const egmButton = document.querySelector('.egm-expand');

  if (egmCard && egmButton) {
    egmButton.addEventListener('click', function (event) {
      event.stopPropagation();

      const collapsed = egmCard.classList.toggle('egm-card-collapsed');

      egmButton.textContent = collapsed ? '⏷' : '⏶';
      egmButton.setAttribute(
        'aria-label',
        collapsed
          ? 'Expand EGM Filing status'
          : 'Collapse EGM Filing status'
      );
    });
  }
})();
