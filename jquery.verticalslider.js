/** 
 * Simple vertical image slider (jQuery)
 * Examples and documentation at: https://github.com/ar1hur/jquery.verticalslider
 * @author: Arthur Zielinski 
 * @license: General Public Open Source
 * @version: 1.2
 */
;
(function ( $, window, undefined ) {
	// Create the defaults once
	var pluginName = 'verticalSlider',
	document = window.document,
	defaults = {		
		startAt: 1,  
		showItems: 4,		
		navNext: '.next',
		navPrev: '.prev',
		speed: 800,
		hideNav: true,
		rows: 1
	};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;
	
		this.init();
	}

	Plugin.prototype = {
		init: function () {	
			// main / items
			this._main = $(this.element).find('ul,ol');
			this._items = this._main.find('li');				
			
			// some css preparations
			this._main.css('position','relative');
			this._main.parent().css('overflow','hidden');
		 
			// get item height with margins + borders + paddings
			this._itemsHeight = parseInt( $(this._items[0]).outerHeight(true) );
				
			// avoid length bug
			if( this.options.startAt > this._items.length ) {
				this.options.startAt = this._items.length;
			}
			
			if( this.options.startAt > 0 ) { 
				this.options.startAt--;
			}					
						
			this._top = parseInt( this.options.startAt * -this._itemsHeight );			
			this._offset = parseInt( this._itemsHeight * this.options.showItems );
			
			var length = this._items.length / this.options.rows;
			this._maxTop = parseInt( this._itemsHeight * length - this.options.showItems * this._itemsHeight ) * -1;
			
			// limit top value
			if( this._top <= this._maxTop ) {
				this._top = this._maxTop; 
			}			
			this._main.css('top', this._top);
		  
			// get navigation
			this._next = $(this.element).find(this.options.navNext);
			this._prev = $(this.element).find(this.options.navPrev);	

			// hide navigation 
			if( this.options.hideNav ) {
				if( this._top >= 0 ) {
					this._prev.hide();
				}
				
				if( this._top <= this._maxTop ) {
					this._next.hide();
				}				
			}
		  
			// bind events for navigation buttons
			var self = this;
			this._prev.bind('click',function(e) {
				e.preventDefault();
				self.prev();
			});
			this._next.bind('click',function(e) {
				e.preventDefault();
				self.next();
			});
		},
	  
		next: function() {		  		  
			this._top -= this._offset;
			if( this._top <= this._maxTop ) {
				this._top = this._maxTop;
			  
				if( this.options.hideNav ) {
					this._next.hide();
				}
			}
			this._prev.show();
	
			this._slide();
		},	  
	  
		prev: function() {
			this._top += this._offset;
			if( this._top >= 0 ) {
				this._top = 0;
			  
				if( this.options.hideNav ) {
					this._prev.hide();  
				}
			}
			this._next.show(); 

			this._slide();
		},
	  
		_slide: function() {	
			var top = parseInt( this._top );
			this._main.animate({ top:top }, this.options.speed);
		}
	};


	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}

}(jQuery, window));