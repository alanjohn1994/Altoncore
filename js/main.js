/* =========================================
   ALTONFIT — JS
   ========================================= */

(function () {
  'use strict';

  /* ── Navbar scroll state ── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => observer.observe(s));

  /* ── Mobile menu ── */
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── Typing hero headline ── */
  const headline = document.getElementById('heroHeadline');
  if (headline) {
    const fullText = headline.dataset.text;
    headline.textContent = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    headline.appendChild(cursor);

    function type() {
      if (i < fullText.length) {
        cursor.insertAdjacentText('beforebegin', fullText[i]);
        i++;
        setTimeout(type, 38 + Math.random() * 28);
      }
    }
    // Small delay so page paint settles
    setTimeout(type, 600);
  }

  /* ── Waitlist form ── */
  const form = document.getElementById('waitlistForm');
  const successMsg = document.getElementById('successMsg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      // In production, POST to your backend here
      console.log('Demo signup:', email);
      const ctaBlock = document.querySelector('.waitlist-cta-btns');
      if (ctaBlock) ctaBlock.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    });
  }
})();
