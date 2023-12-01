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
			$apiNonce = wp_create_nonce('wp_rest');
			$root = rest_url(PLUGIN_NAME_REST_API_ROUTE . '/');
			$baseUrl = PLUGIN_NAME_URL; // can be used for assets

			// Posts Example
			$args = array(
				'post_type' => 'post', // Change to your custom post type if needed
				'posts_per_page' => 10, // Number of posts to display
				'post_status' => 'publish', // Fetch only published posts
				// Add more parameters as needed
			);
			$posts = [];
			$query = new WP_Query($args);
			foreach ($query->posts as $post) {
				$posts[] = array('postName' => $post->post_name);
				$posts[] = array('postName' => $post->post_name);
				$posts[] = array('postName' => $post->post_name);
				$posts[] = array('postName' => $post->post_name);
			}
			// End of Posts Example

			if (defined('PLUGIN_NAME_DEV') && PLUGIN_NAME_DEV) {
?>
				<script>
					var pluginName = {
						apiNonce: '<?php echo $apiNonce; ?>',
						root: '<?php echo $root; ?>',
						baseUrl: '<?php echo $baseUrl; ?>',
						posts: '<?php echo json_encode($posts); ?>'
					}
				</script>
				<script type="module">
					import RefreshRuntime from "http://localhost:5178/@react-refresh"
					RefreshRuntime.injectIntoGlobalHook(window)
					window.$RefreshReg$ = () => {}
					window.$RefreshSig$ = () => (type) => type
					window.__vite_plugin_react_preamble_installed__ = true
				</script>
				<script type="module" src="http://localhost:5178/@vite/client"></script>
				<script type="module" src="http://localhost:5178/src/main.tsx"></script>
<?php
			} else {
				wp_enqueue_script('plugin-name-backend', PLUGIN_NAME_URL . 'includes/admin/assets/js/index.js', array('wp-i18n'), PLUGIN_NAME_VERSION, true);
				wp_localize_script(
					'plugin-name-backend',
					'pluginName',
					array(
						'apiNonce'     => $apiNonce,
						'root'          => $root,
						'baseUrl'   => $baseUrl,
					)
				);
			}
		}
	}
}

new WP_React_Admin_Panel_Assets();
