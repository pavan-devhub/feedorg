/* Topic 12.5 · Customs Hold Resolution — interactive behaviour for this topic's content. */

function toggleSection(button) {
  const section = button.closest('.expandable');
  if (!section) return;
  const body = section.querySelector('.expand-body');
  if (!body) return;
  const collapsed = section.classList.toggle('collapsed');
  button.setAttribute('aria-expanded', String(!collapsed));
  button.textContent = collapsed ? '⏷' : '⏶';
}
