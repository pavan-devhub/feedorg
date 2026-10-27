/* Topic 12.3 · Quality Rejection Response — interactive behaviour for this topic's content. */

(function(){
  function setState(section,button,closed){
    section.classList.toggle('collapsed',closed);
    button.textContent=closed?'⏷':'⏶';
    button.setAttribute('aria-expanded',closed?'false':'true');
    button.setAttribute('aria-label',closed?'వివరాలు తెరవండి':'వివరాలు మూసివేయండి');
  }
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.accordion-toggle,.extra-toggle');
    if(!btn)return;
    e.preventDefault();e.stopPropagation();
    var section=btn.closest('.accordion,.extra-section');
    if(!section)return;
    setState(section,btn,!section.classList.contains('collapsed'));
  });
  window.addEventListener('load',function(){
    var sc=document.querySelector('.screen-scroll');
    if(sc)sc.scrollTop=0;
  });
})();
