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

const initRotatingBanners = () => {
  const carousels = document.querySelectorAll('[data-carousel]');

  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));

    if (!slides.length) return;

    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));

    let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (activeIndex < 0) activeIndex = 0;

    const setActiveSlide = (index) => {
      if (!slides.length) return;

      const normalizedIndex = ((index % slides.length) + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === normalizedIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === normalizedIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      activeIndex = normalizedIndex;
    };

    setActiveSlide(activeIndex);

    const goNext = () => setActiveSlide(activeIndex + 1);
    const goPrev = () => setActiveSlide(activeIndex - 1);

    let autoTimer;

    const stopAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = undefined;
      }
    };

    const startAuto = () => {
      if (slides.length <= 1) return;
      stopAuto();
      autoTimer = setInterval(goNext, 7000);
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        goPrev();
        startAuto();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        goNext();
        startAuto();
      });
    }

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        setActiveSlide(dotIndex);
        startAuto();
      });
    });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin', stopAuto);
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) {
        startAuto();
      }
    });

    startAuto();
  });
};

const enhance = () => {
  document.documentElement.classList.add('js');
  initLiveFilters();
  initRevealAnimations();
  initRotatingBanners();
};

document.addEventListener('DOMContentLoaded', enhance);
