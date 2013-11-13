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
$fn_pref = "money_changer_";
$DEFAULT_LINK_TEXT = "Other Currencies";

function enqueue_coin_scripts() {
    global $plugin_url;
    wp_register_script( 'coinmill', 'http://coinmill.com/frame.js');
    wp_register_script( 'coinmill-custom', $plugin_url.'change_money.js', array( 'jquery' ));
    
    wp_enqueue_script( 'coinmill' );
    wp_enqueue_script( 'coinmill-custom' );
}
add_action('wp_enqueue_scripts', 'enqueue_coin_scripts');

function get_id($id) {
    global $fn_pref;
    if ($id === null || $id === '')
        $id = uniqid();
    return $fn_pref.$id;
}

function change_money($atts, $link_content = null) {
    global $DEFAULT_LINK_TEXT;
    extract(shortcode_atts(array(
        "amount" => 0,
        "from" => 'USD',
        "to" => 'THB',
        "round" => 0,
        "id" => null
    ), $atts));
    $id = get_id($id);
    if ($link_content === null || $link_content === '')
        $link_content = $DEFAULT_LINK_TEXT;
    return "<script type=\"text/javascript\">/*<![CDATA[*//*---->*/convert_money($amount, \"$from\", \"$to\", $round, \"$id\", \"$link_content\")/*--*//*]]>*/</script><div id='$id'></div>";
}
add_shortcode("change_money", "change_money");

?>