<?php

/**
 * Handle frontend scripts
 *
 * @since     1.0.0
 */

defined('ABSPATH') || exit;

class WP_React_Admin_Panel_API
{

    /**
     * @var    object
     * @access  private
     * @since    1.0.0
     */
    private static $_instance = null;

    public function __construct()
    {

        add_action('rest_api_init', function () {
            // Settings
            register_rest_route(PLUGIN_NAME_REST_API_ROUTE, '/settings/', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_settings'),
                'permission_callback' => array($this, 'get_permission')
            ));
            register_rest_route(PLUGIN_NAME_REST_API_ROUTE, '/settings/', array(
                'methods' => 'POST',
                'callback' => array($this, 'set_settings'),
                'permission_callback' => array($this, 'get_permission')
            ));
        });
    }

    /**
     *
     * Ensures only one instance of AWDP is loaded or can be loaded.
     *
     * @since 1.0.0
     * @static
     * @see WordPress_Plugin_Template()
     * @return Main AWDP instance
     */
    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function allowed_html_settings()
    {
        return array();
    }

    private function registered_settings()
    {

        $prefix = 'wpgens_st_';
        $options = array(
            $prefix . 'disable',
            $prefix . 'cookie_time',
            $prefix . 'min_ref_order',
            $prefix . 'cookie_remove',
            $prefix . 'allow_guests',

            // Product
            $prefix . 'tabs_disable',
            $prefix . 'share_text',
            $prefix . 'guest_text',
            // My Account
            $prefix . 'my_account_url',
            $prefix . 'myaccount_text',
            // Share
            $prefix . 'twitter_via',
            $prefix . 'twitter_title',
            $prefix . 'whatsapp',
            $prefix . 'viber',
            $prefix . 'linkedin',
            $prefix . 'pinterest',
        );
        return $options;
    }

    public function get_settings()
    {
        $result = [];
        foreach ($this->registered_settings() as $key) {
            if ($value = get_option($key)) {
                $result[$key] = $value;
            }
        }

        return new WP_REST_Response($result, 200);
    }

    public function set_settings($data)
    {
        $fields = $this->registered_settings();
        $allowed_html = $this->allowed_html_settings();

        $data = $data->get_params();

        foreach ($data as $key => $value) {
            if (in_array($key, $fields)) {
                $sanitized_data = in_array($key, $allowed_html) ? wp_kses_post($value) : sanitize_text_field($value);
                if (false === get_option($key)) {
                    add_option($key, $sanitized_data);
                } else {
                    update_option($key, wp_kses_post($sanitized_data));
                }
            }
        }

        return new WP_REST_Response($data, 200);
    }

    /**
     * Permission Callback
     **/
    public function get_permission()
    {
        if (current_user_can('administrator') || current_user_can('manage_woocommerce')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Cloning is forbidden.
     *
     * @since 1.0.0
     */
    public function __clone()
    {
        _doing_it_wrong(__FUNCTION__, __('Cheatin&#8217; huh?'), PLUGIN_NAME_VERSION);
    }
}

WP_React_Admin_Panel_API::instance();
