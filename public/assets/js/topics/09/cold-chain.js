/* Topic 9.10 · Cold Chain Break Protocol — interactive behaviour for this topic's content. */

(function(){
  function addSectionToggle(section){
    const header=section.querySelector('.sec-head');
    const body=section.querySelector('.sec-body');
    if(!header||!body||header.querySelector('.mobile-expand-btn')) return;
    header.classList.add('toggle-header');
    const btn=document.createElement('button');btn.type='button';btn.className='mobile-expand-btn';btn.textContent='⏶';btn.setAttribute('aria-label','Collapse section');header.appendChild(btn);
    btn.addEventListener('click',function(e){e.stopPropagation();const collapsed=body.classList.toggle('section-body-collapsed');btn.textContent=collapsed?'⏷':'⏶';btn.setAttribute('aria-label',collapsed?'Expand section':'Collapse section');});
  }
  document.querySelectorAll('.sec').forEach(addSectionToggle);
  function addContentToggle(button, content){
    if(!button||!content) return;
    button.addEventListener('click',function(e){
      e.stopPropagation();
      const collapsed=content.classList.toggle('collapsible-content-collapsed');
      button.textContent=collapsed?'⏷':'⏶';
      button.setAttribute('aria-label',collapsed?'Expand section':'Collapse section');
    });
  }
  document.querySelectorAll('.protocol-box').forEach(function(box){
    addContentToggle(box.querySelector('.protocol-toggle'),box.querySelector('.collapsible-content'));
  });
  const bullkart=document.querySelector('.bullkart-card');
  if(bullkart) addContentToggle(bullkart.querySelector('.collapsible-toggle'),bullkart.querySelector('.collapsible-content'));
  const ecgc=document.querySelector('.ecgc-card');
  if(ecgc) addContentToggle(ecgc.querySelector('.collapsible-toggle'),ecgc.querySelector('.collapsible-content'));
  const hero=document.querySelector('.alert-hero'), heroBtn=hero&&hero.querySelector('.hero-toggle');
  if(hero&&heroBtn) heroBtn.addEventListener('click',function(e){e.stopPropagation();const collapsed=hero.classList.toggle('is-collapsed');heroBtn.textContent=collapsed?'⏷':'⏶';heroBtn.setAttribute('aria-label',collapsed?'Expand section':'Collapse section');});
})();
