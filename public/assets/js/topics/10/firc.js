/* Topic 10.1 · FIRC Receipt Tracker — interactive behaviour for this topic's content. */

document.querySelectorAll('.collapsible-section .section-toggle').forEach(function(button){
  button.addEventListener('click', function(){
    const section = button.closest('.collapsible-section');
    const collapsed = section.classList.toggle('is-collapsed');
    button.textContent = collapsed ? '⏷' : '⏶';
    button.setAttribute('aria-expanded', String(!collapsed));
    button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    button.setAttribute('title', collapsed ? 'Expand section' : 'Collapse section');
  });
});
