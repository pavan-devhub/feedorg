/* Topic 10.6 · PACS 93% Distribution Tracker — interactive behaviour for this topic's content. */

(function(){
  const wanted = [
    '📦 పంపిణీ మార్గం — Amazon Order Style',
    '🏛️ PACS Secretary పాత్ర — ఎందుకు ముఖ్యం?',
    '📄 ఆదాయ ధ్రువీకరణ పత్రం — Preview'
  ];
  document.querySelectorAll('.section-head').forEach(function(head){
    const h3 = head.querySelector('h3');
    if(!h3) return;
    const title = h3.textContent.trim();
    if(!wanted.some(function(w){ return title.includes(w.replace(/^[^ ]+ /,'')) || title === w; })) return;
    const body = head.nextElementSibling;
    if(!body) return;
    head.classList.add('toggle-ready');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mobile-expand-btn';
    btn.textContent = '⏶';
    btn.setAttribute('aria-label','విభాగాన్ని మూసివేయండి');
    btn.setAttribute('aria-expanded','true');
    head.appendChild(btn);
    btn.addEventListener('click',function(){
      const collapsed = body.classList.toggle('section-collapsed');
      btn.textContent = collapsed ? '⏷' : '⏶';
      btn.setAttribute('aria-expanded',String(!collapsed));
      btn.setAttribute('aria-label',collapsed ? 'విభాగాన్ని తెరవండి' : 'విభాగాన్ని మూసివేయండి');
    });
  });
})();
