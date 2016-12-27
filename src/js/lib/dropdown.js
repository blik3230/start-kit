(function($){
	var $currentPopup = null;

	var methods = {
		init: function(options) {
			var settings = $.extend(
				true,
				{
					toggle: 'js-dropdown__toggle',
					popup: 'js-dropdown__popup',
					show: 'show',
					btnClose: null
				},
				options);

			return this.each(function(){
				var $this = $(this);

				var $toggle = $this.find('.' + settings.toggle);
				var $popup = $this.find('.' + settings.popup);
				var $btnClose;

				if(settings.btnClose) {
					$btnClose = $('.' + settings.btnClose);

					$btnClose.on('click.dropdown', function() {
						close($popup);
						return false;
					});
				}

				$popup.isOpen = false;

				if(!$toggle[0]) throw ('Не найден элемент с классом ' + settings.toggle);
				if(!$popup[0]) throw ('Не найден элемент с классом ' + settings.popup);

				$toggle.on('click.dropdown', function() {

					if($currentPopup) {
						if($popup.is($currentPopup)){
							close($popup);
						} else {
							close($currentPopup);
							open($popup);
						}
					} else {
						open($popup);
					}

					return false;
				});

				$this.one('destroy', function(){
					$toggle.off('click.dropdown');
					$this.off('close');

					if(settings.btnClose) {
						$btnClose.off('click.dropdown');
					}
				});

				$this.on('close', function(){
					close($popup);
				});
			});

			function open($popup) {
				$popup.addClass(settings.show);

				// закрытие по клику в не области попапа
				$(document).on('click.dropdown', function(e) {
					var isPopup = $(e.target).closest('.' + settings.popup)[0];

					if(!isPopup) {
						close($popup);
					}
				});

				// закрытие по клавише 'Esc'
				$(document).on('keydown.dropdown', function(e) {
					if(e.keyCode == 27){
						close($popup);
					}
				});

				$currentPopup = $popup;
			}

			function close($popup) {
				$popup.removeClass(settings.show);

				$(document).off('.dropdown');

				$currentPopup = null;
			}
		},
		close: function() {
			return this.each(function(){
				$(this).trigger('close');
			});
		},
		destroy: function() {
			return this.each(function(){
				$(this).trigger('destroy');
			});
		}
	};

	$.fn.dropdown = function(method) {
		if(methods[method]){
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if(typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.dropdown' );
		}
	};
})(jQuery);
