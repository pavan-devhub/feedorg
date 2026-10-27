/* Topic 9.1 · Sea Route — KPCT — interactive behaviour for this topic's content. */

/* Independent expand/collapse control for every section */
(function () {
  const sections = document.querySelectorAll(".section");

  sections.forEach(function (section) {
    const header = section.querySelector(":scope > .sec-head");
    const body = section.querySelector(":scope > .sec-body");

    if (!header || !body) return;

    header.classList.add("toggle-header");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "section-toggle";
    button.textContent = "⏶";
    button.setAttribute("aria-label", "విభాగాన్ని మూసివేయండి");
    button.setAttribute("aria-expanded", "true");

    header.appendChild(button);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const collapsed = body.classList.toggle("section-body-collapsed");

      button.textContent = collapsed ? "⏷" : "⏶";
      button.setAttribute("aria-expanded", String(!collapsed));
      button.setAttribute(
        "aria-label",
        collapsed ? "విభాగాన్ని తెరవండి" : "విభాగాన్ని మూసివేయండి"
      );
    });
  });
})();
