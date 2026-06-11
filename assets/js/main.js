// Daqeeq — landing interactions

// Smooth eased scrolling for in-page anchor links (nav tabs, CTAs)
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const NAV_OFFSET = 84;
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = id.length > 1 ? document.querySelector(id) : null;
    if (!target) return;
    e.preventDefault();
    const startY = window.pageYOffset;
    const endY = id === '#top' ? 0 : target.getBoundingClientRect().top + startY - NAV_OFFSET;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, endY);
      history.pushState(null, '', id);
      return;
    }
    const dist = endY - startY;
    const duration = Math.min(1400, Math.max(700, Math.abs(dist) * 0.4));
    let start;
    const step = (now) => {
      if (start === undefined) start = now;
      const p = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + dist * easeInOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    history.pushState(null, '', id);
  });
});

// Nav background after scroll
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Scroll-reveal with stagger inside groups
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  // Stagger siblings: within any parent, consecutive reveal elements get a small delay
  document.querySelectorAll('[data-reveal-group], section, footer').forEach((scope) => {
    scope.querySelectorAll(':scope [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--d', `${Math.min(i * 0.12, 0.6)}s`);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
