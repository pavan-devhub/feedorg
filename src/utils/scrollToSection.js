// Smooth-scrolls to a block on the current page, clear of the floating navbar.
export default function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
}
