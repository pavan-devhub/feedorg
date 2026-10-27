/* Topic 10.7 · EEFC Account — interactive behaviour for this topic's content. */

document.querySelectorAll('.expand-toggle').forEach(function(button){button.addEventListener('click',function(){var target=document.getElementById(button.getAttribute('data-target'));if(!target)return;var willExpand=target.classList.contains('is-collapsed');target.classList.toggle('is-collapsed',!willExpand);button.textContent=willExpand?'⏶':'⏷';button.setAttribute('aria-expanded',String(willExpand));button.setAttribute('aria-label',willExpand?'విభాగం మూసివేయి':'విభాగం తెరవండి');});});
