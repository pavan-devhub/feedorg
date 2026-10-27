/* Topic 4.1 · ERS Readiness Score — interactive behaviour for this topic's content. */

function toggleTier(card) {
    const wasActive = card.classList.contains('active');

    document.querySelectorAll('.tier-card').forEach(function(item) {
      item.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
    });

    if (!wasActive) {
      card.classList.add('active');
      card.setAttribute('aria-expanded', 'true');
    }
  }

  document.querySelectorAll('.tier-card').forEach(function(card) {
    card.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTier(card);
      }
    });
  });
