<?php

/**
 * Setup Menu Pages
 *
 * @since     1.0.0
 */

defined('ABSPATH') || exit;

class WP_React_Admin_Panel_Menu
{

	public function __construct()
	{
		// Add submenu items
		add_action('admin_menu', array($this, 'register_menu'));
		// Add links under plugin page.
		add_filter('plugin_action_links_wp-react-admin-panel/wp-react-admin-panel.php', array($this, 'add_settings_link'));
		add_filter('plugin_action_links_wp-react-admin-panel/wp-react-admin-panel.php', array($this, 'docs_link'));
	}


	/**
	 * Define Menu
	 *
	 * @since 1.0.0
	 */
	public function register_menu()
	{
		add_menu_page(__('WP Admin Panel', 'wpgens-st'), __('WP Admin Panel', 'wpgens-st'), 'manage_options', 'plugin-name', array($this, 'display_react_admin_page'), 'dashicons-menu');
	}

	/**
	 * Init the view part.
	 *
	 * @since 1.0.0
	 */
	public function display_react_admin_page()
	{

		if (defined('PLUGIN_NAME_DEV') && PLUGIN_NAME_DEV) {
?>
			<script type="module">
				import RefreshRuntime from "http://localhost:5173/@react-refresh"
				RefreshRuntime.injectIntoGlobalHook(window)
				window.$RefreshReg$ = () => {}
				window.$RefreshSig$ = () => (type) => type
				window.__vite_plugin_react_preamble_installed__ = true
			</script>
			<script type="module" src="http://localhost:5173/@vite/client"></script>
			<script type="module" src="http://localhost:5173/src/main.tsx"></script>
<?php
		}
		echo "<div id='root'></div>";
	}

	/**
	 * Plugin Settings Link on plugin page
	 *
	 * @since 		1.0.0
	 */
	function add_settings_link($links)
	{
		$settings = array(
			'<a href="' . admin_url('admin.php?page=plugin-name') . '">Settings</a>',
		);
		return array_merge($links, $settings);
	}


	/**
	 * Plugin Documentation Link on plugin page
	 *
	 * @since 		1.0.0
	 */
	function docs_link($links)
	{
		$docs = array(
			'<a target="_blank" href="http://example.com/documentation">Documentation</a>',
		);
		return array_merge($links, $docs);
	}
}

new WP_React_Admin_Panel_Menu();
