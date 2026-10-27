/* Topic 12.1 · Destination Rejection Protocol — interactive behaviour for this topic's content. */

document.querySelectorAll('.expandable').forEach(function(section) {
    const button = section.querySelector('.expand-btn');
    if (!button) return;
    button.addEventListener('click', function() {
      const collapsed = section.classList.toggle('collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-expanded', String(!collapsed));
      button.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
  });

  window.addEventListener('load', function() {
    const scroller = document.querySelector('.screen-scroll');
    if (scroller) scroller.scrollTop = 0;
  });
