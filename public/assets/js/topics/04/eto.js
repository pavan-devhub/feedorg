/* Topic 4.9 · ETO Zero Tolerance — interactive behaviour for this topic's content. */

function toggleSec(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('collapsed');
  var lbl = el.querySelector('.sec-toggle-btn .lbl');
  if (lbl) {
    lbl.textContent = el.classList.contains('collapsed') ? 'విస్తరించు' : 'కుదించు';
  }
}
