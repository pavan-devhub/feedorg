/* Topic 7.9 · Let Export Order Tracker — interactive behaviour for this topic's content. */

(function(){
  const heroBtn=document.querySelector('.hero-expand');
  const heroBody=document.querySelector('.hero-card .hero-body');
  if(heroBtn&&heroBody){heroBtn.addEventListener('click',function(e){e.stopPropagation();const c=heroBody.classList.toggle('card-body-collapsed');heroBtn.textContent=c?'⏷':'⏶';heroBtn.setAttribute('aria-label',c?'Expand LEO information':'Collapse LEO information');});}
  const leoBtn=document.querySelector('.leo-expand');
  const leoBody=document.querySelector('.leo-collapsible');
  if(leoBtn&&leoBody){leoBtn.addEventListener('click',function(e){e.stopPropagation();const c=leoBody.classList.toggle('card-body-collapsed');leoBtn.textContent=c?'⏷':'⏶';leoBtn.setAttribute('aria-label',c?'Expand LEO status':'Collapse LEO status');});}
  document.querySelectorAll('.sec-div').forEach(function(section){
    const h=section.querySelector('.sec-head'), b=section.querySelector('.sec-body');
    if(!h||!b)return;
    h.classList.add('toggle-header');
    const w=document.createElement('div');w.className='sec-head-text';
    while(h.firstChild)w.appendChild(h.firstChild);h.appendChild(w);
    const btn=document.createElement('button');btn.type='button';btn.className='section-toggle';btn.textContent='⏶';btn.setAttribute('aria-label','Collapse section');h.appendChild(btn);
    btn.addEventListener('click',function(e){e.stopPropagation();const c=b.classList.toggle('section-body-collapsed');btn.textContent=c?'⏷':'⏶';btn.setAttribute('aria-label',c?'Expand section':'Collapse section');});
  });
})();
