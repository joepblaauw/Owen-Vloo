const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#offer-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const name = String(values.get('naam') || '').trim();
  const details = [
    `Naam: ${name}`,
    `Telefoon: ${String(values.get('telefoon') || '').trim()}`,
    `E-mail: ${String(values.get('email') || '').trim()}`,
    `Werkzaamheden: ${String(values.get('dienst') || '').trim()}`,
    '',
    String(values.get('bericht') || '').trim()
  ];
  const subject = `Offerteaanvraag Vloo - ${name}`;
  const mailto = `mailto:vlooschilderwerken@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details.join('\n'))}`;
  form.querySelector('.form-status').textContent = 'Uw e-mailprogramma wordt geopend. Verzenden doet u vervolgens in dat programma.';
  window.location.href = mailto;
});
