const initLiveFilters = () => {
  const buttons = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.odds-card');

  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const sport = button.dataset.sport;

      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach((card) => {
        if (sport === 'all' || card.dataset.sport === sport) {
          card.classList.remove('hidden');
          card.style.pointerEvents = '';
        } else {
          card.classList.add('hidden');
          card.style.pointerEvents = 'none';
        }
      });
    });
  });
};

const initRevealAnimations = () => {
  const elements = document.querySelectorAll('[data-animate="fade-up"]');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
};

const enhance = () => {
  document.documentElement.classList.add('js');
  initLiveFilters();
  initRevealAnimations();
};

document.addEventListener('DOMContentLoaded', enhance);
