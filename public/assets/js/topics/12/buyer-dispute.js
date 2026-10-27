/* Topic 12.2 · Buyer Dispute Tracker — interactive behaviour for this topic's content. */

(function(){
  function initAccordions(){
    var buttons=document.querySelectorAll('.acc-btn');
    buttons.forEach(function(btn){
      btn.addEventListener('click',function(){
        var section=btn.closest('.acc-section');
        if(!section) return;
        var collapsed=section.classList.toggle('collapsed');
        btn.textContent=collapsed?'⏷':'⏶';
        btn.setAttribute('aria-expanded',String(!collapsed));
        btn.setAttribute('aria-label',collapsed?'Expand section':'Collapse section');
      });
    });
    var scroller=document.querySelector('.screen-scroll');
    if(scroller){
      scroller.scrollTop=0;
      scroller.style.webkitOverflowScrolling='touch';
    }
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initAccordions);
  }else{
    initAccordions();
  }
})();
