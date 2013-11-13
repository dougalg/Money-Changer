function get_currency_list(currency_string) {
    return currency_string.split(/\s*,\s*/);
}

function make_link(link_text, amount, id) {
    var link_span = $(document.createElement("span"));
    var link = $(document.createElement("a")).html(link_text).click(function(){showHideConversion(id);});
    link_span.append(link.before('[ ').after(' ]'));
    return link_span;

}

function make_table(amount, from, to, id) {
    var new_table = $(document.createElement("table"));
    var header_row = $(document.createElement("tr"));
    var data_row = $(document.createElement("tr"));

    var num_conversions = to.length,
        new_el,
        i;
    for (i=0;i<num_conversions;i++) {
        new_el = $(document.createElement("th")).html(to[i]);
        header_row.append(new_el);
    }
    for (i=0;i<num_conversions;i++) {
        new_el = $(document.createElement("td")).html(currency_convert(amount, from, to[i]));
        data_row.append(new_el);
    }
    new_table.append(header_row).append(data_row);

    return new_table;
}

function showHideConversion() {
    var target = $('#'+$(this).data('target')).toggle();
    return false;
}

function convert_money(amount, from, to, round, id, link_text) {
    var to_currencies = get_currency_list(to);
    var container = $('#'+id);
    container.html('asd');
}