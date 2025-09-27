// script.js - robust preloader behavior for GitHub Pages
(function () {
  const TAG = '[preloader]';

  function log(...args) {
    if (window.console) console.log(TAG, ...args);
  }

  function init() {
    log('init start');
    const preloader = document.getElementById('preloader');
    const logoText = document.getElementById('logo-text');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress-bar');

    if (!preloader) {
      log('preloader element not found, aborting');
      return;
    }

    if (!logoText || !progressContainer || !progressBar) {
      log('missing preloader child elements', {
        logoText: !!logoText,
        progressContainer: !!progressContainer,
        progressBar: !!progressBar
      });
      // fail safe: hide preloader so site is accessible
      preloader.classList.add('fade-out');
      return;
    }

    // Wait for fonts to be ready so measurement is accurate
    const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

    fontsReady.then(() => {
      // measure text width
      const width = Math.ceil(logoText.getBoundingClientRect().width);
      log('measured logo width', width);

      // apply container width
      progressContainer.style.width = width + 'px';

      // ensure starting width is 0 to trigger transition
      progressBar.style.width = '0';

      // Force reflow and then set to 100% inside RAF so transition occurs reliably
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressBar.style.width = '100%';
        });
      });

      // When the progress bar transition of width completes, fade out preloader
      function onProgressEnd(e) {
        if (e.propertyName === 'width') {
          log('progress finished via transitionend');
          cleanup();
        }
      }

      function cleanup() {
        preloader.classList.add('fade-out');
        // optional: remove from DOM after fade animation completes
        preloader.addEventListener('transitionend', () => {
          try { preloader.remove(); log('preloader removed from DOM'); } catch (err) { /* ignore */ }
        }, { once: true });
        progressBar.removeEventListener('transitionend', onProgressEnd);
      }

      progressBar.addEventListener('transitionend', onProgressEnd);

      // safety fallback in case transitionend doesn't fire
      setTimeout(() => {
        if (!preloader.classList.contains('fade-out')) {
          log('progress fallback timeout, cleaning up');
          cleanup();
        }
      }, 3500); // slightly longer than your 3s animation
    }).catch(err => {
      log('fonts.ready error, proceeding with fallback', err);
      // fallback: use offsetWidth and animate then fade
      progressContainer.style.width = logoText.offsetWidth + 'px';
      progressBar.style.width = '100%';
      setTimeout(() => preloader.classList.add('fade-out'), 3000);
    });
  }

  // Run on load (safe) or immediately if already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // small delay just to ensure CSS is applied
    setTimeout(init, 0);
  } else {
    window.addEventListener('load', init, { once: true });
  }
})();
