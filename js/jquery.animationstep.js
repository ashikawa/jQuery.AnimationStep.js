/**
 * @preserve jquery.animationstep.js
 *
 * CSSアニメーション用のイベントの管理
 * コンテナへのクラス名を自動設定
 * ループ回数のカウント
 *
 * @author s.ashikawa
 */
/*global $, jQuery*/
(function ($) {
	
	$.fn.animationstep = function (options) {
		
		if (!options) {
			options = {};
		}

		/**
		 * 共通処理 options で渡されたコールバック関数の実行
		 */
		function callback(state, iteration, event) {
			
			var $this = $(this),
				animationName	= event.originalEvent.animationName,
				args = [animationName, state, iteration, event];
			
			if ($.isFunction(options)) {
				options.apply(this, args);
				return;
			}

			if (animationName in options) {
				
				if ($.isFunction(options[animationName])) {
					options[animationName].apply(this, args);
					return;
				}

				if (options[animationName][state]) {
					options[animationName][state].apply(this, args);
					return;
				}
			}
		}

		/**
		 * init plugin
		 */
		return this.each(function (i, element) {
			
			var $this		= $(element),
				iterations	= {};	// animation-name : number

			$this.on('webkitAnimationStart animatinostart', function (event) {

				var animationName	= event.originalEvent.animationName,
					i = iterations[animationName] = 0;

				$this.addClass(animationName + '-start');

				callback.apply(this, ['start', i, event]);
			});
			
			$this.on('webkitAnimationEnd animationend', function (event) {

				var animationName	= event.originalEvent.animationName,
					i = iterations[animationName];

				$this.removeClass(animationName + '-start');
				$this.addClass(animationName + '-end');

				callback.apply(this, ['end', i, event]);
			});
			
			$this.on('webkitAnimationIteration animationiteration', function (event) {

				var animationName	= event.originalEvent.animationName,
					i = ++iterations[animationName];
				
				callback.apply(this, ['iteration', i, event]);
			});
		});
	};
}(jQuery));
