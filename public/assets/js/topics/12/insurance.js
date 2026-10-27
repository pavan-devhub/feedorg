/* Topic 12.9 · Insurance Claim Process — interactive behaviour for this topic's content. */

function toggleSection(button) {
  const section = button.closest('.expandable');
  if (!section) return;
  const body = section.querySelector(':scope > .expand-body');
  if (!body) return;
  const collapsed = section.classList.toggle('collapsed');
  button.setAttribute('aria-expanded', String(!collapsed));
  button.textContent = collapsed ? '⏷' : '⏶';
}

function toggleSiblingSection(button) {
  const section = button.parentElement.nextElementSibling;
  if (!section || !section.classList.contains('expandable')) return;
  const body = section.querySelector(':scope > .expand-body');
  if (!body) return;
  const collapsed = section.classList.toggle('collapsed');
  button.setAttribute('aria-expanded', String(!collapsed));
  button.textContent = collapsed ? '⏷' : '⏶';
}
