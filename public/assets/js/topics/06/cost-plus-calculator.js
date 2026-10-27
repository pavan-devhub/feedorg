/* Topic 6.1 · Cost-Plus Calculator — interactive behaviour for this topic's content. */

function toggleSection(button){
  const section = button.closest('.section-block');
  if(!section) return;
  const collapsed = section.classList.toggle('collapsed');
  button.textContent = collapsed ? '⏶' : '⏷';
  button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
}
