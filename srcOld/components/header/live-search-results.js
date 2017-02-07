/**
 * Created by ITUA on 15.11.2016.
 */

function init() {
	console.log('init livesearch')
	
	let $body = $('body'),
		$liveSearchInput = $('.js-live-search-input'),
		$liveSerachResults = $('.js-live-search-results');
	
	
	$liveSearchInput
		.on('keyup', () => {
			$liveSerachResults.css({display: 'block'})
				.add($liveSearchInput).on('click', (e)=> {
				e.stopPropagation();
			});
		})
		.on('focus', (e) => {
			if ($(e.target).val().length > 1) {
				$(e.target).trigger('keyup');
			}
		});
	
	$body.on('click', () => {
		$liveSerachResults.css({display: 'none'});
	});
}

module.exports = {
	init: init
};
