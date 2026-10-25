/* ==========================================================================
   VAISSELLE ANTIQUE — translations for the static template
   ==========================================================================
   French is the main language and is written directly in the HTML.
   Any element with data-i18n="key" (text) or data-i18n-attr="attr:key"
   (alt, placeholder, aria-label…) is switched to the English below when a
   visitor picks EN. main.js does the switching.

   To add a text: give the element a data-i18n key in the HTML and add the
   English here. "fr" only holds texts that exist in JS, not in the HTML.

   On the real WordPress site, TranslatePress does this job instead.
   ========================================================================== */

window.VA_I18N = {
  fr: {
    added:        'Ajouté ✓',
    toCheckout:   'Vers le paiement…',
    showPhoto:    'Afficher la photo'
  },

  en: {
    /* ---- Runtime (JS) ---- */
    added:        'Added ✓',
    toCheckout:   'Going to checkout…',
    showPhoto:    'Show photo',

    /* ---- Page titles ---- */
    titleHome:       'Antique — From France with Love',
    titleShop:       'All items — Vaisselle Antique',
    titleCategories: 'Categories — Vaisselle Antique',
    titleAbout:      'About — Vaisselle Antique',
    titleContact:    'Contact — Vaisselle Antique',
    titleProduct:    'Hand-Blown Glass Apothecary Jar — Vaisselle Antique',

    /* ---- Header ---- */
    account:     'My account',
    cart:        'Cart',
    toggleMenu:  'Toggle menu',
    navHome:     'HOME',
    navAbout:    'ABOUT',
    navCats:     'CATEGORIES',
    navContact:  'CONTACT',
    searchLabel: 'Search products',
    search:      'Search',

    /* ---- Shared ---- */
    viewMore:       'View more',
    categoryTitle:  'Category',
    instagramLabel: 'Vaisselle Antique on Instagram',
    privacy:        'Privacy Policy',
    terms:          'Terms of Sale',

    /* ---- Categories (keys are the URL slugs) ---- */
    'cat:terre-de-fer':    'Ironstone',
    'cat:blanche':         'White',
    'cat:decoration':      'Decoration',

    /* ---- Products (placeholders) ---- */
    p1:  'Hand-Blown Glass Apothecary Jar',
    p2:  'Simple Ceramic Mustard Pot',
    p3:  'Hand-Painted Ironstone Plate',
    p4:  'Small Blown-Glass Preserve Jar (a)',
    p5:  'Small Blown-Glass Preserve Jar (b)',
    p6:  'Small Blown-Glass Preserve Jar (c)',
    p7:  'Floral Transferware Dessert Plate',
    p8:  'Demitasse Cup &amp; Saucer, Lily of the Valley',
    p9:  'Footed Pressed-Glass Tumbler',
    p10: 'Relief-Pattern Ironstone Dinner Plate',
    p11: 'Octagonal Pearl-Rim Dinner Plate',
    p12: 'Bird &amp; Vine Motif Dessert Plate',

    /* ---- Home hero ---- */
    heroTitle:   'New arrivals',
    heroCta:     'Discover',
    heroAlt:     'Antique tableware on shelves',
    newArrivals: 'New arrivals',
    viewAll:     'View all',

    /* ---- Shop page ---- */
    allItems:      'All items',
    searchResults: 'Search results',
    shopEmpty:     'No items match yet.',
    seeAll:        'See all items',

    /* ---- Categories page ---- */
    categoriesHeading: 'Categories',

    /* ---- Product page ---- */
    addToCart:     'Add to cart',
    buyNow:        'Buy now',
    desc1:         'Blown in the early 1900s for a village pharmacy, this jar carries the soft imperfections of handwork — tiny bubbles suspended in the glass and a gentle waver along the body.',
    desc2:         'It\'s a smaller example of a shape usually found much larger, which makes it easy to place: a side table, a bathroom shelf, anywhere it can catch the light.',
    desc3:         'The lid sits in place but doesn\'t seal tightly, so it\'s best suited to dry storage rather than anything airtight.',
    metaDimLabel:  'Dimensions:',
    metaDimValue:  'approx. 11cm diameter &times; 19cm height',
    metaSkuLabel:  'Item No.',
    noteTitle:     'Please note',
    note1:         'Every piece we carry is antique, vintage, or secondhand. Wear consistent with age — small marks, light scratching, faint traces of use — is part of the piece\'s history, not a flaw, and it\'s priced and described with that in mind.',
    note2:         'We do our best to photograph and describe each item\'s condition in detail. Please look closely at the photos before ordering, as very minor marks or glaze irregularities don\'t always show up on camera.',
    note3:         'Actual colour can vary slightly from the photos shown, depending on your screen.',
    note4:         'These are antique and vintage tableware pieces, sold as decorative objects; how you use them is left to your judgement.',
    note5:         'Packaging may include reused materials — thank you for your understanding. We\'re unable to accept returns, so please make sure you\'re comfortable with an item\'s condition before ordering.',
    backToAll:     '&larr; Back to all items',
    backToAllBtn:  'Back to all items',
    recentlyViewed: 'Recently Viewed',
    moreFromShop:   'More From the Shop',

    /* ---- About page (placeholder copy — replace with your own) ---- */
    aboutHeading: 'About',
    about1:       'Vaisselle Antique is a small selection of antique and vintage tableware: ironstone plates, blown glass, cups and pots, each one found by hand.',
    about2:       'Every piece is chosen for its history and charm, carefully cleaned, then photographed from every angle so you know exactly what you\'ll receive.',
    about3:       'The shop began on Instagram, where every new find is shown first. Follow along to see new pieces before anyone else.',
    followInstagram: 'Follow on Instagram',
    aboutKicker:     'our story',
    aboutDiscover:   'discover',
    aboutBannerAlt:  'Shelf of antique blue and white earthenware',
    aboutQuote:      'Antique tableware,<br>French charm',
    aboutPhoto1:     'Blue-bird earthenware',
    aboutPhoto2:     'Floral porcelain',
    aboutPhoto3:     'Gilded brass',
    aboutPhoto4:     'Timeless white',
    aboutStoryText:  'Every shelf tells a story: a white coffee pot, a glass bottle, a gilded brass casket… then, up close, the details that give them their charm.',
    storyAlt1:       'Blue-bird earthenware teapot and plate with glass candlesticks',
    storyAlt2:       'Floral porcelain coffee set on a wooden shelf',
    storyAlt3:       'White coffee pot, glass bottle and gilded brass casket on a shelf',
    storyAlt4:       'Glass bottle and gilded brass casket',
    storyAlt5:       'White panelled coffee pot, cup and saucer',
    aboutFindsTitle: 'Our Finds',
    aboutFindsText:  'Simple, singular pieces found in France, to dress your table with character.',
    aboutSeeShop:    'see the shop',

    /* ---- Contact page ---- */
    contactHeading: 'Contact',
    contact1:       'The easiest way to reach us is a message on Instagram.',
    contact2:       'A question about a piece, its condition or shipping? Include its item number (e.g. AT-0142) and we\'ll get back to you as soon as we can.',
    messageInstagram: 'Message us on Instagram'
  }
};
