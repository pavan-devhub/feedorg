/* Topic 6.8 · AIF Subsidy — interactive behaviour for this topic's content. */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.sec-div').forEach(function (section) {
    var button = section.querySelector('.expand-btn');
    var content = section.nextElementSibling;

    if (!button || !content) return;

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        content.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        button.textContent = '⏶';
      } else {
        content.style.display = '';
        button.setAttribute('aria-expanded', 'true');
        button.textContent = '⏷';
      }
    });
  });
});
