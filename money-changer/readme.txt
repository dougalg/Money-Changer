#Money-Changer#
Contributors: dougalg
Tags: currency conversion
Requires at least: 3.4
Tested up to: 3.9
Stable tag: 3.9
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Money-changer is a simple Wordpress plugin for displaying currency conversions to users using the CoinMill interface. It provides three shortcodes:

1. change_money - Create a link and table together
2. change_money_link - Create a link to toggle a table with a given ID
3. change_money_table - Create a table with a given ID

##Installation##

Put the "Money Changer" folder in your "plugins" directory or install via the Wordpress plugin interface.

##Basic Usage##

    [change_money from="USD" to="CAD,THB" amount="300"]

This will display the following:

    300THB [Other Currencies]

When "Other Currencies" is clicked it will display a table immediately below. The link text can be customized in this way.

    [change_money from="USD" to="CAD,THB" amount="300"]Custom link text[/change_money]

##Parameters##

1. *amount* - amount of money to convert. default is 0
2. *from* - base currency (eg. THB, USD, etc.) default is USD
3. *to*  - comma-separated list of currencies (eg. 'THB,CAD' or 'USD,AUD') default is THB
4. *round* - number of decimal places to round to, default is 0
5. *id* - optional. allows you to set a custom ID if you want to separate the link and table (see below). default is a random string of numbers and letters
6. *hidden* - is the table hidden by default. default is 'true'

Example with all parameters set

    [change_money from="USD" to="CAD,THB" round="2" id="foobarID" hidden="false" amount="300"]Click to see other currencies[/change_money]

##Link Only##

    [change_money_link id="optional"]Link text[/change_money_link]

Setting a link only which when clicked will toggle the table with id "optional". It will automatically retrieve the *amount* and *from* values from the related table. 

##Table Only##

    [change_money_table from="USD" to="CAD,THB" round="2" id="optional" hidden="false" amount="300"]

Creates a table which will be toggle by the previous link, but which has no link by default.