/* Topic 4.2 · PHRT Certificate — interactive behaviour for this topic's content. */

function showCommodity(id, btn) {
  document.querySelectorAll('.commodity-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.commodity-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}
