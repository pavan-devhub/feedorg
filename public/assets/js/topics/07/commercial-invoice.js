/* Topic 7.1 · Commercial Invoice — interactive behaviour for this topic's content. */

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
