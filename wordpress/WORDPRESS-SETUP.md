# Vaisselle Antique — WordPress setup & adding products

How the pieces fit together:

- **Hostinger** hosts the site (WordPress hosting plan).
- **WooCommerce** stores products, stock, orders and payments. You add and
  edit everything in WP Admin; no code needed.
- **Blocksy** (parent theme) builds the header, footer, menu and page layout.
- **Vaisselle Antique child theme** (`wordpress/vaisselle-antique-child/`)
  adds the look of the HTML pages at the top of the project folder to
  whatever WooCommerce shows, plus — on
  **every** product automatically — the "À noter" condition notice, the
  **Acheter maintenant / Buy now** button and the
  "Retour à tous les articles" link.
- **TranslatePress** makes the site French (main) + English, with an
  **FR | EN** switch, including each product you add.

The HTML pages at the top of the project folder (`index.html` etc.) stay as
the visual reference — open `index.html` in a browser, or view the GitHub
Pages site, to see every page in FR and EN. They are not uploaded to
WordPress.

---

## 1. Hostinger

1. Choose a **WordPress hosting** plan (any plan that lists WooCommerce
   support). Not the "Website Builder" — that one can't run WooCommerce
   with this theme.
2. Register or connect your domain, and make sure the free **SSL** is
   active (hPanel → Security → SSL). Payments need `https://`.
3. In hPanel, install WordPress with the auto-installer. When asked:
   - **Language: Français.**
   - If it offers an AI-made site, a starter theme or a "WooCommerce
     store" template, skip it — you'll use Blocksy instead (section 2).
4. Hostinger installs **LiteSpeed Cache**. Keep it: it already knows not to
   cache the cart and checkout. After you upload a new version of the
   child theme, use **LiteSpeed Cache → Purge All** so visitors get the
   new styles.
5. Hostinger may also add its own helper plugins (e.g. "Hostinger Tools",
   AI assistant). They're optional; deactivate any you don't use.
6. Most plans include e-mail accounts — create e.g. `contact@yourdomain`
   in hPanel → Emails, and use it in WooCommerce → Settings → Emails.

## 2. Install the theme (in this order)

1. **Apparence → Thèmes → Ajouter**: install **Blocksy** and, when it
   offers, the **Blocksy Companion** plugin.
2. **Extensions → Ajouter**: install and activate **WooCommerce**, then run
   its setup wizard (address, currency, etc. — see section 6).
