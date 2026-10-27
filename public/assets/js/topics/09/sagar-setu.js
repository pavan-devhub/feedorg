/* Topic 9.12 · Sagar Setu & ONOP — interactive behaviour for this topic's content. */

(function(){
  function addSectionToggle(sec){
    const head=sec.querySelector('.sec-head');
    const body=sec.querySelector('.sec-body');
    if(!head||!body||head.querySelector('.mobile-expand-btn')) return;
    head.classList.add('toggle-header');
    const btn=document.createElement('button');
    btn.type='button'; btn.className='mobile-expand-btn'; btn.textContent='⏶'; btn.setAttribute('aria-label','Collapse section');
    btn.addEventListener('click',function(){
      const collapsed=body.classList.toggle('section-body-collapsed');
      btn.textContent=collapsed?'⏷':'⏶';
      btn.setAttribute('aria-label',collapsed?'Expand section':'Collapse section');
    });
    head.appendChild(btn);
  }
  document.querySelectorAll('.sec').forEach(addSectionToggle);
  function wire(card,btn,content){
    if(!card||!btn||!content) return;
    btn.addEventListener('click',function(){
      const collapsed=card.classList.toggle('is-collapsed');
      content.style.display=collapsed?'none':'';
      btn.textContent=collapsed?'⏷':'⏶';
      btn.setAttribute('aria-label',collapsed?'Expand section':'Collapse section');
    });
  }
  wire(document.querySelector('.ocean-hero'),document.querySelector('.hero-toggle'),document.querySelector('.ocean-hero .hero-content'));
  wire(document.querySelector('.distinction-box'),document.querySelector('.distinction-toggle'),document.querySelector('.distinction-box .distinction-content'));
})();
