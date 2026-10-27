/* Topic 11.3 · IGST Refund Tracker — interactive behaviour for this topic's content. */

document.querySelectorAll('.expand-btn').forEach(function(button){
  button.addEventListener('click',function(){
    var targetId=button.getAttribute('aria-controls');
    var target=document.getElementById(targetId);
    if(!target)return;
    var expanded=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!expanded));
    button.textContent=expanded?'⏷':'⏶';
    button.title=expanded?'విభాగాన్ని తెరవండి':'విభాగాన్ని మూసివేయి';
    target.classList.toggle('is-collapsed',expanded);
  });
});
