/* Topic 12.8 · International Arbitration Guide — interactive behaviour for this topic's content. */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.expandable').forEach(function (section) {
    const button = section.querySelector('.expand-toggle');
    if (!button) return;

    button.textContent = '⏶';
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('title', 'Collapse');

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const collapsed = section.classList.toggle('collapsed');
      button.textContent = collapsed ? '⏷' : '⏶';
      button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      button.setAttribute('title', collapsed ? 'Expand' : 'Collapse');
    });
  });

  const scroller = document.querySelector('.screen-scroll');
  if (scroller) scroller.scrollTop = 0;
});
