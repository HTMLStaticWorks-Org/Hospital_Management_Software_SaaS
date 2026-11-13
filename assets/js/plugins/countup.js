/**
 * MediCore HMS — Count-Up Impact Metrics Plugin (countup.js)
 * Animates numeric values when elements with [data-countup] enter the viewport.
 */
(function () {
  'use strict';

  /**
   * Animate a single element from 0 to its target numeric value.
   * @param {HTMLElement} el
   */
  function animateValue(el) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    var target = parseFloat(el.getAttribute('data-countup')) || 0;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }

    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  /**
   * Observe all [data-countup] elements on the page.
   */
  function initCountUp() {
    var nodes = document.querySelectorAll('[data-countup]');
    if (!nodes.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      nodes.forEach(function (n) { observer.observe(n); });
    } else {
      nodes.forEach(animateValue);
    }
  }

  window.MediCoreCountUp = { init: initCountUp };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountUp);
  } else {
    initCountUp();
  }
})();

