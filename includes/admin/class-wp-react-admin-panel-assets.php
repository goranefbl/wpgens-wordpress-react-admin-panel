<?php

/**
 * Handle backend scripts
 *
 * @since     1.0.0
 */

defined('ABSPATH') || exit;

class WP_React_Admin_Panel_Assets
{
	public function __construct()
	{
		add_action('admin_enqueue_scripts', array(__CLASS__, 'admin_enqueue_scripts'), 10, 1);
	}

	/**
	 * Enqueue Backend Scripts
	 *
	 * @since 1.0.0
	 */
	public static function admin_enqueue_scripts()
	{
		$currentScreen = get_current_screen();
		$screenID = $currentScreen->id;

		if ($screenID === "toplevel_page_plugin-name") {
			wp_enqueue_script('your-plugin-backend', PLUGIN_NAME_URL . 'includes/admin/assets/js/index.js', array('wp-i18n'), PLUGIN_NAME_VERSION, true);
			wp_localize_script(
				'your-plugin-backend',
				'yourPlugin',
				array(
					'apiNonce'     => wp_create_nonce('wp_rest'),
					'root'          => rest_url(PLUGIN_NAME_REST_API_ROUTE),
					'baseUrl'   => PLUGIN_NAME_URL,
				)
			);
		}
	}
}

new WP_React_Admin_Panel_Assets();
