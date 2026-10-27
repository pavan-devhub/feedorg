/* Topic 5.2 · Buyer Communication Log — interactive behaviour for this topic's content. */

/* =====================================================
   SECTION EXPAND / COLLAPSE
===================================================== */

function toggleSection(contentId, buttonId) {

  const content = document.getElementById(contentId);

  const button = document.getElementById(buttonId);

  if (!content || !button) return;

  const isCollapsed = content.classList.toggle('collapsed');

  button.textContent = isCollapsed ? 'Expand' : 'Collapse';
}
