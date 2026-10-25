# Vaisselle Antique — shop template

A static HTML/CSS/JS copy of the shop-grid + product-page layout: cream
background, serif wordmark, olive accent, thin hairline rules, 3-column
product grid, and a single product page with a gallery + description +
condition notice + related products.

Branding now uses your real logo and name (Vaisselle Antique) and links out
to your Instagram (`@vaisselle_antique_bis`). The layout/spacing/type/colour
were originally matched to the "rêverie" reference site's *look* — per your
notes, that's not your shop, just the aesthetic inspiration — so what's left
to swap in is the product photos and product copy, still placeholders. See
"Placeholder content" below.

## What's in here

```
(project folder)
├── index.html         → Accueil (banner, Nouveautés + "Voir plus", category tiles,
│                        Terre de fer / Blanche / Décoration sections)
├── shop.html          → Tous les articles (all items; ?cat=<slug> filters a
│                        category, ?s=<words> is the search box)
├── categories.html    → Catégories (list of categories → filtered shop)
├── about.html         → À propos (banner photo, story, empty photo slots, Instagram link)
├── contact.html       → Contact (Instagram as main channel)
├── product.html       → single product page (with "Acheter maintenant / Buy now")
├── css/
│   └── style.css      → all styles, colours & fonts as CSS variables at the top
├── js/
│   ├── i18n.js        → English texts for the FR | EN switch
│   └── main.js        → language switch, menu toggle, shop filter/search,
│                        gallery thumbnails, demo button feedback
├── images/
│   ├── logo.png          → your real logo, cropped tight and cut out to transparent
│   └── tone-1..6.jpg    → soft placeholder product photos (replace these)
├── README.md          → overview + how to put it on GitHub
├── TEMPLATE-NOTES.md  → this file
└── wordpress/         → child theme + setup guide for the real shop
```

## Languages (FR main, EN optional)

French is written directly in the HTML. Elements with `data-i18n="key"`
(or `data-i18n-attr="alt:key"` for attributes) switch to the English in
`js/i18n.js` when a visitor clicks **EN** (top left). The choice is
remembered while browsing. To add a text: give it a key in the HTML and add
the English in `i18n.js`.

This is only for previewing — on WordPress, TranslatePress does it (see
`wordpress/WORDPRESS-SETUP.md`).

Pages share the same header, category list and footer, copied into each
file. If you change one (e.g. a menu item), change it in every page.

## Preview it

Just open `index.html` in a browser. For the closest-to-real preview, serve
the folder instead of double-clicking the file (some browsers restrict
local file access oddly):

```bash
python3 -m http.server 8000   # run inside the project folder
# then visit http://localhost:8000
```

## Where to change things

Almost everything themeable lives at the top of `css/style.css`:

```css
:root {
  --color-bg:            #ffffff;   /* page background (white) */
  --color-accent-olive:  #4b4b36;   /* "View more" button, links on hover */
  --color-accent-black:  #1d1c19;   /* "Add to cart" button */
  --font-display: 'Cormorant Garamond', serif;  /* logo, product title */
  --font-body:    'Lora', serif;                /* everything else */
  --container-width: 980px;         /* overall page width */
}
```

Change a value once there and it updates everywhere it's used.

## Placeholder content — replace before launch

- **Tagline** — "from france with love" (`<p class="site-tagline">`, every
  HTML file) is still generic placeholder wording under your real logo.
  Change it to whatever line you actually want under the wordmark, or
  delete the `<p class="site-tagline">` element if you'd rather run with
  just the logo.
- **Product names, prices, descriptions** — all placeholder text I wrote,
  not copied from the reference site. Prices are shown in € (set the real
  currency in WooCommerce).
- **Home banner photo** — `images/hero.jpg` is a plain placeholder. Replace
  it with your own photo (landscape, about 1600px wide, no text on it) and
  keep the file name `hero.jpg`. The "Nouveautés" title and "Découvrir"
  button are added on top by the page; the button scrolls to the new
  products.
- **About / Contact text** — placeholder copy; replace with your own.
- **Footer links** (Politique de confidentialité, CGV) and the account /
  cart icons are still `#` — WordPress/WooCommerce creates those pages.
- **Every product links to the same `product.html`** — it's one sample
  product page; WooCommerce gives each real product its own.
