/**
 * MediCore HMS — Primary Marketing & UI Controller (main.js)
 * Handles theme switching, RTL direction, mobile drawer, scroll reveal,
 * role/category tabs, sticky walkthroughs, testimonials carousel,
 * pricing currency/cycle toggle, multi-step demo booking, and form validation.
 */
(function () {
  'use strict';

  var STORAGE_THEME = 'medicore_theme';
  var STORAGE_DIR = 'medicore_dir';

  /**
   * Initialize Dark/Light theme and RTL/LTR direction from saved state or system preference.
   */
  function initThemeAndDirection() {
    var html = document.documentElement;
    var savedTheme = localStorage.getItem(STORAGE_THEME);
    if (!savedTheme) {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      savedTheme = prefersDark ? 'dark' : 'light';
    }
    html.setAttribute('data-theme', savedTheme);

    var savedDir = localStorage.getItem(STORAGE_DIR) || 'ltr';
    html.setAttribute('dir', savedDir);

    updateToggleLabels(savedTheme, savedDir);

    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_THEME, next);
        updateToggleLabels(next, html.getAttribute('dir'));
      });
    });

    document.querySelectorAll('[data-action="toggle-rtl"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nextDir = html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', nextDir);
        localStorage.setItem(STORAGE_DIR, nextDir);
        updateToggleLabels(html.getAttribute('data-theme'), nextDir);
      });
    });
  }

  function updateToggleLabels(theme, dir) {
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      var span = btn.querySelector('.theme-label');
      if (span) span.textContent = theme === 'dark' ? 'Light' : 'Dark';
    });
    document.querySelectorAll('[data-action="toggle-rtl"]').forEach(function (btn) {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
    });
  }

  /**
   * Mobile navigation drawer and accessible dropdown menus.
   */
  function initNavigation() {
    if (document.querySelector('.site-header')) {
      document.body.classList.add('has-site-header');
    }

    var toggleBtn = document.querySelector('[data-action="toggle-mobile-nav"]');
    var drawer = document.getElementById('mobile-nav-drawer');
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', function () {
        var open = drawer.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // Dropdown caret & menu click interactions (desktop & mobile)
    document.addEventListener('click', function (e) {
      // 0. Account dropdown toggle button (nav-actions)
      var accountToggle = e.target.closest('[data-action="toggle-account"]');
      if (accountToggle) {
        e.preventDefault();
        e.stopPropagation();
        var accountParent = accountToggle.closest('.nav-account-dropdown');
        if (accountParent) {
          var isAccOpen = accountParent.classList.contains('open');
          document.querySelectorAll('.nav-item.open').forEach(function (item) {
            if (item !== accountParent) {
              item.classList.remove('open');
              var btn = item.querySelector('.nav-link, button');
              if (btn) btn.setAttribute('aria-expanded', 'false');
            }
          });
          if (isAccOpen) {
            accountParent.classList.remove('open');
            accountToggle.setAttribute('aria-expanded', 'false');
          } else {
            accountParent.classList.add('open');
            accountToggle.setAttribute('aria-expanded', 'true');
          }
          return;
        }
      }

      // 1. Desktop dropdown caret icon click (or clicking chevron SVG inside nav-link)
      var caret = e.target.closest('.dropdown-caret');
      if (!caret) {
        var svg = e.target.closest('svg');
        if (svg) {
          var parentLink = svg.closest('.nav-item > .nav-link[aria-haspopup="true"], .nav-item.has-dropdown > .nav-link');
          if (parentLink) {
            caret = svg;
          }
        }
      }

      if (caret) {
        var navItem = caret.closest('.nav-item');
        if (navItem && navItem.querySelector('.dropdown-menu')) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = navItem.classList.contains('open');

          // Close other open dropdowns
          document.querySelectorAll('.nav-item.open').forEach(function (item) {
            if (item !== navItem) {
              item.classList.remove('open');
              var link = item.querySelector('.nav-link');
              if (link) link.setAttribute('aria-expanded', 'false');
            }
          });

          if (isOpen) {
            navItem.classList.remove('open');
            var link = navItem.querySelector('.nav-link');
            if (link) link.setAttribute('aria-expanded', 'false');
          } else {
            navItem.classList.add('open');
            var link = navItem.querySelector('.nav-link');
            if (link) link.setAttribute('aria-expanded', 'true');
          }
          return;
        }
      }

      // 2. Click on "Company / Resources" nav-link directly to toggle options
      var companyLink = e.target.closest('.nav-link');
      if (companyLink) {
        var parentItem = companyLink.closest('.nav-item');
        if (parentItem && parentItem.querySelector('.dropdown-menu')) {
          var linkText = (companyLink.textContent || '').trim().toLowerCase();
          if (linkText.indexOf('company') !== -1) {
            e.preventDefault();
            e.stopPropagation();
            var isCurrentlyOpen = parentItem.classList.contains('open');

            document.querySelectorAll('.nav-item.open').forEach(function (item) {
              if (item !== parentItem) {
                item.classList.remove('open');
                var l = item.querySelector('.nav-link');
                if (l) l.setAttribute('aria-expanded', 'false');
              }
            });

            if (isCurrentlyOpen) {
              parentItem.classList.remove('open');
              companyLink.setAttribute('aria-expanded', 'false');
            } else {
              parentItem.classList.add('open');
              companyLink.setAttribute('aria-expanded', 'true');
            }
            return;
          }
        }
      }

      // 3. Mobile drawer dropdown toggle buttons
      var mobileToggle = e.target.closest('.mobile-dropdown-toggle');
      if (mobileToggle) {
        e.preventDefault();
        e.stopPropagation();
        var mobileItem = mobileToggle.closest('.mobile-nav-item');
        if (mobileItem) {
          var mobileOpen = mobileItem.classList.toggle('open');
          mobileToggle.setAttribute('aria-expanded', mobileOpen ? 'true' : 'false');
        }
        return;
      }

      // 4. Mobile drawer "Company / Resources" or "Account" header link toggle
      var mobileCompanyLink = e.target.closest('.mobile-nav-header > a');
      if (mobileCompanyLink) {
        var mobileParent = mobileCompanyLink.closest('.mobile-nav-item');
        if (mobileParent && mobileParent.querySelector('.mobile-submenu')) {
          var mobileText = (mobileCompanyLink.textContent || '').trim().toLowerCase();
          if (mobileText.indexOf('company') !== -1 || mobileText.indexOf('account') !== -1 || mobileCompanyLink.getAttribute('href') === 'login.html' || (mobileCompanyLink.getAttribute('aria-label') || '').toLowerCase().indexOf('login') !== -1) {
            e.preventDefault();
            e.stopPropagation();
            var mOpen = mobileParent.classList.toggle('open');
            var mToggle = mobileParent.querySelector('.mobile-dropdown-toggle');
            if (mToggle) mToggle.setAttribute('aria-expanded', mOpen ? 'true' : 'false');
            return;
          }
        }
      }

      // 5. Close dropdowns if clicking outside
      if (!e.target.closest('.nav-item.open')) {
        document.querySelectorAll('.nav-item.open').forEach(function (item) {
          item.classList.remove('open');
          var link = item.querySelector('.nav-link, button');
          if (link) link.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Keyboard accessibility for dropdowns
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var activeEl = document.activeElement;
        if (activeEl && activeEl.classList.contains('dropdown-caret')) {
          e.preventDefault();
          activeEl.click();
        }
      }

      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-item.open').forEach(function (item) {
          item.classList.remove('open');
          var link = item.querySelector('.nav-link, button');
          if (link) link.setAttribute('aria-expanded', 'false');
        });
        if (drawer && drawer.classList.contains('is-open')) {
          drawer.classList.remove('is-open');
          if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  /**
   * IntersectionObserver scroll reveal for .reveal-up elements.
   */
  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal-up');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el, idx) {
      el.style.transitionDelay = ((idx % 4) * 65) + 'ms';
      obs.observe(el);
    });
  }

  /**
   * Accessible Tab Groups ([data-tabs]).
   */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (tabGroup) {
      var buttons = tabGroup.querySelectorAll('[role="tab"]');
      var panels = tabGroup.querySelectorAll('[role="tabpanel"]');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('aria-controls');
          buttons.forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
          panels.forEach(function (p) { p.classList.remove('is-active'); });
          btn.setAttribute('aria-selected', 'true');
          var panel = document.getElementById(targetId);
          if (panel) panel.classList.add('is-active');

          // Also support category filtering on features page
          var filterCat = btn.getAttribute('data-filter-category');
          if (filterCat) {
            document.querySelectorAll('[data-feature-cat]').forEach(function (row) {
              if (filterCat === 'all' || row.getAttribute('data-feature-cat') === filterCat) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            });
          }
        });
      });
    });
  }

  /**
   * FAQ Accordion behavior.
   */
  function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion-item');
        if (!item) return;
        var isOpen = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  /**
   * Testimonials Carousel on Home 1 (index.html).
   */
  function initCarousel() {
    var carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;
    var slides = carousel.querySelectorAll('[data-carousel-slide]');
    var prevBtn = carousel.querySelector('[data-carousel-prev]');
    var nextBtn = carousel.querySelector('[data-carousel-next]');
    var dots = carousel.querySelectorAll('[data-carousel-dot]');
    var activeIdx = 0;

    function showSlide(idx) {
      if (!slides.length) return;
      activeIdx = (idx + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.style.display = i === activeIdx ? 'block' : 'none';
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === activeIdx);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(activeIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(activeIdx + 1); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { showSlide(i); });
    });
    showSlide(0);
  }

  /**
   * Home 2 Sticky Product Walkthrough step selector.
   */
  function initWalkthrough() {
    var steps = document.querySelectorAll('[data-walk-step]');
    var screens = document.querySelectorAll('[data-walk-screen]');
    if (!steps.length || !screens.length) return;

    steps.forEach(function (step) {
      step.addEventListener('click', function () {
        var target = step.getAttribute('data-walk-step');
        steps.forEach(function (s) { s.classList.remove('active'); });
        screens.forEach(function (sc) {
          sc.style.display = sc.getAttribute('data-walk-screen') === target ? 'block' : 'none';
        });
        step.classList.add('active');
      });
    });
  }

  /**
   * Pricing Billing Cycle (Monthly/Yearly) and Currency (INR/USD) Switcher.
   */
  function initPricingSwitcher() {
    var billingBtns = document.querySelectorAll('[data-billing-cycle]');
    var currencyBtns = document.querySelectorAll('[data-currency]');
    if (!billingBtns.length && !currencyBtns.length) return;

    var currentCycle = 'yearly';
    var currentCurr = 'INR';

    function updatePrices() {
      document.querySelectorAll('[data-price-el]').forEach(function (el) {
        var key = 'data-' + currentCurr.toLowerCase() + '-' + currentCycle;
        var val = el.getAttribute(key);
        if (val) el.textContent = val;
      });
    }

    billingBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentCycle = btn.getAttribute('data-billing-cycle');
        billingBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        updatePrices();
      });
    });

    currencyBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentCurr = btn.getAttribute('data-currency');
        currencyBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        updatePrices();
      });
    });
  }

  /**
   * Multi-Step Demo Request Wizard (demo-request.html).
   */
  function initDemoWizard() {
    var wizard = document.getElementById('demo-booking-wizard');
    if (!wizard) return;

    var steps = wizard.querySelectorAll('[data-wizard-step]');
    var indicators = wizard.querySelectorAll('[data-wizard-indicator]');
    var currentStep = 1;

    function showStep(n) {
      currentStep = n;
      steps.forEach(function (s) {
        s.style.display = parseInt(s.getAttribute('data-wizard-step'), 10) === n ? 'block' : 'none';
      });
      indicators.forEach(function (ind) {
        var stepNum = parseInt(ind.getAttribute('data-wizard-indicator'), 10);
        ind.classList.toggle('active', stepNum === n);
        ind.classList.toggle('completed', stepNum < n);
      });
    }

    function validateStepContainer(container) {
      var valid = true;
      var inputs = container.querySelectorAll('[required]');
      inputs.forEach(function (inp) {
        var group = inp.closest('.form-group');
        var isOk = inp.value.trim() !== '';
        if (inp.type === 'email' && isOk) {
          isOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        }
        inp.classList.toggle('is-invalid', !isOk);
        if (group) group.classList.toggle('has-error', !isOk);
        if (!isOk) valid = false;
      });
      return valid;
    }

    wizard.querySelectorAll('[data-wizard-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var activeContainer = wizard.querySelector('[data-wizard-step="' + currentStep + '"]');
        if (validateStepContainer(activeContainer)) {
          if (currentStep === 3) {
            var summaryName = document.getElementById('demo-confirm-hospital');
            var hospInp = document.getElementById('demo-hospital-name');
            if (summaryName && hospInp) summaryName.textContent = hospInp.value;
          }
          showStep(currentStep + 1);
        }
      });
    });

    wizard.querySelectorAll('[data-wizard-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep > 1) showStep(currentStep - 1);
      });
    });
  }

  /**
   * Universal Form Validation + Login Redirect + Password Toggle + Scroll Top.
   */
  function initForms() {
    document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-toggle-password');
        var input = document.getElementById(targetId);
        if (!input) return;
        var isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';

        var eyeOpen = btn.querySelector('.eye-open');
        var eyeClosed = btn.querySelector('.eye-closed');
        if (eyeOpen && eyeClosed) {
          eyeOpen.style.display = isPwd ? 'none' : 'block';
          eyeClosed.style.display = isPwd ? 'block' : 'none';
        } else {
          btn.textContent = isPwd ? 'Hide' : 'Show';
        }
      });
    });

    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        var requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(function (field) {
          var group = field.closest('.form-group, .auth-field');
          var ok = true;
          if (field.type === 'checkbox') {
            ok = field.checked;
          } else {
            ok = field.value.trim() !== '';
            if (ok && field.type === 'email') {
              ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            }
          }
          field.classList.toggle('is-invalid', !ok);
          if (group) group.classList.toggle('has-error', !ok);
          if (!ok) valid = false;
        });

        if (!valid) return;

        var formType = form.getAttribute('data-form-type');
        if (formType === 'login' || formType === 'signup') {
          var roleSelect = form.querySelector('[name="role"]');
          if (roleSelect) {
            localStorage.setItem('medicore_role', roleSelect.value);
          }
          window.location.href = 'dashboard/dashboard.html';
          return;
        }

        var banner = form.querySelector('.form-success-banner');
        if (banner) {
          banner.classList.add('is-visible');
        }
        form.reset();
      });
    });
  }

  /**
   * Docs Copy Code Buttons & Search, Integrations Search, Coming Soon Countdown.
   */
  function initUtilities() {
    document.querySelectorAll('.copy-code-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.parentElement.querySelector('code, pre');
        if (pre && navigator.clipboard) {
          navigator.clipboard.writeText(pre.textContent);
        }
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = orig; }, 1800);
      });
    });

    // Integrations & Docs Search Filter
    var searchInp = document.querySelector('[data-live-filter]');
    if (searchInp) {
      var targetSel = searchInp.getAttribute('data-live-filter');
      searchInp.addEventListener('input', function () {
        var q = searchInp.value.toLowerCase().trim();
        document.querySelectorAll(targetSel).forEach(function (item) {
          var txt = item.textContent.toLowerCase();
          item.style.display = txt.indexOf(q) !== -1 ? '' : 'none';
        });
      });
    }

    // Category Filter Chips on Integrations / Changelog
    document.querySelectorAll('[data-chip-filter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var cat = chip.getAttribute('data-chip-filter');
        var group = chip.closest('.filter-chips');
        if (group) {
          group.querySelectorAll('[data-chip-filter]').forEach(function (c) { c.classList.remove('active'); });
        }
        chip.classList.add('active');
        document.querySelectorAll('[data-filter-item]').forEach(function (card) {
          var itemCat = card.getAttribute('data-filter-item');
          card.style.display = (cat === 'all' || itemCat === cat) ? '' : 'none';
        });
      });
    });

    // Coming Soon Countdown Timer
    var cdDays = document.getElementById('cd-days');
    if (cdDays) {
      var targetDate = new Date('2027-01-15T09:00:00Z').getTime();
      function tick() {
        var now = Date.now();
        var diff = Math.max(0, targetDate - now);
        var d = Math.floor(diff / (1000 * 60 * 60 * 24));
        var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var m = Math.floor((diff / (1000 * 60)) % 60);
        var s = Math.floor((diff / 1000) % 60);
        cdDays.textContent = String(d).padStart(2, '0');
        var cdHours = document.getElementById('cd-hours');
        var cdMins = document.getElementById('cd-mins');
        var cdSecs = document.getElementById('cd-secs');
        if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
        if (cdMins) cdMins.textContent = String(m).padStart(2, '0');
        if (cdSecs) cdSecs.textContent = String(s).padStart(2, '0');
      }
      tick();
      setInterval(tick, 1000);
    }
  }

  /**
   * Universal Scroll to Top Button
   */
  function initScrollTop() {
    var buttons = Array.from(document.querySelectorAll('[data-action="scroll-top"], .scroll-top-btn, .auth-scroll-top-btn'));

    if (buttons.length === 0) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scroll-top-btn';
      btn.setAttribute('data-action', 'scroll-top');
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
      document.body.appendChild(btn);
      buttons.push(btn);
    }

    function checkScroll() {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop || 0;
      var show = scrolled > 180;
      buttons.forEach(function (b) {
        if (show) {
          b.classList.add('is-visible');
        } else {
          b.classList.remove('is-visible');
        }
      });
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initThemeAndDirection();
    initNavigation();
    initScrollReveal();
    initTabs();
    initAccordions();
    initCarousel();
    initWalkthrough();
    initPricingSwitcher();
    initDemoWizard();
    initForms();
    initUtilities();
    initScrollTop();
  });
})();

