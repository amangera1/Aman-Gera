(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const wrappers = document.querySelectorAll(
    '.shopify-section[class*="section-landing-page"]'
  );

  if (!wrappers.length) return;

  document.documentElement.classList.add('lp-motion-enabled');

  const sectionConfig = {
    'section-landing-page-1': {
      type: 'hero',
      items: '.lp-section1__left > *, .lp-section1__right',
    },
    'section-landing-page-2': {
      type: 'grid',
      items: '.lp-section2__heading, .lp-section2__card',
    },
    'section-landing-page-3': {
      type: 'fade',
      items: '.lp-section3__bg, .lp-section3__content',
    },
    'section-landing-page-4': {
      type: 'fade',
      items: '.lp-section4__inner > *',
    },
    'section-landing-page-5': {
      type: 'dual',
      items: '.lp-section5__heading, .lp-section5__img-wrap--left, .lp-section5__img-wrap--right',
    },
    'section-landing-page-6': {
      type: 'zoom',
      items: '.lp-section6__img',
    },
    'section-landing-page-7': {
      type: 'fade',
      items: '.lp-section7__header, .lp-section7__frame',
    },
    'section-landing-page-8': {
      type: 'split',
      items: '.lp-section8__left, .lp-section8__right, .lp-section8__cta',
    },
    'section-landing-page-9': {
      type: 'split',
      items:
        '.lp-section9__heading, .lp-section9__left, .lp-section9__circle, .lp-section9__content',
    },
    'section-landing-page-10': {
      type: 'split',
      items: '.lp-section10__heading, .lp-section10__content-col, .lp-section10__jeans-col',
    },
  };

  const directionCycle = ['up', 'left', 'right', 'scale', 'up'];

  function getSectionKey(wrapper) {
    return [...wrapper.classList].find((c) => c.startsWith('section-landing-page-'));
  }

  function markRevealItems(wrapper) {
    const key = getSectionKey(wrapper);
    const config = sectionConfig[key];
    if (!config) return;

    wrapper.classList.add(`lp-anim-type-${config.type}`);

    const items = wrapper.querySelectorAll(config.items);
    items.forEach((el, index) => {
      el.classList.add('lp-reveal');
      el.classList.add(`lp-reveal--${directionCycle[index % directionCycle.length]}`);
      el.style.setProperty('--lp-reveal-delay', `${0.06 + index * 0.11}s`);
      el.style.setProperty('--lp-reveal-duration', `${0.75 + (index % 3) * 0.08}s`);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const wrapper = entry.target;
        wrapper.classList.add('lp-anim-visible');

        const reveals = wrapper.querySelectorAll('.lp-reveal');
        reveals.forEach((el) => el.classList.add('lp-reveal--in'));

        observer.unobserve(wrapper);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  wrappers.forEach((wrapper, index) => {
    wrapper.classList.add('lp-anim-wrap');
    wrapper.style.setProperty('--lp-section-index', index);
    markRevealItems(wrapper);
    observer.observe(wrapper);
  });

  const buttons = document.querySelectorAll(
    '.lp-section3__btn, .lp-section8__btn, .lp-section9__btn, .lp-section10__btn'
  );

  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      btn.style.transform = `translate(${x}px, ${y - 4}px) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();
