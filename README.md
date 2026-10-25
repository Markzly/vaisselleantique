# Vaisselle Antique

Website for Vaisselle Antique — antique & vintage tableware. French first,
with an FR | EN switch.

The website files are at the top of this folder, so GitHub Pages can show
the site directly.

| File / folder | What it is |
|---|---|
| `index.html` | Accueil (home) |
| `shop.html` | Tous les articles (all items, category filter, search) |
| `categories.html` | Catégories |
| `about.html` | À propos |
| `contact.html` | Contact |
| `product.html` | Sample product page |
| `css/`, `js/`, `images/` | Styles, scripts (incl. English texts in `js/i18n.js`), logo and photos |
| `TEMPLATE-NOTES.md` | Notes on the template: what to replace, where colours live, languages |
| `wordpress/` | For the real shop later: the WordPress child theme, its zip builder and the setup guide (`wordpress/WORDPRESS-SETUP.md`). Not used by the GitHub site. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. Keep it. |

## Put it on GitHub

1. On github.com: **New repository** → name it (e.g. `vaisselle-antique`) →
   **Public** → Create.
2. In the new repository: **Add file → Upload files**.
3. In Windows, open this folder, press **Ctrl+A** to select everything, and
   drag it all onto the GitHub upload page (folders keep their structure in
   Chrome or Edge). Then **Commit changes**.
4. **Settings → Pages** → Source: **Deploy from a branch** → Branch:
   **main**, folder **/ (root)** → Save.
5. After a minute or two the site is live at
   `https://<your-username>.github.io/<repository-name>/` — the link is
   shown at the top of the Pages settings.

To update later: upload the changed files the same way (GitHub replaces
files with the same name), or drag everything again.

## Preview on this computer

Double-click `index.html`.
