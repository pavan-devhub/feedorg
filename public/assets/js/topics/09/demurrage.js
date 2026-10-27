/* Topic 9.11 · Demurrage Management — interactive behaviour for this topic's content. */

(function(){
  const sections = document.querySelectorAll('.sec');
  sections.forEach(function(section){
    const header = section.querySelector(':scope > .sec-head');
    const body = section.querySelector(':scope > .sec-body');
    if(!header || !body) return;

    header.classList.add('toggle-header');

    const text = header.querySelector('.sec-head-text');
    if(text){
      const button = document.createElement('button');
      button.type='button';
      button.className='section-toggle';
      button.textContent='⏶';
      button.setAttribute('aria-label','Collapse section');
      header.appendChild(button);

      button.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        const collapsed = body.classList.toggle('section-body-collapsed');
        button.textContent = collapsed ? '⏷' : '⏶';
        button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
      });
    }
  });
})();

// Hero toggle is bound once in the reliable standalone handler below.

// Independent toggles: keep each heading and button visible while its content collapses.
(function(){
  document.querySelectorAll('.panel-heading-row .panel-toggle').forEach(function(button){
    button.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      const panel = button.closest('.cost-impact, .claim-box');
      if(!panel) return;
      const content = panel.querySelector(':scope > .collapsible-panel-content, :scope > .clm-steps.collapsible-panel-content');
      if(!content) return;
      const collapsed = content.classList.toggle('is-collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-expanded', String(!collapsed));
      button.setAttribute('aria-label', collapsed ? 'Expand section content' : 'Collapse section content');
    });
  });
})();


// Reliable standalone handlers for Demurrage summary and the full prevention protocol.
(function(){
  function bindToggle(buttonId, contentId, collapsedClass, expandedLabel, collapsedLabel){
    var button=document.getElementById(buttonId);
    var content=document.getElementById(contentId);
    if(!button || !content || button.dataset.toggleBound==='1') return;
    button.dataset.toggleBound='1';
    button.addEventListener('click',function(e){
      e.preventDefault(); e.stopPropagation();
      var collapsed=content.classList.toggle(collapsedClass);
      button.textContent=collapsed?'⏷':'⏶';
      button.setAttribute('aria-expanded',String(!collapsed));
      button.setAttribute('aria-label',collapsed?expandedLabel:collapsedLabel);
    });
  }
  bindToggle('demHeroToggle','demHeroContent','dem-hero-collapsed','Expand demurrage summary','Collapse demurrage summary');
  bindToggle('protocolToggle','protocolContent','is-collapsed','Expand Demurrage prevention protocol','Collapse Demurrage prevention protocol');
})();
