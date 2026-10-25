<?php
/**
 * Vaisselle Antique — Blocksy child theme.
 *
 * What this adds on top of Blocksy + WooCommerce:
 *  - the template's fonts and shop styles (assets/css/shop.css)
 *  - a "Please note" condition notice on every product page
 *  - a "Buy now" button under Add to cart (adds to cart → checkout)
 *  - a "Back to all items" link under the product summary
 *  - [vaisselle_home]: the whole home page, built from your products
 *
 * It also hides the "1 in stock" line and the related products.
 *
 * The notice text is editable in Appearance → Customize →
 * Vaisselle Antique. Every visible string is translatable (text domain
 * "vaisselle-antique"; French ships in /languages).
 *
 * @package Vaisselle_Antique
 */

defined( 'ABSPATH' ) || exit;

define( 'VAISSELLE_VERSION', '1.2.4' );

/* -------------------------------------------------------------------------
   Translations
   ------------------------------------------------------------------------- */
add_action( 'after_setup_theme', function () {
	load_child_theme_textdomain( 'vaisselle-antique', get_stylesheet_directory() . '/languages' );
} );

/* -------------------------------------------------------------------------
   Styles & fonts
   ------------------------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'blocksy-parent-style', get_template_directory_uri() . '/style.css', array(), VAISSELLE_VERSION );

	/*
	 * Google Fonts. To self-host instead (often preferred for GDPR in the EU),
	 * set the fonts in Blocksy → Customizer → Typography and return false from
	 * this filter: add_filter( 'vaisselle_load_google_fonts', '__return_false' );
	 */
	if ( apply_filters( 'vaisselle_load_google_fonts', true ) ) {
		wp_enqueue_style(
			'vaisselle-fonts',
			'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap',
			array(),
			null
		);
	}

	wp_enqueue_style(
		'vaisselle-shop',
		get_stylesheet_directory_uri() . '/assets/css/shop.css',
		array( 'blocksy-parent-style' ),
		VAISSELLE_VERSION
	);

	if ( function_exists( 'is_product' ) && is_product() ) {
		wp_enqueue_script(
			'vaisselle-buy-now',
			get_stylesheet_directory_uri() . '/assets/js/buy-now.js',
			array(),
			VAISSELLE_VERSION,
			true
		);
	}
}, 20 );

/* -------------------------------------------------------------------------
   Customizer: editable shop texts
   Leave a field empty to use the built-in (translated) default text.
   ------------------------------------------------------------------------- */
function vaisselle_default_condition_notice() {
	return implode( "\n\n", array(
		__( 'Every piece we carry is antique, vintage, or secondhand. Wear consistent with age — small marks, light scratching, faint traces of use — is part of the piece\'s history, not a flaw, and it\'s priced and described with that in mind.', 'vaisselle-antique' ),
		__( 'We do our best to photograph and describe each item\'s condition in detail. Please look closely at the photos before ordering, as very minor marks or glaze irregularities don\'t always show up on camera.', 'vaisselle-antique' ),
		__( 'Actual colour can vary slightly from the photos shown, depending on your screen.', 'vaisselle-antique' ),
		__( 'These are antique and vintage tableware pieces, sold as decorative objects; how you use them is left to your judgement.', 'vaisselle-antique' ),
		__( 'Packaging may include reused materials — thank you for your understanding. We\'re unable to accept returns, so please make sure you\'re comfortable with an item\'s condition before ordering.', 'vaisselle-antique' ),
	) );
}

