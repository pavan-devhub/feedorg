/* Topic 9.8 · Vessel Schedule & Sailing Calendar — interactive behaviour for this topic's content. */

(function(){
  function makeToggle(buttonLabel, target, buttonClass){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'section-toggle' + (buttonClass ? ' ' + buttonClass : '');
    btn.textContent = '⏶';
    btn.setAttribute('aria-label','Collapse section');
    btn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      const collapsed = target.classList.toggle('section-collapsed');
      btn.textContent = collapsed ? '⏷' : '⏶';
      btn.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
    });
    return btn;
  }

  /* 1. Active voyage card — use one details wrapper and explicit display state.
     This avoids a stale/partial collapsed state: every click alternates open/closed. */
  const hero = document.querySelector('.voyage-hero');
  if (hero) {
    const tag = hero.querySelector('.vh-tag');
    const title = hero.querySelector('.vh-title');
    const grid = hero.querySelector('.vh-grid');
    const progress = hero.querySelector('.voyage-progress');

    const headingRow = document.createElement('div');
    headingRow.className = 'voyage-toggle-row';
    const heading = document.createElement('div');
    heading.className = 'voyage-heading-wrap';
    if (tag) heading.appendChild(tag);
    if (title) heading.appendChild(title);
    headingRow.appendChild(heading);

    const details = document.createElement('div');
    details.className = 'voyage-details-wrap';
    [grid, progress].filter(Boolean).forEach(function (el) {
      details.appendChild(el);
    });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'section-toggle';
    btn.textContent = '⏶';
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Collapse live voyage details');
    // Explicit boolean state + inline !important display prevents CSS/class state conflicts.
    let voyageDetailsOpen = true;
    details.style.setProperty('display', 'block', 'important');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      voyageDetailsOpen = !voyageDetailsOpen;
      if (voyageDetailsOpen) {
        details.style.setProperty('display', 'block', 'important');
        details.classList.remove('is-collapsed');
      } else {
        details.style.setProperty('display', 'none', 'important');
        details.classList.add('is-collapsed');
      }
      btn.textContent = voyageDetailsOpen ? '⏶' : '⏷';
      btn.setAttribute('aria-expanded', voyageDetailsOpen ? 'true' : 'false');
      btn.setAttribute('aria-label', voyageDetailsOpen ? 'Collapse live voyage details' : 'Expand live voyage details');
    });
    headingRow.appendChild(btn);

    hero.insertBefore(headingRow, hero.firstChild);
    hero.appendChild(details);
  }

  /* 2. Calendar — one click handler controls all calendar content. */
  const cal = document.querySelector('.cal-wrap');
  if(cal){
    const header = cal.querySelector('.cal-header');
    const days = cal.querySelector('.cal-days-header');
    const grid = cal.querySelector('.cal-grid');
    const legend = cal.querySelector('.cal-legend');
    if(header && grid){
      const titleBlock = header.firstElementChild;
      const row = document.createElement('div');
      row.className = 'cal-toggle-row';
      row.style.width = '100%';
      if(titleBlock){ row.appendChild(titleBlock); header.appendChild(row); }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'section-toggle';
      btn.textContent = '⏶';
      btn.setAttribute('aria-label','Collapse calendar');
      const targets = [days, grid, legend].filter(Boolean);
      btn.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        const collapsed = !cal.dataset.collapsed || cal.dataset.collapsed !== 'true';
        targets.forEach(function(el){ el.classList.toggle('section-collapsed', collapsed); });
        cal.dataset.collapsed = collapsed ? 'true' : 'false';
        btn.textContent = collapsed ? '⏷' : '⏶';
        btn.setAttribute('aria-label', collapsed ? 'Expand calendar' : 'Collapse calendar');
      });
      row.appendChild(btn);
    }
  }

  /* 3. Every regular section gets a circular toggle. */
  document.querySelectorAll('.sec').forEach(function(sec){
    const head = sec.querySelector('.sec-head');
    const body = sec.querySelector('.sec-body');
    if(!head || !body) return;

    head.classList.add('expandable-header');

    const textNodes = [];
    Array.from(head.childNodes).forEach(function(node){
      if(node !== head.querySelector('.section-toggle')) textNodes.push(node);
    });

    const textWrap = document.createElement('div');
    textWrap.className = 'header-text-wrap';
    textNodes.forEach(function(node){ textWrap.appendChild(node); });
    head.appendChild(textWrap);

    const btn = makeToggle('Collapse section', body);
    head.appendChild(btn);
  });

  /* 4. Harvest-to-vessel block — one click handler controls timeline and note. */
  const harvest = document.querySelector('.harvest-align');
  if(harvest){
    const title = harvest.querySelector('.ha-title');
    const timeline = harvest.querySelector('.ha-timeline');
    const note = timeline ? timeline.nextElementSibling : null;
    if(title && timeline){
      const row = document.createElement('div');
      row.className = 'expandable-header';
      row.style.marginBottom = '10px';
      const titleWrap = document.createElement('div');
      titleWrap.className = 'header-text-wrap';
      titleWrap.appendChild(title);
      row.appendChild(titleWrap);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'section-toggle';
      btn.textContent = '⏶';
      btn.setAttribute('aria-label','Collapse timeline');
      btn.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        const collapsed = harvest.dataset.collapsed !== 'true';
        [timeline, note].filter(Boolean).forEach(function(el){ el.classList.toggle('section-collapsed', collapsed); });
        harvest.dataset.collapsed = collapsed ? 'true' : 'false';
        btn.textContent = collapsed ? '⏷' : '⏶';
        btn.setAttribute('aria-label', collapsed ? 'Expand timeline' : 'Collapse timeline');
      });
      row.appendChild(btn);
      harvest.insertBefore(row, timeline);
    }
  }

})();
