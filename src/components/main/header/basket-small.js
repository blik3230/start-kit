/**
 * Created by ITUA on 15.11.2016.
 */



// init dropdown for basket-small in header
function init() {
	var $basketSmall = $('.js-basket-small'),
		optionsBasketDropdown = {
			toggle: 'basket-small__toggle',
			popup: 'popup',
			btnClose: 'popup__close'
		};
	
	$basketSmall.dropdown(optionsBasketDropdown);
}

module.exports = {
	init: init
};
