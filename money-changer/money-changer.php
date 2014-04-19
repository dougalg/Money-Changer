<?php
/**
 * Plugin Name: Money Changer
 * Plugin URI: None
 * Description: Changes money
 * Version: 0.1
 * Author: Dougal Graham
 * Author URI: http://tfiaa.com
 * License: None
 */

$plugin_url = plugin_dir_url( __FILE__ );
$fn_pref = "js_cm_";
$DEFAULT_LINK_TEXT = "Other Currencies";
$DEFAULT_ATTS = array(
                    "amount" => 0,      // The amount to convert
                    "from" => 'USD',    // The source currency (only one)
                    "to" => 'THB',      // comma-separated list of alternate currencies ex: THB,USD,CAD
                    "round" => 0,       // Number of decimals to round to
                    "id" => null,       // The ID if you want a special target
                    "hidden" => 'true'    // Should it be hidden by default?
                );

function enqueue_coin_scripts() {
    global $plugin_url;
    wp_register_script( 'coinmill', 'http://coinmill.com/frame.js');
    wp_register_script( 'coinmill-custom', $plugin_url.'change_money.min.js', array( 'jquery' ));
    
    wp_enqueue_script( 'coinmill' );
    wp_enqueue_script( 'coinmill-custom' );
}
add_action('wp_enqueue_scripts', 'enqueue_coin_scripts');

function prefix($id=null) {
    global $fn_pref;
    if ($id === null || $id === '')
        return null;
    return $fn_pref.$id;
}

// Creates a placeholder <a> to get modified by the JS
function change_money_link_placeholder($atts, $link_content, $id=null) {
    global $DEFAULT_LINK_TEXT;
    extract(shortcode_atts(array(
        "id" => $id,
        "amount" => 0,
        "from" => 'USD'
    ), $atts));
    if ($link_content === null || $link_content === '')
        $link_content = $DEFAULT_LINK_TEXT;

    return ' <a class="'.prefix('link').'" cm_target="'.prefix($id).'">'.$link_content.'</a>';
}

// Creates a placeholder <span> to get modified by the JS to hold
// the table with conversions
function change_money_table_placeholder($atts, $id=null) {
    global $DEFAULT_LINK_TEXT;
    global $DEFAULT_ATTS;
    $tmp_atts = $DEFAULT_ATTS;
    $tmp_atts['id'] = $id;
    extract(shortcode_atts($tmp_atts, $atts));

    return '<span class="'.prefix('table_holder').'" id="'.prefix($id).'" cm_amount="'.$amount.'" cm_from="'.$from.'" cm_to="'.$to.'" cm_round="'.$round.'" cm_hidden="'.$hidden.'"></span>';
}

// Creates a shortcode to create a table with no link with a given ID
function change_money_table_sc($atts) {
    return change_money_table_placeholder($atts);
}

// Creates a shortcode to create a link to show a specific table with a given ID
function change_money_link_sc($atts, $link_content=null) {
    return change_money_link_placeholder($atts, $link_content);
}

// CCreates a shortcode to create a link and a table with a given ID (or without)
function change_money_sc($atts, $link_content=null) {
    extract(shortcode_atts(array(
        "id" => null
    ), $atts));
    if ($id === null) {
        $id = uniqid();
    }
    return change_money_link_placeholder($atts, $link_content, $id).
           change_money_table_placeholder($atts, $id);
}
add_shortcode("change_money", "change_money_sc");
add_shortcode("change_money_link", "change_money_link_sc");
add_shortcode("change_money_table", "change_money_table_sc");

?>