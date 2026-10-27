/* Topic 5.1 · FOB Pricing Calculator — interactive behaviour for this topic's content. */

/* =====================================================
   SECTION EXPAND / COLLAPSE
===================================================== */

function toggleSection(contentId, iconId) {

    const content =
        document.getElementById(contentId);

    const icon =
        document.getElementById(iconId);


    const isCollapsed =
        content.classList.toggle("collapsed");


    if (isCollapsed) {

        icon.textContent = "⌄";

    } else {

        icon.textContent = "⌃";

    }

}


/* =====================================================
   FOB DEFINITION
===================================================== */

function toggleFobDefinition() {

    const content =
        document.getElementById("fobDefinition");

    const icon =
        document.getElementById("fobIcon");


    const isCollapsed =
        content.classList.toggle("collapsed");


    if (isCollapsed) {

        icon.textContent = "⌄";

    } else {

        icon.textContent = "⌃";

    }

}


/* =====================================================
   INCOTERMS SCREEN
===================================================== */

function openIncoterms() {

    document.getElementById("mainScreen").style.display =
        "none";

    document.getElementById("incotermsScreen").style.display =
        "block";

    document.getElementById("incotermsScreen").scrollTop = 0;

}


function closeIncoterms() {

    document.getElementById("incotermsScreen").style.display =
        "none";

    document.getElementById("mainScreen").style.display =
        "block";

    document.getElementById("mainScreen").scrollTop = 0;

}


/* =====================================================
   INCOTERMS INDIVIDUAL EXPAND / COLLAPSE
===================================================== */

function toggleTerm(titleElement) {

    const content =
        titleElement.nextElementSibling;

    const arrow =
        titleElement.querySelectorAll("span")[1];


    const isCollapsed =
        content.classList.toggle("collapsed");


    if (isCollapsed) {

        arrow.textContent = "⌄";

    } else {

        arrow.textContent = "⌃";

    }

}
