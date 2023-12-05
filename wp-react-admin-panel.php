<?php

/**
 * Plugin Name: WPGens WordPress React Admin Panel
 * Description: Example description of this plugin.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yoursite.com
 * Text Domain: plugin-name
 * Domain Path: /languages
 * Requires at least: 5.9
 * Tested up to: 6.1
 * Requires PHP: 7.3
 *
 */

defined('ABSPATH') || exit;

final class WP_React_Admin_Panel
{
    private static $instance;

    private $version = '1.0.0';

    private function __construct()
    {
        $this->define_constants();
        $this->includes();
    }

    private function includes()
    {
        if (is_admin()) {
            require_once(PLUGIN_NAME_ABSPATH . 'includes/admin/class-wp-react-admin-panel-menu.php');
            require_once(PLUGIN_NAME_ABSPATH . 'includes/admin/class-wp-react-admin-panel-assets.php');
        }
        require_once(PLUGIN_NAME_ABSPATH . 'includes/admin/class-wp-react-admin-panel-api.php');
    }
    /**
     * Define Plugin Constants.
     * @since 1.0
     */
    private function define_constants()
    {
        $this->define('PLUGIN_NAME_DEV', false);
        $this->define('PLUGIN_NAME_REST_API_ROUTE', 'plugin-name/v1');
        $this->define('PLUGIN_NAME_URL', plugin_dir_url(__FILE__));
        $this->define('PLUGIN_NAME_ABSPATH', dirname(__FILE__) . '/');
        $this->define('PLUGIN_NAME_VERSION', $this->get_version());
    }

    /**
     * Returns Plugin version for global
     * @since  1.0
     */
    private function get_version()
    {
        return $this->version;
    }

    /**
     * Define constant if not already set.
     *
     * @since  1.0
     * @param  string $name
     * @param  string|bool $value
     */
    private function define($name, $value)
    {
        if (!defined($name)) {
            define($name, $value);
        }
    }

    public static function get_instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

WP_React_Admin_Panel::get_instance();
