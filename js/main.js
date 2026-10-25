/* ==========================================================================
   VAISSELLE ANTIQUE — template interactions
   ==========================================================================
   Everything here is presentation-only. Once this is a real WooCommerce
   theme, WooCommerce's own JS handles "Add to cart", its gallery has its
   own slider script, TranslatePress handles FR/EN and WooCommerce handles
   categories and search. It's here so the static template feels alive
   while you're previewing it.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var I18N = window.VA_I18N || { fr: {}, en: {} };
  var currentLang = 'fr';

  function t(key) {
    var dict = I18N[currentLang] || {};
    return dict[key] !== undefined ? dict[key] : (I18N.fr[key] || '');
  }

  /* ---- Mobile nav toggle ------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---- Shop page: category filter (?cat=slug) and search (?s=term) ------
     Runs before the language is applied, so the heading it sets is picked
     up as the French original. */
  var shopGrid = document.querySelector('[data-shop-grid]');

  function normalize(str) {
    return (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  if (shopGrid) {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get('cat');
    var term = (params.get('s') || '').trim();
    var heading = document.getElementById('shop-title');
    var emptyMsg = document.querySelector('.shop-empty');
    var items = shopGrid.querySelectorAll('li.product');
    var words = normalize(term).split(/\s+/).filter(Boolean);
    var shown = 0;

    items.forEach(function (item) {
      var title = item.querySelector('.woocommerce-loop-product__title');
      var key = title.getAttribute('data-i18n');
      var haystack = normalize(title.textContent + ' ' + ((I18N.en || {})[key] || ''));
      var cats = (item.getAttribute('data-cat') || '').split(' ');
      // Every search word must appear (in French or English), in any order.
      var match = (!cat || cats.indexOf(cat) !== -1) &&
        words.every(function (w) { return haystack.indexOf(w) !== -1; });
      item.hidden = !match;
      if (match) { shown++; }
    });

    if (cat && heading) {
      var catLink = document.querySelector('.category-widget a[data-cat="' + cat + '"]');
      if (catLink) {
        heading.innerHTML = catLink.innerHTML;
        heading.setAttribute('data-i18n', catLink.getAttribute('data-i18n'));
        catLink.classList.add('active');
        catLink.setAttribute('aria-current', 'page');
      }
    } else if (term && heading) {
      heading.textContent = 'Résultats de recherche';
      heading.setAttribute('data-i18n', 'searchResults');
    }

    var searchInput = document.getElementById('site-search');
    if (term && searchInput) { searchInput.value = term; }

    if (emptyMsg) { emptyMsg.hidden = shown > 0; }
  }

  /* ---- Language switch (FR main, EN optional) ----------------------------
     The first run stores each element's French original in data-fr, so
     switching back to FR restores it exactly. */
  function render(el) {
    if (el.dataset.fr === undefined) { el.dataset.fr = el.innerHTML; }
    var key = el.getAttribute('data-i18n');
    var en = (I18N.en || {})[key];
    el.innerHTML = (currentLang === 'en' && en !== undefined) ? en : el.dataset.fr;
  }

  function renderAttrs(el) {
    el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
      var parts = pair.split(':');
      var attr = parts[0].trim();
      var key = parts.slice(1).join(':').trim();
      var store = 'fr' + attr.replace(/(^|-)(\w)/g, function (m, d, c) { return c.toUpperCase(); });
      if (el.dataset[store] === undefined) { el.dataset[store] = el.getAttribute(attr) || ''; }
      var en = (I18N.en || {})[key];
      var value = (currentLang === 'en' && en !== undefined) ? en : el.dataset[store];
      // Attributes can't hold entities, so decode &amp; and friends.
      var tmp = document.createElement('textarea');
      tmp.innerHTML = value;
      el.setAttribute(attr, tmp.value);
    });
  }

  function applyLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'fr';
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(render);
    document.querySelectorAll('[data-i18n-attr]').forEach(renderAttrs);
    document.querySelectorAll('.gallery-thumbs .thumb').forEach(function (thumb, i) {
      thumb.setAttribute('aria-label', t('showPhoto') + ' ' + (i + 1));
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === currentLang ? 'true' : 'false');
    });
    try { localStorage.setItem('va-lang', currentLang); } catch (e) { /* storage blocked: still works for this page */ }
  }

  var savedLang = 'fr';
  try { savedLang = localStorage.getItem('va-lang') || 'fr'; } catch (e) { /* ignore */ }
  applyLang(savedLang);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-lang')); });
  });

  /* ---- Product gallery: click a thumbnail to swap the main image ------- */
  var mainImage = document.getElementById('main-product-image');
  var thumbs = document.querySelectorAll('.gallery-thumbs .thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var fullSrc = thumb.getAttribute('data-full');
      if (mainImage && fullSrc) {
        mainImage.setAttribute('src', fullSrc);
      }
      thumbs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      thumb.classList.add('active');
      thumb.setAttribute('aria-pressed', 'true');
    });
  });

  /* ---- "Add to cart" / "Buy now" placeholder feedback -------------------
     Real WooCommerce buttons submit a form ("Buy now" then goes straight to
     checkout). These just give a quick visual confirmation so clicking
     around this static demo feels complete. Safe to remove once wired up
     to WooCommerce. */
  function flash(btn, messageKey) {
    clearTimeout(btn._resetTimer);
    btn.textContent = t(messageKey);
    // render() puts back the label in whichever language is current.
    btn._resetTimer = setTimeout(function () { render(btn); }, 1400);
  }

  document.querySelectorAll('.single_add_to_cart_button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      flash(btn, 'added');
    });
  });

  document.querySelectorAll('.buy-now-button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      flash(btn, 'toCheckout');
    });
  });

});