add_action( 'customize_register', function ( $wp_customize ) {
	$wp_customize->add_section( 'vaisselle_shop', array(
		'title'       => __( 'Vaisselle Antique', 'vaisselle-antique' ),
		'description' => __( 'Texts shown on every product page. Leave a field empty to use the default text, which is already translated into French.', 'vaisselle-antique' ),
		'priority'    => 160,
	) );

	$wp_customize->add_setting( 'vaisselle_show_condition_notice', array(
		'default'           => true,
		'sanitize_callback' => 'wp_validate_boolean',
	) );
	$wp_customize->add_control( 'vaisselle_show_condition_notice', array(
		'section' => 'vaisselle_shop',
		'type'    => 'checkbox',
		'label'   => __( 'Show the "Please note" condition notice', 'vaisselle-antique' ),
	) );

	$wp_customize->add_setting( 'vaisselle_condition_notice', array(
		'default'           => '',
		'sanitize_callback' => 'wp_kses_post',
	) );
	$wp_customize->add_control( 'vaisselle_condition_notice', array(
		'section'     => 'vaisselle_shop',
		'type'        => 'textarea',
		'label'       => __( 'Condition notice text', 'vaisselle-antique' ),
		'description' => __( 'Separate paragraphs with a blank line.', 'vaisselle-antique' ),
	) );

	// Home page ([vaisselle_home])
	$wp_customize->add_setting( 'vaisselle_hero_image', array(
		'default'           => '',
		'sanitize_callback' => 'esc_url_raw',
	) );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'vaisselle_hero_image', array(
		'section'     => 'vaisselle_shop',
		'label'       => __( 'Home page banner photo', 'vaisselle-antique' ),
		'description' => __( 'Leave empty to use the placeholder. Best: a landscape photo about 1600px wide, with no text on it.', 'vaisselle-antique' ),
	) ) );

	$wp_customize->add_setting( 'vaisselle_home_categories', array(
		'default'           => '',
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'vaisselle_home_categories', array(
		'section'     => 'vaisselle_shop',
		'type'        => 'text',
		'label'       => __( 'Category sections on the home page', 'vaisselle-antique' ),
		'description' => __( 'Category slugs, separated by commas, in the order you want. Default: terre-de-fer,blanche,decoration. Empty categories are skipped.', 'vaisselle-antique' ),
	) );
} );

/* -------------------------------------------------------------------------
   Single product page additions
   WooCommerce summary order: title 5, rating 10, price 10, excerpt 20,
   add to cart 30, meta 40, sharing 50.
   The short description stays where Blocksy puts it (its own summary
   "layers" — reorder them in Customize → WooCommerce → Single Product);
   moving it here as well made it appear twice.
   ------------------------------------------------------------------------- */
add_action( 'init', function () {
	add_action( 'woocommerce_single_product_summary', 'vaisselle_condition_notice', 45 );
	add_action( 'woocommerce_single_product_summary', 'vaisselle_back_to_shop_link', 60 );
} );

// No "1 in stock" line on product pages (stock is still tracked; sold-out
// pieces can't be bought).
add_filter( 'woocommerce_get_stock_html', '__return_empty_string' );

// No related products ("More like this") under the product.
add_filter( 'woocommerce_related_products', '__return_empty_array' );

function vaisselle_condition_notice() {
	if ( ! get_theme_mod( 'vaisselle_show_condition_notice', true ) ) {
		return;
	}
	$text = trim( (string) get_theme_mod( 'vaisselle_condition_notice', '' ) );
	if ( '' === $text ) {
		$text = vaisselle_default_condition_notice();
	}
	echo '<div class="va-condition-notice">';
	echo '<h2>' . esc_html__( 'Please note', 'vaisselle-antique' ) . '</h2>';
	echo wp_kses_post( wpautop( $text ) );
	echo '</div>';
}

/* -------------------------------------------------------------------------
   "Buy now" button: adds the product to the cart and goes straight to
   checkout. It submits the normal add-to-cart form, with ?va_buy_now=1 added
   to the URL (formaction), so WooCommerce's own add-to-cart code runs as
   usual and only the redirect changes.
   ------------------------------------------------------------------------- */
add_action( 'woocommerce_after_add_to_cart_button', 'vaisselle_buy_now_button' );

function vaisselle_buy_now_button() {
	global $product;
	if ( ! $product instanceof WC_Product || $product->is_type( 'external' ) || ! $product->is_purchasable() || ! $product->is_in_stock() ) {
		return;
	}
	printf(
		'<button type="submit" name="add-to-cart" value="%1$d" formaction="%2$s" class="button alt va-buy-now-button">%3$s</button>',
		absint( $product->get_id() ),
		esc_url( add_query_arg( 'va_buy_now', '1', $product->get_permalink() ) ),
		esc_html__( 'Buy now', 'vaisselle-antique' )
	);
}

function vaisselle_is_buy_now_request() {
	return ! empty( $_REQUEST['va_buy_now'] ); // phpcs:ignore WordPress.Security.NonceVerification -- same as WooCommerce's add-to-cart, which has no nonce.
}

// After a successful add, go to checkout instead of back to the product.
add_filter( 'woocommerce_add_to_cart_redirect', function ( $url ) {
	return vaisselle_is_buy_now_request() ? wc_get_checkout_url() : $url;
}, 99 );

// No "added to your cart" message on the checkout page for Buy now.
add_filter( 'wc_add_to_cart_message_html', function ( $message ) {
	return vaisselle_is_buy_now_request() ? '' : $message;
}, 99 );

