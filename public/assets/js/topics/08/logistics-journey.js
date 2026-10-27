/* Topic 8.1 · Logistics Journey — interactive behaviour for this topic's content. */

(function(){
  document.querySelectorAll('.section-toggle').forEach(function(toggle){
    toggle.addEventListener('click', function(e){
      e.preventDefault();
      var head = toggle.closest('.sec');
      var node = head.nextElementSibling;
      var collapsed = head.classList.toggle('collapsed');
      while(node){
        node.style.display = collapsed ? 'none' : '';
        node = node.nextElementSibling;
      }
      toggle.textContent = collapsed ? '⏷' : '⏶';
      toggle.setAttribute('aria-expanded', String(!collapsed));
    });
  });
})();