3. Build the theme zip on this computer (from the project folder):
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\wordpress\build-theme-zip.ps1
   ```
   This creates `wordpress/dist/vaisselle-antique-child-<version>.zip`.
4. **Apparence → Thèmes → Ajouter → Téléverser un thème**, choose that zip,
   then **Activer** "Vaisselle Antique". Blocksy must stay installed (it's
   the parent) — just don't activate it directly.

> **Activate the child theme before you customise anything.** Customizer
> settings are saved per theme, so settings made while plain Blocksy is
> active don't carry over. If you've already customised Blocksy, use
> Blocksy Companion's Customizer export/import to move them across.

If you import the **Home Decor starter site**, do it with the child theme
already active, for the same reason.

**Then: Tableau de bord → Mises à jour → Mettre à jour les traductions.**
Without this, WooCommerce's own texts stay in English ("Add to cart",
"1 in stock") even on a French site. Run it again after plugin updates if
English texts reappear.

## 3. French (main) + English, with an FR | EN switch

**Plugin: TranslatePress – Multilingual (free).**

Why it fits this shop:
- One product = one product. The English version is a translation layer on
  the same item, so **stock is shared automatically** — when a one-of-a-
  kind plate sells in English, it's sold out in French too.
- You translate visually: open any page, click a text, type the English.
- The free version covers one extra language, which is exactly FR + EN.
- WooCommerce's own texts (Ajouter au panier / Add to cart, Panier,
  Commande…) and this theme's texts already exist in both languages.

Setup:
1. **Réglages → Général → Langue du site: Français.**
2. Install **TranslatePress – Multilingual**, then **Réglages →
   TranslatePress → Général**:
   - **Default language: Français**
   - **All languages:** add **English**
   - Language names: choose the short codes so the switch reads **FR | EN**.
3. The switch: **Réglages → TranslatePress → Language Switcher** → enable
   the **menu item** option, then **Apparence → Menus** → add the
   "Language Switcher" item to your main menu (or put the shortcode
   `[language-switcher]` in an HTML element in Blocksy's header builder, top
   left, as in the template).
4. Optional: TranslatePress → Automatic Translation, connect Google
   Translate to pre-fill English drafts, then correct them. Always review
   machine translations of condition descriptions.

English visitors get `yourdomain/en/…`; French stays at the main address.
Translated URL slugs (e.g. `/en/product/plate…`) need TranslatePress's
paid SEO Pack — nice to have, not required.

Alternative if you outgrow it: **WPML + WooCommerce Multilingual** (paid
yearly). The child theme works with either; nothing needs to change.

## 4. Pages & menu (Accueil, Catégories, À propos, Contact)

The template's pages map to WordPress like this:

| Template page | In WordPress |
|---|---|
| `index.html` Accueil | Built automatically by the child theme — see **"The home page"** below. |
| `shop.html` Tous les articles | WooCommerce's **Boutique** page — created automatically. Search results and categories use it too. |
| `categories.html` Catégories | **Pages → Ajouter** "Catégories" with the **Product Categories List** block. Each category page is automatic (`/categorie-produit/terre-de-fer/`). |
| `about.html` À propos | **Pages → Ajouter** "À propos" — your story, a photo, an Instagram button. |
| `contact.html` Contact | **Pages → Ajouter** "Contact" — Instagram button; optionally a form plugin (WPForms Lite) later. |

**Categories:** create these three in **Produits → Catégories**. Use exactly
these *slugs* (the home page looks for them):

| Nom (FR) | Slug | English (in TranslatePress) |
|---|---|---|
| Terre de fer | `terre-de-fer` | Ironstone |
| Blanche | `blanche` | White |
| Décoration | `decoration` | Decoration |

Give each category a **thumbnail** photo (same screen) — that's the picture
on its home page tile. Drag the categories into the order you want; the
tiles follow it. A product can be in several categories (e.g. a white
jug in both *Blanche* and *Décoration*).

### The home page (updates itself)

1. **Pages → Ajouter**, title "Accueil". Add a **Code court (Shortcode)**
   block containing only:
   ```
   [vaisselle_home]
   ```
2. In Blocksy's page options for this page (right sidebar), **disable the
   page title** and keep the normal content width.
3. **Publier**, then **Réglages → Lecture → Une page statique → Page
   d'accueil: Accueil**.
4. **Personnaliser → Vaisselle Antique → Photo de la bannière d'accueil**:
   choose your banner photo (landscape, ~1600px wide, no text on it).

That's all. The page then shows, top to bottom — same design as
`index.html`:
- the banner with **Nouveautés** and **Découvrir** (scrolls down);
- **Nouveautés:** your 6 newest products + the black **Voir plus** button;
- **Catégories:** a tile for each category that has products;
- a section for **Terre de fer**, **Blanche** and **Décoration** — the 3 newest
  of each, with **Voir tout**.

Every product you publish appears there automatically, newest first —
nothing to edit day to day. To change which category sections appear, or
their order, edit **Personnaliser → Vaisselle Antique → Sections de
catégories sur la page d'accueil** (slugs separated by commas, e.g.
`terre-de-fer,blanche,decoration`).

Tip: sold pieces (stock 0) can be hidden everywhere with **WooCommerce →
Réglages → Produits → Inventaire → Masquer les produits en rupture de
stock**, so the home page only shows what's available.

Menu: **Apparence → Menus** (or Blocksy's header builder) → ACCUEIL,
CATÉGORIES, À PROPOS, CONTACT + the language
switcher. Footer: *Politique de confidentialité*, *CGV*, *Mentions légales*.

## 5. Match the template's look (Blocksy Customizer)

**Apparence → Personnaliser.** The child theme handles product cards and
the product page; these Blocksy settings handle the rest. Exact menu names
can vary slightly between Blocksy versions.

| Setting | Value |
|---|---|
| Colours → page / site background | `#ffffff` (white) |
| Colours → text | `#2e2c27` |
| Colours → borders | `#e6e1d6` |
| Colours → buttons / accent | `#4b4b36` (hover `#3a3a29`) |
| Typography → headings | Cormorant Garamond, weight 500 |
| Typography → body | Lora, weight 400 |
| Header | logo `images/logo.png`, centred, max ~300px; tagline "from france with love"; menu (section 4); search + account + cart icons; language switch top left |
| WooCommerce → Catalogue → columns | 3 |
| Shop product card | image ratio 1:1, hide the "Ajouter au panier" button on cards (the template shows only photo, name, price) |
| Single product | gallery with thumbnails below the main image. The order of title / price / short description / buttons is set in Blocksy's single product "layers". Blocksy's "AJAX add to cart" can stay on — the theme makes Buy now go to checkout either way (tested) |
| Container width | ~980px |

