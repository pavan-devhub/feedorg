/* Topic 12.6 · RASFF Alert Response Protocol — interactive behaviour for this topic's content. */

function toggleSection(button){var section=button.parentElement.parentElement;if(!section||!section.classList.contains("expandable"))return;var body=section.querySelector(".expand-body");if(!body)return;var collapsed=section.classList.toggle("collapsed");button.setAttribute("aria-expanded",collapsed?"false":"true");button.textContent=collapsed?"⏷":"⏶";}
