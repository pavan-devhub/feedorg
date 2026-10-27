/* Topic 12.4 · Document Error Correction — interactive behaviour for this topic's content. */

(function(){
  var scroller=document.querySelector('.screen-scroll');
  if(!scroller) return;
  document.querySelectorAll('.exp-section').forEach(function(section){
    var btn=section.querySelector('.exp-btn');
    var title=section.querySelector('.exp-title');
    if(!btn) return;
    function sync(){
      var open=!section.classList.contains('collapsed');
      btn.textContent=open?'⏶':'⏷';
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.setAttribute('aria-label',(title?title.textContent.trim():'Section')+(open?' section collapse':' section expand'));
    }
    sync();
    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      section.classList.toggle('collapsed');
      sync();
    });
  });
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){scroller.scrollTop=0;},{once:true});
  }else{scroller.scrollTop=0;}
})();
