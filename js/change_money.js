(function($){
    var tables = Array(),
        prefix = function prefixF(id) {
            return "js_cm_"+id;
        },
        numberWithCommas = function numberWithCommasF(x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },
        get_currency_list = function get_currency_listF(currency_string) {
            return currency_string.split(/\s*,\s*/);
        },
        init = function initF() {
            make_tables();
            make_links();
        },
        make_links = function make_linksF() {
            /*
             Loop through all links and set their clickevents
             Also prepend the 'amount' and 'from' values
             */
            $('.'+prefix('link')).each(function(){
                var target = $('#'+$(this).attr('cm_target'));
                $(this).before(target.attr('cm_amount')+target.attr('cm_from')+' [')
                    .after(']')
                    .click(function(e){
                        tables[$(this).attr('cm_target')].toggle();
                        e.preventDefault();
                        return false;
                    });
            });
        },
        make_tables = function make_tablesF() {
            /*
             Loop through all placeholders and set their contents
             */
            $('.'+prefix('table_holder')).each(function(){
                var JQthis = $(this),
                    tos = get_currency_list(JQthis.attr('cm_to')),
                    amount = JQthis.attr('cm_amount'),
                    from = JQthis.attr('cm_from'),
                    round = JQthis.attr('cm_round'),
                    hidden = JQthis.attr('cm_hidden'),
                    new_table = $(document.createElement("table")),
                    header_row = $(document.createElement("tr")),
                    data_row = $(document.createElement("tr")),
                    num_conversions = tos.length,
                    new_el,
                    i;

                tables[JQthis.attr('id')] = JQthis;

                for (i=0;i<num_conversions;i++) {
                    new_el = $(document.createElement("th")).html(tos[i]);
                    header_row.append(new_el);
                }
                for (i=0;i<num_conversions;i++) {
                    new_el = $(document.createElement("td")).html(currency_convert_round(amount, from, tos[i], round));
                    data_row.append(new_el);
                }
                new_table.append(header_row).append(data_row);
                JQthis.append(new_table);

                if (hidden === 'true') { JQthis.hide(); }
            });
        },
        currency_convert_round = function currency_convert_roundF(amount, from, to, round) {
            var x = currency_convert(amount, from, to);
            return numberWithCommas(Math.round10(x));
        };

        $(init);
})(jQuery);


(function(){

    /**
     * Decimal adjustment of a number.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     * 
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();