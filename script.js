/**
 * Fight Leadership Team — script.js
 * Handles: scroll-reveal animations + timeline thumbnail injection
 */

(function () {
  'use strict';

  // ── Scroll-reveal ─────────────────────────────────────
  const revealTargets = [
    '.gm-card',
    '.officer-card',
    '.achievement-card',
    '.hero-title',
    '.hero-blurb',
    '.accomplishments-heading',
  ];

  function addRevealClasses() {
    revealTargets.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        if (
          el.closest('.officers-grid') ||
          el.closest('.accomplishments-grid')
        ) {
          el.style.transitionDelay = `${i * 60}ms`;
        }
      });
    });
  }

  function createObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  // ── Timeline thumbnail injection ──────────────────────
  // Reads data-thumb="url" on .timeline-event and injects
  // an <img> at the top of the preview card automatically.
  function injectThumbnails() {
    document.querySelectorAll('.timeline-event[data-thumb]').forEach((event) => {
      const card = event.querySelector('.tl-card');
      const preview = event.querySelector('.tl-preview');
      if (!card || !preview) return;

      const thumb = document.createElement('img');
      thumb.src = event.dataset.thumb;
      thumb.alt = '';
      thumb.className = 'tl-thumb';
      preview.insertBefore(thumb, preview.firstChild);
      card.classList.add('has-thumb');
    });
  }

  // ── Init ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    addRevealClasses();
    createObserver();
    injectThumbnails();
  });
})();
