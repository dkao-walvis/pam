// Walvis redesign mockup — minimal JS
(() => {
  'use strict';

  // ── Scrolled nav state ────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── IntersectionObserver reveal (progressive enhancement) ────────
  // Only opt into the hidden-until-scrolled behavior if we can actually observe.
  // The CSS keys off the .js-reveal class on <html>, so content stays visible
  // when JS is absent or when something prevents the observer from firing.
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    // Safety net: if anything is still hidden 2.5s after load, reveal it.
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'));
    }, 2500);
  }

  // ── FAQ accordion ─────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('open'));
  });

  // ── Hero rotating accent word ─────────────────────────────────────
  const rotator = document.querySelector('[data-rotate]');
  if (rotator) {
    const words = rotator.dataset.rotate.split('|');
    let i = 0;
    setInterval(() => {
      rotator.style.opacity = '0';
      setTimeout(() => {
        i = (i + 1) % words.length;
        rotator.textContent = words[i];
        rotator.style.opacity = '1';
      }, 260);
    }, 3000);
    rotator.style.transition = 'opacity .26s ease';
  }
})();
