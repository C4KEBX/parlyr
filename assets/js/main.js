const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Nav: backdrop on scroll, hide on scroll-up ───
const nav = document.getElementById('nav');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 24);
  if (y < 80) {
    nav.classList.remove('is-hidden');
  } else if (y > lastY) {
    nav.classList.remove('is-hidden');  // scrolling down → show
  } else {
    nav.classList.add('is-hidden');     // scrolling up → hide
  }
  lastY = y;
}, { passive: true });

// ─── IntersectionObserver helper ───
const observe = (selector, callback, options = {}) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        callback(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options });

  document.querySelectorAll(selector).forEach((el) => io.observe(el));
};

// ─── Hero animations ───
if (!prefersReducedMotion) {
  const words = document.querySelectorAll('.hero__word');
  const BASE = 220;
  const STEP = 80;

  words.forEach((w, i) => {
    w.style.animation = `wordIn 700ms cubic-bezier(.2,.8,.2,1) ${BASE + i * STEP}ms forwards`;
  });

  const totalDelay = BASE + words.length * STEP;

  const sub = document.querySelector('.hero__subheading');
  const cta = document.querySelector('.hero__cta-wrap');
  const scroll = document.querySelector('.hero__scroll');

  sub.style.animation    = `fadeUp 700ms cubic-bezier(.2,.8,.2,1) ${totalDelay + 200}ms forwards`;
  cta.style.animation    = `fadeUp 700ms cubic-bezier(.2,.8,.2,1) ${totalDelay + 380}ms forwards`;
  scroll.style.animation = `fadeUp 700ms cubic-bezier(.2,.8,.2,1) ${totalDelay + 600}ms forwards`;
} else {
  // Immediately visible when reduced motion is preferred
  document.querySelectorAll('.hero__word, .hero__subheading, .hero__cta-wrap, .hero__scroll').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// ─── Services: reveal on scroll ───
observe('#what', (section) => {
  section.querySelector('.services__title-block')?.classList.add('is-visible');
  section.querySelector('.services__descriptor')?.classList.add('is-visible');

  document.querySelectorAll('.service-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('is-visible'), i * 120);
  });
}, { threshold: 0.1 });

// ─── Why: per-item reveal (each item has its own observer) ───
document.querySelectorAll('.why__item').forEach((item, i) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        if (prefersReducedMotion) {
          // Skip animation, just make visible
          const w = e.target.querySelector('.why__word');
          const d = e.target.querySelector('.why__detail');
          if (w) { w.style.clipPath = 'inset(0 0% 0 0)'; }
          if (d) { d.style.opacity = '1'; d.style.transform = 'none'; }
        }
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  io.observe(item);
});

// Why header reveal
observe('.why__header', (el) => el.classList.add('is-visible'), { threshold: 0.2 });

// ─── Contact: reveal on scroll ───
observe('.contact__inner', (el) => el.classList.add('is-visible'), { threshold: 0.15 });

// ─── Contact form: AJAX submit with success state ───
const form = document.getElementById('contact-form');
const successEl = document.getElementById('contact-success');
const successName = document.getElementById('success-name');
const successEmail = document.getElementById('success-email');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get('name') || '').trim();
    const email = (data.get('email') || '').trim();

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        form.style.display = 'none';
        successName.textContent = name.split(' ')[0] || 'friend';
        successEmail.textContent = email;
        successEl.classList.add('is-visible');
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Try Again';
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Try Again';
    }
  });
}
