function get_currency_list(currency_string) {
    return currency_string.split(/\s*,\s*/);
}

function make_link(text, amount, id) {
    var link = $(document.createElement("a")).click(showHideConversion);
}

function showHideConversion() {
    var target = $('#'+$(this).data('target')).toggle();
    return false;
}

function convert_money(amount, from, to, round, id, text) {
    var current_id = get_id(id);
    var to_currencies = get_currency_list(to);
    var container = $('#'+id);

    make_link(text, amount, id);
}