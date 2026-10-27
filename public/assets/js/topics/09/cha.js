/* Topic 9.6 · CHA & Freight Forwarder — interactive behaviour for this topic's content. */

(function(){
  function addSectionToggle(section){
    const header = section.querySelector('.sec-head');
    const body = section.querySelector('.sec-body');
    if(!header || !body || header.querySelector('.mobile-expand-btn')) return;

    header.classList.add('toggle-header');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mobile-expand-btn';
    btn.textContent = '⏶';
    btn.setAttribute('aria-label','Collapse section');
    header.appendChild(btn);

    btn.addEventListener('click', function(){
      const collapsed = body.classList.toggle('section-body-collapsed');
      btn.textContent = collapsed ? '⏷' : '⏶';
      btn.setAttribute(
        'aria-label',
        collapsed ? 'Expand section' : 'Collapse section'
      );
    });
  }

  const sections = Array.from(document.querySelectorAll('.sec'));
  sections.slice(0, -1).forEach(addSectionToggle);

  const hero = document.querySelector('.cha-hero');
  const heroBtn = document.querySelector('.cha-hero-toggle');

  if(hero && heroBtn){
    heroBtn.addEventListener('click', function(){
      const collapsed = hero.classList.toggle('is-collapsed');
      heroBtn.textContent = collapsed ? '⏷' : '⏶';
      heroBtn.setAttribute(
        'aria-label',
        collapsed ? 'Expand section' : 'Collapse section'
      );
    });
  }
})();
