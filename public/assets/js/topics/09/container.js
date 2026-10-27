/* Topic 9.3 · Reefer Container Tracker — interactive behaviour for this topic's content. */

(function(){
  function addWholeBlockToggle(block, light, label){
    if(!block || block.querySelector('.block-toggle')) return;
    block.classList.add('toggle-block','has-toggle');
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='block-toggle' + (light ? ' light' : '');
    btn.textContent='⏶';
    btn.setAttribute('aria-label','Collapse ' + label);
    const content=document.createElement('div');
    content.className='toggle-content';
    Array.from(block.children).forEach(c=>content.appendChild(c));
    block.appendChild(content);
    block.appendChild(btn);
    btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      const closed=content.classList.toggle('toggle-collapsed');
      btn.textContent=closed?'⏷':'⏶';
      btn.setAttribute('aria-label',(closed?'Expand ':'Collapse ')+label);
    });
  }

  // S-48 Container Tracker block: keep the heading visible and collapse only its content.
  document.querySelectorAll('.s48-info').forEach(block=>{
    const head=block.querySelector(':scope > .s48-info-head');
    const body=block.querySelector(':scope > .s48-info-body');
    if(!head || !body || head.querySelector('.block-toggle')) return;
    block.classList.add('toggle-block');
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='block-toggle';
    btn.style.top='8px';
    btn.style.right='10px';
    btn.textContent='⏶';
    btn.setAttribute('aria-label','Collapse Container Tracker');
    head.appendChild(btn);
    btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      const closed=body.classList.toggle('toggle-collapsed');
      btn.textContent=closed?'⏷':'⏶';
      btn.setAttribute('aria-label',closed?'Expand Container Tracker':'Collapse Container Tracker');
    });
  });

  // Every major content card gets an expand/collapse button.
  document.querySelectorAll('.container-card').forEach(b=>addWholeBlockToggle(b,false,'container details'));
  document.querySelectorAll('.gps-bar').forEach(b=>addWholeBlockToggle(b,false,'GPS details'));
  document.querySelectorAll('.deliverable-card').forEach(b=>addWholeBlockToggle(b,false,'buyer deliverable'));
  document.querySelectorAll('.platform-card').forEach(b=>addWholeBlockToggle(b,false,'FEED platform automations'));
  document.querySelectorAll('.kyj-strip').forEach(b=>addWholeBlockToggle(b,true,'KYJ stage'));

  // Section cards keep their heading visible; only the section body collapses.
  document.querySelectorAll('.section').forEach(section=>{
    const head=section.querySelector(':scope > .sec-head');
    const body=section.querySelector(':scope > .sec-body');
    if(!head || !body || head.querySelector('.block-toggle')) return;
    section.classList.add('toggle-block');
    head.style.position='relative';
    head.style.paddingRight='54px';
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='block-toggle';
    btn.style.top='8px';
    btn.style.right='10px';
    btn.textContent='⏶';
    btn.setAttribute('aria-label','Collapse section');
    head.appendChild(btn);
    btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      const closed=body.classList.toggle('toggle-collapsed');
      btn.textContent=closed?'⏷':'⏶';
      btn.setAttribute('aria-label',closed?'Expand section':'Collapse section');
    });
  });

  // FAQ toggle — title stays visible, content collapses cleanly.
  const faqToggle = document.getElementById('faqToggle');
  const faqContent = document.getElementById('faqContent');
  if(faqToggle && faqContent){
    faqToggle.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      const closed = faqContent.classList.toggle('faq-collapsed');
      faqToggle.textContent = closed ? '⏷' : '⏶';
      faqToggle.setAttribute('aria-label', closed ? 'Expand FAQ' : 'Collapse FAQ');
    });
  }

})();
