/* Topic 9.7 · Freight Cost Calculator — interactive behaviour for this topic's content. */

(function(){
  const blocks = Array.from(document.querySelectorAll('.expandable'));
  const titleSelectors = [
    '.consign-title', '.fob-label', '.receipt-header-text', '.fn-title',
    '.sec-head-text', '.rs-title-box', '.sp-title', '.rs-title', '.rc-route',
    '.rate-compare .rc-label', '.mistake-bold'
  ];

  blocks.forEach(function(block){
    let title = null;
    for (const selector of titleSelectors) {
      title = block.querySelector(selector);
      if (title) break;
    }
    if (title) {
      const summary = title.cloneNode(true);
      summary.classList.add('collapsed-heading');
      summary.removeAttribute('id');
      block.insertBefore(summary, block.firstChild);
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'expand-toggle';
    btn.textContent = '⏶';
    btn.setAttribute('aria-label','Collapse section');
    btn.title = 'Collapse section';

    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      const collapsed = block.classList.toggle('collapsed');
      btn.textContent = collapsed ? '⏷' : '⏶';
      btn.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
      btn.title = collapsed ? 'Expand section' : 'Collapse section';
    });
    block.appendChild(btn);
  });
})();
