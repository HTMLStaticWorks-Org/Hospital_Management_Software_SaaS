/**
 * MediCore HMS — 3D Perspective Card Tilt Engine (tilt.js)
 * Applies mouse-tracking 3D tilt (max 10-12 deg) + dynamic cursor glare layer
 * to all .mc-card, .card, and [data-tilt] elements.
 * Disables mouse tilt on touch devices and uses gentle press scale instead.
 */
(function () {
  'use strict';

  /**
   * Initialize 3D tilt behavior on matching elements within a root container.
   * @param {Document|HTMLElement} root
   */
  function initTilt(root) {
    var scope = root || document;
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isTouch = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
    var cards = scope.querySelectorAll('.mc-card, .card, [data-tilt]');

    cards.forEach(function (card) {
      if (card.dataset.tiltBound === 'true') return;
      card.dataset.tiltBound = 'true';

      // Ensure glare element exists inside card
      var glare = card.querySelector('.tilt-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'tilt-glare';
        glare.setAttribute('aria-hidden', 'true');
        card.appendChild(glare);
      }

      if (prefersReduced) return;

      if (isTouch) {
        card.addEventListener('touchstart', function () {
          card.style.transform = 'scale(0.985)';
        }, { passive: true });
        card.addEventListener('touchend', function () {
          card.style.transform = 'scale(1)';
        }, { passive: true });
        return;
      }

      var maxTilt = parseFloat(card.dataset.tiltMax) || 10.5;

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateX = ((y - centerY) / centerY) * -maxTilt;
        var rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transition = 'transform 0.08s ease-out';
        card.style.transform =
          'perspective(1000px) rotateX(' +
          rotateX.toFixed(2) +
          'deg) rotateY(' +
          rotateY.toFixed(2) +
          'deg) scale3d(1.015, 1.015, 1.015)';

        var pctX = ((x / rect.width) * 100).toFixed(1);
        var pctY = ((y / rect.height) * 100).toFixed(1);
        glare.style.background =
          'radial-gradient(circle at ' +
          pctX +
          '% ' +
          pctY +
          '%, rgba(62, 242, 192, 0.24), transparent 62%)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  window.MediCoreTilt = { init: initTilt };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTilt(document);
    });
  } else {
    initTilt(document);
  }
})();

