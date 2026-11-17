const fonts = document.querySelector('#web-fonts');
if (fonts) fonts.media = 'all';

const filterBar = document.querySelector('.filter-bar');
const buttons = [...filterBar.querySelectorAll('button[data-filter]')];
const projects = [...document.querySelectorAll('.project-card[data-tags]')];
const status = filterBar.querySelector('.project-count');

function filterProjects(filter) {
  let count = 0;

  for (const project of projects) {
    const matches = filter === 'All' || project.dataset.tags.split(',').includes(filter);
    project.hidden = !matches;
    if (matches) count += 1;
  }

  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  }

  status.textContent = count === 1 ? '1 project' : `${count} projects`;
}

filterBar.hidden = false;
filterProjects('All');
filterBar.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (button) filterProjects(button.dataset.filter);
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('entered');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });

  for (const card of document.querySelectorAll('.case-card, .services article')) {
    if (card.getBoundingClientRect().top > window.innerHeight) observer.observe(card);
  }
}

for (const image of document.querySelectorAll('.screenshot img')) {
  const showScreenshot = () => {
    image.closest('.screenshot').classList.add('has-screenshot');
  };

  image.addEventListener('load', showScreenshot, { once: true });
  if (image.complete && image.naturalWidth > 0) showScreenshot();
}
