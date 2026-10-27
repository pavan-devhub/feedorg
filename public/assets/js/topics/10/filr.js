/* Topic 10.5 · FILR Income Ratio — interactive behaviour for this topic's content. */

document.querySelectorAll('.section-toggle').forEach(function(toggle){
  toggle.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();

    const head=toggle.closest('.section-head');
    let node=head.nextElementSibling;
    const collapsed=toggle.getAttribute('aria-expanded')==='true';

    while(node){
      if(
        node.classList.contains('section-head') ||
        node.classList.contains('faq') ||
        node.classList.contains('kyj-strip') ||
        node.classList.contains('nav-row') ||
        node.classList.contains('footer')
      ) break;

      node.style.display=collapsed?'none':'';
      node=node.nextElementSibling;
    }

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
