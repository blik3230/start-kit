/**
 * Created by ITUA on 21.11.2016.
 */
var $sections = $('.js-product__section'),
	$navItems = $('.nav_in-product .nav__item'),
	sectionsPosition = {},
	curItemName;

window.$ = $;

function init() {
	
	updateSectionsPosition();
	setCurrentItem();
	
	$navItems.on('click', function() {
		var itemName = $(this).data('nav-target');
		
		scrollTo(itemName);
	});
	
	$(window)
		.on('scroll', function () {
			setCurrentItem();
			console.log('scroll top = ' + $('body').scrollTop());
		})
		.on('load resize', function () {
			updateSectionsPosition();
			setCurrentItem();
		})
	
	
}

function updateSectionsPosition() {
	$navItems.each(function (i) {
		var $this = $(this),
			navTarget = $this.data('nav-target'),
			$sectionTarget = $sections.filter(function(){
				if($(this).data('nav-item-name') == navTarget) return true;
			}),
			offsetTop = $sectionTarget.offset().top,
			bannerWidth = 0;
		
		// если за блоком есть баннер добавить его высоту к блоку
		if($sectionTarget.next().hasClass('product__banner')) {
			bannerWidth = $sectionTarget.next().outerHeight(true);
		}
		
		sectionsPosition[navTarget] = {
			top: (!i)? 0 : offsetTop,
			bottom: (i == $navItems.length - 1)? Infinity: offsetTop + $sectionTarget.height() + bannerWidth
		}
	});
	
	console.dir(sectionsPosition);
}

function setCurrentItem(itemName) {
	itemName = itemName || getNameCurrentItem();
	
	if(!itemName || itemName == curItemName) return;
	
	curItemName = itemName;
	
	$navItems
		.removeClass('nav__item_active')
		.filter(function(){
			if($(this).data('nav-target') == itemName) return true;
		})
		.addClass('nav__item_active');
}

function scrollTo(itemName) {
	var top = $sections.filter(function () {
			if($(this).data('nav-item-name') == itemName) return true;
		}).offset().top,
		duration = Math.abs( $('body').scrollTop() - top ) * 0.5;
	
	$('body')
		.stop()
		.animate({
			scrollTop: top
		}, duration);
}

function getNameCurrentItem() {
	var scrollTop = $('body').scrollTop();
	
	for (var section in sectionsPosition) {
		
		if(scrollTop >= sectionsPosition[section].top && scrollTop < sectionsPosition[section].bottom) {
			return section;
		}
	}
	
	console.warn('Нет секции на верхней линии');
	return false;
}

module.exports = {
	init: init
};

// todo: add window resize handler