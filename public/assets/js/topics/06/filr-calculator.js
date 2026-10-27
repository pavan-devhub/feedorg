/* Topic 6.11 · FILR Calculator — interactive behaviour for this topic's content. */

function toggleSection(button){
  const content = button.parentElement.nextElementSibling;
  if(!content) return;
  const collapsed = content.classList.toggle('collapsed');
  button.textContent = collapsed ? '⏶' : '⏷';
  button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
}