- **Images** — `images/tone-1.jpg` through `tone-6.jpg` are plain soft-colour
  placeholders, reused across the grid. Replace with real photos at roughly
  square dimensions (the CSS crops to a 1:1 square via `object-fit: cover`,
  so photos don't need to be perfectly square going in).
- **"Please note" condition text** — original wording covering the same
  ground as typical antique-shop disclaimers (wear is expected, check photos
  closely, no returns, colour may vary by screen). Adjust to your actual
  policies.

## Getting this into WordPress / WooCommerce

> **Update:** this is now done as a Blocksy child theme in
> `wordpress/vaisselle-antique-child/` — follow `wordpress/WORDPRESS-SETUP.md` instead of
> pasting CSS by hand. The notes below are kept for background.

Since you're already on **Blocksy + the Home Decor starter site**, the
fastest path is usually *not* to rebuild these pages from scratch — it's to
let WooCommerce keep generating your shop/product pages, and use this CSS to
restyle them. I named classes to match on purpose:

| This template | WooCommerce's real markup | Where it lives in WP |
|---|---|---|
| `ul.products.columns-3` → `li.product` | Identical class names — this is WooCommerce's actual shop-loop output | `archive-product.php` / just the default loop |
| `.woocommerce-loop-product__title`, `.price`, `.woocommerce-Price-amount` | Identical | product title & price in the loop |
| `.summary.entry-summary`, `.product_title`, `.single_add_to_cart_button` | Identical | `single-product.php` |
| `.woocommerce-product-gallery` | Identical wrapper class | product image gallery |
| Header / logo / nav / search | Custom — this is regular theme markup, not WooCommerce | Blocksy's header builder |
| Category list sidebar | Custom (`.category-widget`) — pair with WooCommerce's real "Product Categories" widget | a widget area / sidebar |
| Footer | Custom | Blocksy's footer builder |

**Practical steps:**

1. In WP Admin, go to **Blocksy → Custom CSS** (or **Appearance → Customize
   → Additional CSS**) and paste in the contents of `css/style.css`, minus
   the header/footer/nav rules — Blocksy already builds those, so let its
   header/footer builder handle branding, nav, and search, and use its
   options (or the CSS variables here for colour/font matching) to match this
   palette and type.
2. The `.products`, `.product`, `.price`, `.summary`, `.single_add_to_cart_button`
   etc. rules can go in close to as-is, since those class names come straight
   from WooCommerce.
3. Once you've got a couple of real products entered, view the shop page's
   source (right-click → View Page Source, or your browser's inspector) and
   confirm the actual class names Blocksy/WooCommerce output match what's in
   this stylesheet — themes occasionally add an extra wrapper div or a
   modifier class, and it's easier to nudge a couple of selectors than to
   guess blind.
4. **Gallery thumbnails**: WooCommerce's native gallery is a slider
   (Flexslider), not the static grid-of-thumbnails shown in your reference
   screenshot. The `.gallery-thumbs` CSS here recreates that grid look with
   a small script (`js/main.js`), but wiring it to WooCommerce's real gallery
   HTML will take a bit more work than a straight CSS paste — it may be
   simpler to just restyle WooCommerce's default slider dots/thumbnails to
   fit this palette instead of fighting its structure.
5. Since you're building the homepage in **Elementor AI**, you can also just
   use this file open side-by-side as a visual reference — matching the
   spacing, type sizes, and colours by eye — rather than pasting CSS at all.

## Notes

- `images/logo.png` is your uploaded artwork, cropped tight to the wordmark
  and with the white background cut to transparency, so it sits cleanly on
  the cream page background instead of showing a white box. When you're in
  Blocksy, you can upload this same file directly as your site logo in its
  header builder rather than fighting this custom `.site-logo img` CSS.
- Fonts are loaded from Google Fonts (`Cormorant Garamond` + `Lora`) via the
  `<link>` tags in each HTML file's `<head>`. Same fonts are easy to add in
  Blocksy under **Typography** if you want them site-wide.
- The layout is responsive (3 → 2 → 1 columns) down to mobile widths, and
  focus states are visible for keyboard navigation.
- "Add to cart" here just shows a quick visual confirmation — there's no
  real cart, that's what WooCommerce will handle once this is live.
