/* Topic 6.9 · LC Checker — interactive behaviour for this topic's content. */

document.addEventListener('DOMContentLoaded', function(){
  const sectionHeads = Array.from(document.querySelectorAll('.app-scroll > .sec-div'));
  sectionHeads.forEach(function(head){
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'expand-btn';
    button.textContent = '⏷';
    button.setAttribute('aria-expanded','true');
    button.setAttribute('aria-label','Collapse section');
    head.appendChild(button);

    const group = document.createElement('div');
    group.className = 'section-content';
    let node = head.nextElementSibling;
    while(node && !node.classList.contains('sec-div') &&
          !node.classList.contains('nav-wrap') &&
          !node.classList.contains('foot') &&
          !node.classList.contains('navb')){
      const next = node.nextElementSibling;
      group.appendChild(node);
      node = next;
    }
    head.parentNode.insertBefore(group, node || null);

    button.addEventListener('click', function(){
      const collapsed = group.classList.toggle('collapsed');
      button.textContent = collapsed ? '⏶' : '⏷';
      button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  });
});
