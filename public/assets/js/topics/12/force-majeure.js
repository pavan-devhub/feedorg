/* Topic 12.7 · Force Majeure Protocol — interactive behaviour for this topic's content. */

document.addEventListener('DOMContentLoaded', function () {
  const scroller = document.querySelector('.screen-scroll');
  document.querySelectorAll('.exp-section').forEach(function(section){
    const button = section.querySelector('.exp-btn');
    if(!button) return;
    button.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      const collapsed = section.classList.toggle('collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      button.setAttribute('aria-label', collapsed ? 'విభాగాన్ని తెరవండి' : 'విభాగాన్ని మూసివేయి');
    });
  });
  if(scroller) scroller.scrollTop = 0;
});
