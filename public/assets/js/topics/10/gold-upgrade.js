/* Topic 10.3 · FEED CARD GOLD Upgrade — interactive behaviour for this topic's content. */

document.querySelectorAll('.section-toggle').forEach(function(toggle){
  toggle.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();

    const section=toggle.closest('.section');
    const body=section.querySelector('.section-body');
    const collapsed=body.classList.toggle('collapsed');

    toggle.textContent=collapsed?'⏷':'⏶';
    toggle.setAttribute('aria-expanded',String(!collapsed));
  });
});

const faqToggle=document.querySelector('.faq-toggle');
const faq=document.querySelector('.faq');

if(faqToggle && faq){
  faqToggle.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();

    const collapsed=faq.classList.toggle('collapsed');

    faqToggle.textContent=collapsed?'⏷':'⏶';
    faqToggle.setAttribute('aria-expanded',String(!collapsed));
  });
}
