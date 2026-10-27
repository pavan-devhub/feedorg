/* Topic 7.10 · Bill of Lading — interactive behaviour for this topic's content. */

/* mobile-section-toggles */
(function(){
  const headers = Array.from(document.querySelectorAll('.sec-head'));

  headers.forEach((header) => {
    const body = header.nextElementSibling;
    if (!body || !body.classList.contains('sec-body')) return;
    if (header.querySelector('.section-toggle')) return;

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
    button.setAttribute('aria-label','Collapse section');

    header.appendChild(button);

    button.addEventListener('click', function(e){
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