// One-of-a-kind item already in the cart: WooCommerce would refuse to add it
// again and stay on the product page, so go straight to checkout instead.
// Runs just before WooCommerce's add-to-cart handler (wp_loaded, 20).
add_action( 'wp_loaded', function () {
	if ( ! vaisselle_is_buy_now_request() || empty( $_REQUEST['add-to-cart'] ) || ! function_exists( 'WC' ) || ! WC()->cart ) { // phpcs:ignore WordPress.Security.NonceVerification
		return;
	}
	$product = wc_get_product( absint( $_REQUEST['add-to-cart'] ) ); // phpcs:ignore WordPress.Security.NonceVerification
	if ( $product && $product->is_type( 'simple' ) && $product->is_sold_individually()
		&& WC()->cart->find_product_in_cart( WC()->cart->generate_cart_id( $product->get_id() ) ) ) {
		wp_safe_redirect( wc_get_checkout_url() );
		exit;
	}
}, 19 );

function vaisselle_back_to_shop_link() {
	$shop_url = wc_get_page_permalink( 'shop' );
	if ( ! $shop_url ) {
		return;
	}
	printf(
		'<a href="%s" class="va-back-to-shop">&larr; %s</a>',
		esc_url( $shop_url ),
		esc_html__( 'Back to all items', 'vaisselle-antique' )
	);
}

/* -------------------------------------------------------------------------
   Home page: [vaisselle_home]
   Put this shortcode alone on the "Accueil" page. It builds the whole home
   page from your products, so it updates itself every time you add one:
     banner → Nouveautés (6 newest) → Catégories (tiles) →
     one section per category (3 newest each) with "Voir tout".
   Banner photo and category sections: Customize → Vaisselle Antique.
   ------------------------------------------------------------------------- */
function vaisselle_home_categories() {
	$slugs = trim( (string) get_theme_mod( 'vaisselle_home_categories', '' ) );
	if ( '' === $slugs ) {
		$slugs = 'terre-de-fer,blanche,decoration';
	}
	return array_filter( array_map( 'sanitize_title', explode( ',', $slugs ) ) );
}

add_shortcode( 'vaisselle_home', 'vaisselle_home_shortcode' );

function vaisselle_home_shortcode() {
	if ( ! function_exists( 'wc_get_page_permalink' ) ) {
		return '';
	}

	$hero = get_theme_mod( 'vaisselle_hero_image', '' );
	if ( ! $hero ) {
		$hero = get_stylesheet_directory_uri() . '/assets/images/hero.jpg';
	}

	ob_start();
	?>
	<div class="va-home">
		<section class="va-home-hero">
			<img src="<?php echo esc_url( $hero ); ?>" alt="" class="va-home-hero__img">
			<div class="va-home-hero__content">
				<h2 class="va-home-hero__title"><?php esc_html_e( 'New arrivals', 'vaisselle-antique' ); ?></h2>
				<a href="#nouveautes" class="va-home-hero__button"><?php esc_html_e( 'Discover', 'vaisselle-antique' ); ?></a>
			</div>
		</section>

		<h2 class="va-section-title" id="nouveautes"><?php esc_html_e( 'New arrivals', 'vaisselle-antique' ); ?></h2>
		<?php echo do_shortcode( '[products limit="6" columns="3" orderby="date" order="DESC"]' ); ?>
		<p class="va-home-more">
			<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="va-view-more"><?php esc_html_e( 'View more', 'vaisselle-antique' ); ?></a>
		</p>

		<section class="va-home-section">
			<h2 class="va-section-title"><?php esc_html_e( 'Categories', 'vaisselle-antique' ); ?></h2>
			<?php echo do_shortcode( '[product_categories number="0" parent="0" hide_empty="1" columns="5" orderby="menu_order"]' ); ?>
		</section>

		<?php
		foreach ( vaisselle_home_categories() as $slug ) :
			$term = get_term_by( 'slug', $slug, 'product_cat' );
			if ( ! $term || ! $term->count ) {
				continue;
			}
			$link = get_term_link( $term );
			if ( is_wp_error( $link ) ) {
				$link = wc_get_page_permalink( 'shop' );
			}
			?>
			<section class="va-home-section va-home-category">
				<h2 class="va-section-title"><?php echo esc_html( $term->name ); ?></h2>
				<?php echo do_shortcode( sprintf( '[products limit="3" columns="3" category="%s" orderby="date" order="DESC"]', esc_attr( $slug ) ) ); ?>
				<p class="va-home-more">
					<a href="<?php echo esc_url( $link ); ?>" class="va-view-all"><?php esc_html_e( 'View all', 'vaisselle-antique' ); ?></a>
				</p>
			</section>
		<?php endforeach; ?>
	</div>
	<?php
	return ob_get_clean();
}