Then, in **Personnaliser → Vaisselle Antique**, check the condition notice.
Leave it empty to use the default text (French, with
English for English visitors); type your own if your policies differ, and
translate your text in TranslatePress like any other page text.

## 6. WooCommerce settings worth setting once

- **WooCommerce → Réglages → Général → Devise:** Euro (€). Prices then show
  as `85,00 €` everywhere. (Set decimals to 0 if you prefer `85 €`.)
- **Produits → Inventaire:** enable stock management.
- **Expédition:** create zones (e.g. France, Europe, Reste du monde) with
  rates — that's what "Livraison internationale disponible" promises.
- **Paiements:** **WooPayments** or **Stripe** (cards, Apple/Google Pay)
  and/or **PayPal**. Each is a free plugin; you connect your account. Test
  one order with the plugin's test mode before launch.
- **Comptes et confidentialité:** link your Privacy Policy page.

## 7. Adding a product (the everyday task)

**Produits → Ajouter.** Write it in French first. Where each part of the
template comes from:

| On the page | Where you fill it in |
|---|---|
| Title | Product name (top) |
| Price | Données produit → Général → Tarif régulier (Tarif promo for reductions) |
| Main photo | Image produit (right sidebar). Any size; it's cropped to a square. ~1200px wide is plenty |
| Thumbnails | Galerie produit (right sidebar) — all angles and close-ups of marks |
| Stock (not shown on the page) | Inventaire → Suivre le stock → Quantité `1` |
| No quantity box | Inventaire → tick **Vendre individuellement** (one-of-a-kind pieces) |
| Text next to the buttons | **Description courte du produit** (box under the main editor) |
| Longer story / details tab | Main description editor |
| Réf. (Item No.) | Inventaire → UGS / SKU (e.g. `AT-0142`) |
| Dimensions | Attributs → add "Dimensions" → tick "Visible sur la page produit" |
| Category list | Catégories (right sidebar) |
| À noter / **Acheter maintenant** / back link | Automatic — nothing to do |

Then **Publier**, open the product on the site, click **Translate Page**
in the admin bar and add the English title, short description and
attributes.

Reviews: WooCommerce turns customer reviews **on** by default, which shows
an "Avis (0)" tab under each product. To remove it, untick **Réglages →
Produits → Activer les avis**. Don't add stars by hand.

## 8. Selling with Instagram

Since most sales happen on Instagram, link the two:
- Put the shop address in your Instagram bio, and share product links in
  stories (link sticker) — each product page has its own URL.
- Optional: the **Facebook for WooCommerce** plugin (by Meta) syncs your
  products to a Meta catalogue, so you can tag products in Instagram posts
  (Instagram Shopping). It needs an Instagram professional account and
  Meta's approval for your country/shop, so treat it as a later step.
- When a piece sells on Instagram, set its stock to 0 in WooCommerce so it
  can't be bought twice.

## 9. Before launch — legal check

Not legal advice — a checklist of questions to confirm, e.g. with your
local chamber of commerce (CCI) or URSSAF if you're in France:

- **Business status.** Regularly buying items to resell for profit — on
  Instagram or a website — is usually treated as a professional activity,
  which means registering (in France often as a *micro-entreprise*).
  Second-hand dealers in France also generally have to declare the
  activity and keep a *registre des objets mobiliers* (livre de police).
- **Returns.** The default notice says returns aren't accepted. Business
  sellers to EU consumers generally must allow a **14-day right of
  withdrawal** on online sales, and antiques aren't automatically exempt.
  Adjust the notice in **Personnaliser → Vaisselle Antique** once you
  know your position.
- French sites selling online also need *Mentions légales*, *CGV* (terms
  of sale) and a privacy policy, plus a cookie banner if you add tracking
  or analytics.

## 10. Changing the theme later

1. Edit files in `wordpress/vaisselle-antique-child/` (styles: `assets/css/shop.css`).
2. Raise `Version:` in `wordpress/vaisselle-antique-child/style.css` and
   `VAISSELLE_VERSION` in `functions.php` (e.g. 1.1.1) — this also clears
   visitors' cached CSS.
3. Run `wordpress\build-theme-zip.ps1`, then upload the new zip in **Apparence →
   Thèmes → Ajouter → Téléverser un thème** and choose **Remplacer
   l'actuel par la version téléversée**. Purge LiteSpeed Cache. Your
   products and settings are untouched.

New theme texts must use the `vaisselle-antique` text domain and be added to
`languages/vaisselle-antique.pot`, `fr_FR.po` and `fr_FR.l10n.php`.
