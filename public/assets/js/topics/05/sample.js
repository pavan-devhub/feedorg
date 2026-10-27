/* Topic 5.4 · Sample Dispatch Tracker — interactive behaviour for this topic's content. */

/* =====================================================
   EXPAND / COLLAPSE
===================================================== */

function toggleSection(contentId, iconId) {

  const content = document.getElementById(contentId);

  const icon = document.getElementById(iconId);

  const isCollapsed =
    content.classList.toggle("collapsed");

  icon.textContent =
    isCollapsed ? "⌄" : "⌃";

}
