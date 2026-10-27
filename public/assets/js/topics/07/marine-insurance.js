/* Topic 7.6 · Marine Insurance Certificate — interactive behaviour for this topic's content. */

(function(){
  const mainBlocks = Array.from(document.querySelectorAll('[data-main-toggle]'));

  mainBlocks.forEach((block) => {
    const button = block.querySelector('.main-block-toggle');
    if (!button) return;

    let body;
    if (block.dataset.mainToggle === 'hero') {
      body = block.querySelector('.hero-body');
    } else if (block.dataset.mainToggle === 'key-diff') {
      body = block.querySelector('.kd-toggle-body');
    }

    if (!body) return;

    button.addEventListener('click', function(e){
      e.stopPropagation();
      const collapsed = body.classList.toggle('main-block-body-collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  });
})();

(function(){
  const sections = Array.from(document.querySelectorAll('.sec-div'));
  sections.forEach((section) => {
    const head = section.querySelector('.sec-head');
    const body = section.querySelector('.sec-body');
    if (!head || !body) return;

    head.classList.add('toggle-header');

    const title = head.querySelector('.sec-head-title');
    if (title) {
      const wrap = document.createElement('div');
      wrap.className = 'sec-head-title-wrap';
      while (head.firstChild) wrap.appendChild(head.firstChild);
      head.appendChild(wrap);
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'section-toggle';
    button.textContent = '⏶';
    button.setAttribute('aria-label','Collapse section');

    head.appendChild(button);

    button.addEventListener('click', function(e){
      e.stopPropagation();
      const collapsed = body.classList.toggle('section-body-collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  });
})();
