/* Topic 4.4 · MRL Compliance — interactive behaviour for this topic's content. */

const countryBtns = document.querySelectorAll('.country-code-btn');
  const marketCards = document.querySelectorAll('.market-card[data-market]');

  function showCountry(code) {
    countryBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-country') === code));
    marketCards.forEach(card => {
      card.style.display = card.getAttribute('data-market') === code ? '' : 'none';
    });
  }

  countryBtns.forEach(btn => {
    btn.addEventListener('click', () => showCountry(btn.getAttribute('data-country')));
  });

  showCountry('EU');
