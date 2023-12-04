<?php

/**
 * Admin API
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

            // Posts Example
            register_rest_route(PLUGIN_NAME_REST_API_ROUTE, '/posts/(?P<page>\d+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_posts'),
                'args' => array(
                    'page' => array(
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ),
                ),
                'permission_callback' => array($this, 'get_permission')
            ));

            // Licence example
            register_rest_route(PLUGIN_NAME_REST_API_ROUTE, '/license/', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_license'),
                'permission_callback' => array($this, 'get_permission')
            ));
        });
    }

    /**
     *
     * Ensures only one instance is loaded or can be loaded.
     *
     * @since 1.0.0
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

        $prefix = 'my_plugin_';
        $options = array(
            $prefix . 'disable',
            $prefix . 'cookie_time',
            $prefix . 'min_ref_order',
            $prefix . 'cookie_remove',
            $prefix . 'allow_guests',
            $prefix . 'hide_no_orders',
            $prefix . 'hide_no_orders_text',
            $prefix . 'referral_codes',
            $prefix . 'subscription',
            $prefix . 'subscription_all_coupons',
            $prefix . 'subscription_exclude_shipping',
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
                    update_option($key, $sanitized_data);
                }
            }
        }

        return new WP_REST_Response($data, 200);
    }

    /*
        Fetching posts example. You would have this in separate class most probably. 
    */
    public function get_posts($request)
    {
        $params = $request->get_params();
        if (isset($params['page']) && is_numeric($params['page'])) {
            $page = intval($params['page']);
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => 10,
                'post_status' => 'publish',
                'paged' => $page
            );
            $posts = [];
            $query = new WP_Query($args);
            $total_pages = $query->max_num_pages;
            foreach ($query->posts as $post) {
                $formatted_date = date('M d, Y', strtotime($post->post_date));
                $author_info = get_userdata($post->post_author);

                $posts[] = array(
                    'postID'     => $post->ID,
                    'postName'   => $post->post_title,
                    'postDate'   => $formatted_date,
                    'postAuthor' => $author_info ? $author_info->display_name : 'Unknown Author',
                    'postStatus' => $post->post_status,
                );
            }
            $response = array('numOfPages' => $total_pages, 'data' => $posts);
            return new WP_REST_Response($response, 200);
        }
        return new WP_REST_Response(array('message' => 'Something went wrong!'), 403);
    }

    /*
        License example. You would have this in separate class most probably. 
    */
    function get_license()
    {
        // You would fetch licence key here.
        $response = array("license_key" => "xxxxxx");
        return new WP_REST_Response($response, 200);
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
