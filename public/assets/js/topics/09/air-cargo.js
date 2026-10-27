/* Topic 9.9 · Air Cargo — interactive behaviour for this topic's content. */

(function(){
  document.querySelectorAll('.sec').forEach(function(s){
    var h=s.querySelector('.sec-head'),b=s.querySelector('.sec-body');
    if(!h||!b)return;
    var btn=document.createElement('button');
    btn.type='button';btn.className='mobile-expand-btn';btn.textContent='⏶';
    h.appendChild(btn);
    btn.addEventListener('click',function(){
      var c=b.classList.toggle('section-body-collapsed');
      btn.textContent=c?'⏷':'⏶';
    });
  });
  var hero=document.querySelector('.iron-hero'),hb=document.querySelector('.iron-hero-toggle');
  if(hero&&hb)hb.addEventListener('click',function(){
    hb.textContent=hero.classList.toggle('is-collapsed')?'⏷':'⏶';
  });
})();
