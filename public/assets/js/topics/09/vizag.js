/* Topic 9.2 · Sea Route — Visakhapatnam — interactive behaviour for this topic's content. */

/* universal-section-toggle */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".section-toggle").forEach(function (toggle) {
    // FAQ toggle is handled separately below.
    if (toggle.classList.contains("faq-toggle")) return;

    const section = toggle.closest(".section");
    if (!section) return;

    toggle.addEventListener("click", function () {
      const isCollapsed = section.classList.toggle("collapsed");
      toggle.textContent = isCollapsed ? "⏷" : "⏶";
      toggle.setAttribute("aria-expanded", String(!isCollapsed));
      toggle.setAttribute(
        "aria-label",
        isCollapsed ? "వివరాలు చూపించు" : "వివరాలు దాచు"
      );
    });
  });

  const faqToggle = document.querySelector(".faq-toggle");
  const faqSection = document.querySelector(".faq-section");

  if (faqToggle && faqSection) {
    faqToggle.addEventListener("click", function () {
      const isCollapsed = faqSection.classList.toggle("collapsed");
      faqToggle.textContent = isCollapsed ? "⏷" : "⏶";
      faqToggle.setAttribute("aria-expanded", String(!isCollapsed));
      faqToggle.setAttribute(
        "aria-label",
        isCollapsed ? "వివరాలు చూపించు" : "వివరాలు దాచు"
      );
    });
  }
});

/* s47-lcl-fcl-tabs-script */
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".lcl-fcl-tab");
  const panels = document.querySelectorAll(".lcl-fcl-content .tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      this.classList.add("active");
      const panel = document.getElementById(this.dataset.target);
      if (panel) panel.classList.add("active");
    });
  });
});

/* s47-lcl-fcl-choice-toggle */
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".lcl-fcl-choice-toggle");
  const details = document.querySelector(".lcl-fcl-choice-details");
  if (!toggle || !details) return;

  toggle.addEventListener("click", function () {
    const isOpen = !details.hidden;
    details.hidden = isOpen;
    toggle.textContent = isOpen ? ">" : "⌄";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "వివరాలు చూపించు" : "వివరాలు దాచు");
  });
});
