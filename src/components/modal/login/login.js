/**
 * Created by ITUA on 15.11.2016.
 */
//require('magnific-popup');

function initLoginFromModal() {
	var $modalLogin = $('#modal-login'),
		$btnModalLogin = $('.js-btn-modal-login');
	
	if(!$btnModalLogin[0]) return;
	
	$btnModalLogin.magnificPopup({
		type: 'inline',
		focus: 'input',
		mainClass: 'mfp-zoom-in',
		removalDelay: 300,
		showCloseBtn: false,
		alignTop: true
	});
	
	var classNameToggle = 'js-on-registration',
		isToggle = false,
		$blockLogin = $modalLogin.find('.login'),
		$toggle = $modalLogin.find('.js-toggle-login'),
		$toggleLinks = $modalLogin.find('.login__sw-btn');
	
	$toggle.on('click', function () {
		if (isToggle) {
			$blockLogin.removeClass(classNameToggle);
			isToggle = false;
		} else {
			$blockLogin.addClass(classNameToggle);
			isToggle = true;
		}
	});
	
	$toggleLinks.on('click', function () {
		var target = $(this).data('target');
		
		if (target == 'login') {
			$blockLogin.removeClass(classNameToggle);
			isToggle = false;
		} else {
			$blockLogin.addClass(classNameToggle);
			isToggle = true;
		}
	});
}

module.exports = {
	init: initLoginFromModal
};
