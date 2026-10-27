/* Topic 7.5 · PHRT Quality Report — interactive behaviour for this topic's content. */

(function(){
  function addSectionToggle(header, body){
    if(!header || !body || header.querySelector('.mobile-expand-btn')) return;

    header.classList.add('toggle-header');

    const title = header.querySelector('.sec-head-title');
    if(title){
      const wrap = document.createElement('div');
      wrap.className = 'sec-head-title-wrap';
      title.parentNode.insertBefore(wrap, title);
      wrap.appendChild(title);
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mobile-expand-btn';
    btn.textContent = '⏶';
    btn.setAttribute('aria-label','Collapse section');
    header.appendChild(btn);

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      const collapsed = body.classList.toggle('section-body-collapsed');
      btn.textContent = collapsed ? '⏷' : '⏶';
      btn.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  }

  document.querySelectorAll('.sec-div').forEach(function(section){
    const header = section.querySelector('.sec-head');
    const body = section.querySelector('.sec-body');
    if(header && body) addSectionToggle(header, body);
  });

  function wireCardToggle(card, button, contentSelector){
    if(!card || !button) return;
    button.addEventListener('click', function(e){
      e.stopPropagation();
      const collapsed = card.classList.toggle('is-collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  }

  wireCardToggle(
    document.querySelector('.hero-card'),
    document.querySelector('.hero-toggle')
  );

  wireCardToggle(
    document.querySelector('.pass-card'),
    document.querySelector('.pass-toggle')
  );
})();
