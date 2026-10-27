/* Topic 11.4 · eBRC Tracker — interactive behaviour for this topic's content. */

document.querySelectorAll('.exp-btn').forEach(function(btn){btn.addEventListener('click',function(){var id=btn.getAttribute('aria-controls');var panel=document.getElementById(id);if(!panel)return;var opening=btn.getAttribute('aria-expanded')!=='true';btn.setAttribute('aria-expanded',String(opening));btn.textContent=opening?'⏶':'⏷';btn.setAttribute('aria-label',opening?'విభాగాన్ని మూసివేయి':'విభాగాన్ని తెరువు');panel.hidden=!opening;});});
