/* Topic 4.10 · GAP Log & DSMS Zone 2 — interactive behaviour for this topic's content. */

function toggleSection(id, btn) {
    var el = document.getElementById(id);
    if (!el) return;
    var collapsed = el.classList.toggle('collapsed');
    btn.textContent = collapsed ? 'విస్తరించు' : 'కుదించు';
  }
