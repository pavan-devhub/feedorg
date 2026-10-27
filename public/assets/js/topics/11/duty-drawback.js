/* Topic 11.2 · Duty Drawback — interactive behaviour for this topic's content. */

(function(){
  const buttons = document.querySelectorAll('.expand-toggle');
  buttons.forEach(function(button){
    button.addEventListener('click', function(){
      const targetId = button.getAttribute('aria-controls');
      const target = document.getElementById(targetId);
      if (!target) return;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      button.textContent = isExpanded ? '⏷' : '⏶';
      target.hidden = isExpanded;
      button.setAttribute('aria-label', (isExpanded ? 'వివరాలు విప్పండి' : 'వివరాలు మూసివేయండి'));
    });
  });
})();
