/* Topic 10.2 · Nine Actions after FIRC — interactive behaviour for this topic's content. */

(function(){
  document.addEventListener("click", function(e){
    var button = e.target.closest(".block-toggle");
    if(!button) return;

    e.preventDefault();
    e.stopPropagation();

    var targetId = button.getAttribute("aria-controls");
    var body = targetId ? document.getElementById(targetId) : null;
    if(!body) return;

    var collapsed = body.classList.toggle("is-collapsed");
    button.textContent = collapsed ? "⏷" : "⏶";
    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
  }, false);
})();
