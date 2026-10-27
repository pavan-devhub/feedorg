/* Topic 7.7 · e-Sanchit Document Upload — interactive behaviour for this topic's content. */

(function () {
  const sections = document.querySelectorAll('.sec-div');

  sections.forEach(function (section) {
    const header = section.querySelector(':scope > .sec-head');
    const body = section.querySelector(':scope > .sec-body');

    if (!header || !body) return;

    header.classList.add('toggle-header');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'section-toggle';
    button.textContent = '⏶';
    button.setAttribute('aria-label', 'Collapse section');
    button.setAttribute('title', 'Collapse section');

    header.appendChild(button);

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const collapsed = body.classList.toggle('section-body-collapsed');

      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute(
        'aria-label',
        collapsed ? 'Expand section' : 'Collapse section'
      );
      button.setAttribute(
        'title',
        collapsed ? 'Expand section' : 'Collapse section'
      );
    });
  });
})();
