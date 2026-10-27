/* Topic 7.3 · Certificate of Origin — interactive behaviour for this topic's content. */

(function(){
  const headers = Array.from(document.querySelectorAll('.sec-div > .sec-head'));
  headers.forEach((header) => {
    const body = header.nextElementSibling;
    if (!body || !body.classList.contains('sec-body')) return;
    header.classList.add('toggle-header');

    const icon = header.querySelector('.sec-head-icon');
    const title = header.querySelector('.sec-head-title');
    const textWrap = document.createElement('div');
    textWrap.className = 'sec-head-text';
    if (icon) textWrap.appendChild(icon);
    if (title) textWrap.appendChild(title);
    header.innerHTML = '';
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
      button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  });
})();
