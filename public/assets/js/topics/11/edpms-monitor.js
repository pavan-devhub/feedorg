/* Topic 11.5 · EDPMS Monitor — interactive behaviour for this topic's content. */

function toggleSection(button, id){
 const panel=document.getElementById(id); if(!panel) return;
 const willOpen=panel.hidden; panel.hidden=!willOpen;
 button.setAttribute('aria-expanded', String(willOpen)); button.textContent=willOpen?'⏶':'⏷';
}
