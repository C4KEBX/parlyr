gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Nav: solid background on scroll, hide on scroll-down ───
const nav = document.getElementById('nav');

ScrollTrigger.create({
  start: 'top -60px',
  onEnter: () => nav.classList.add('is-scrolled'),
  onLeaveBack: () => nav.classList.remove('is-scrolled'),
});

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 120) {
    nav.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastY = y;
}, { passive: true });

// ─── All motion animations — skip when prefers-reduced-motion ───
if (!prefersReducedMotion) {

  // Hero entrance
  const heroWords = gsap.utils.toArray('.hero__word');

  gsap.set(heroWords, { y: 80, opacity: 0 });
  gsap.set('.hero__subheading', { y: 30, opacity: 0 });
  gsap.set('.hero__cta', { y: 20, opacity: 0 });

  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .to(heroWords, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.07,
    })
    .to('.hero__subheading', {
      y: 0,
      opacity: 1,
      duration: 0.7,
    }, '-=0.5')
    .to('.hero__cta', {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, '-=0.3');

  // Service cards stagger
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services__grid',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // Why Parlyr — each item slides in from left
  gsap.utils.toArray('.why__item').forEach((item) => {
    const word = item.querySelector('.why__word');
    const detail = item.querySelector('.why__detail');

    const trigger = { trigger: item, start: 'top 78%' };

    gsap.from(word, {
      scrollTrigger: trigger,
      x: -70,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from(detail, {
      scrollTrigger: trigger,
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power3.out',
    });
  });

  // Contact section fade-in
  gsap.from(['.contact__heading', '.contact__form', '.contact__email'], {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
  });

}
