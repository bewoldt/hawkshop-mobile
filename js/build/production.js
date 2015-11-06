jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();

		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');

		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(400).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(400);
	});
});
/**
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	var drag, state, e;

	/**
	 * Template for status information about drag and touch events.
	 * @private
	 */
	drag = {
		start: 0,
		startX: 0,
		startY: 0,
		current: 0,
		currentX: 0,
		currentY: 0,
		offsetX: 0,
		offsetY: 0,
		distance: null,
		startTime: 0,
		endTime: 0,
		updatedX: 0,
		targetEl: null
	};

	/**
	 * Template for some status informations.
	 * @private
	 */
	state = {
		isTouch: false,
		isScrolling: false,
		isSwiping: false,
		direction: false,
		inMotion: false
	};

	/**
	 * Event functions references.
	 * @private
	 */
	e = {
		_onDragStart: null,
		_onDragMove: null,
		_onDragEnd: null,
		_transitionEnd: null,
		_resizer: null,
		_responsiveCall: null,
		_goToLoop: null,
		_checkVisibile: null
	};

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Caches informations about drag and touch events.
		 */
		this.drag = $.extend({}, drag);

		/**
		 * Caches some status informations.
		 * @protected
		 */
		this.state = $.extend({}, state);

		/**
		 * @protected
		 * @todo Must be documented
		 */
		this.e = $.extend({}, e);

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key[0].toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Pipe, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,
		responsiveClass: false,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		// Classes and Names
		themeClass: 'owl-theme',
		baseClass: 'owl-carousel',
		itemClass: 'owl-item',
		centerClass: 'center',
		activeClass: 'active'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * Update pipe.
	 */
	Owl.Pipe = [ {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var cached = this._clones,
				clones = this.$stage.children('.cloned');

			if (clones.length !== cached.length || (!this.settings.loop && cached.length > 0)) {
				this.$stage.children('.cloned').remove();
				this._clones = [];
			}
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var i, n,
				clones = this._clones,
				items = this._items,
				delta = this.settings.loop ? clones.length - Math.max(this.settings.items * 2, 4) : 0;

			for (i = 0, n = Math.abs(delta / 2); i < n; i++) {
				if (delta > 0) {
					this.$stage.children().eq(items.length + clones.length - 1).remove();
					clones.pop();
					this.$stage.children().eq(0).remove();
					clones.pop();
				} else {
					clones.push(clones.length / 2);
					this.$stage.append(items[clones[clones.length - 1]].clone().addClass('cloned'));
					clones.push(items.length - 1 - (clones.length - 1) / 2);
					this.$stage.prepend(items[clones[clones.length - 1]].clone().addClass('cloned'));
				}
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = (this.settings.rtl ? 1 : -1),
				width = (this.width() / this.settings.items).toFixed(3),
				coordinate = 0, merge, i, n;

			this._coordinates = [];
			for (i = 0, n = this._clones.length + this._items.length; i < n; i++) {
				merge = this._mergers[this.relative(i)];
				merge = (this.settings.mergeFit && Math.min(merge, this.settings.items)) || merge;
				coordinate += (this.settings.autoWidth ? this._items[this.relative(i)].width() + this.settings.margin : width * merge) * rtl;

				this._coordinates.push(coordinate);
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var i, n, width = (this.width() / this.settings.items).toFixed(3), css = {
				'width': Math.abs(this._coordinates[this._coordinates.length - 1]) + this.settings.stagePadding * 2,
				'padding-left': this.settings.stagePadding || '',
				'padding-right': this.settings.stagePadding || ''
			};

			this.$stage.css(css);

			css = { 'width': this.settings.autoWidth ? 'auto' : width - this.settings.margin };
			css[this.settings.rtl ? 'margin-left' : 'margin-right'] = this.settings.margin;

			if (!this.settings.autoWidth && $.grep(this._mergers, function(v) { return v > 1 }).length > 0) {
				for (i = 0, n = this._coordinates.length; i < n; i++) {
					css.width = Math.abs(this._coordinates[i]) - Math.abs(this._coordinates[i - 1] || 0) - this.settings.margin;
					this.$stage.children().eq(i).css(css);
				}
			} else {
				this.$stage.children().css(css);
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current && this.reset(this.$stage.children().index(cache.current));
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.' + this.settings.activeClass).removeClass(this.settings.activeClass);
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass(this.settings.activeClass);

			if (this.settings.center) {
				this.$stage.children('.' + this.settings.centerClass).removeClass(this.settings.centerClass);
				this.$stage.children().eq(this.current()).addClass(this.settings.centerClass);
			}
		}
	} ];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.trigger('initialize');

		this.$element
			.addClass(this.settings.baseClass)
			.addClass(this.settings.themeClass)
			.toggleClass('owl-rtl', this.settings.rtl);

		// check support
		this.browserSupport();

		if (this.settings.autoWidth && this.state.imagesLoaded !== true) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
				return false;
			}
		}

		this.$element.addClass('owl-loading');

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="owl-stage"/>')
			.wrap('<div class="owl-stage-outer">');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// set view width
		this._width = this.$element.width();

		// update view
		this.refresh();

		this.$element.removeClass('owl-loading').addClass('owl-loaded');

		// attach generic events
		this.eventsCall();

		// attach generic events
		this.internalEvents();

		// attach custom control events
		this.addTriggerableEvents();

		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class', function(i, c) {
					return c.replace(/\b owl-responsive-\S+/g, '');
				}).addClass('owl-responsive-' + match);
			}
		}

		if (this.settings === null || this._breakpoint !== match) {
			this.trigger('change', { property: { name: 'settings', value: settings } });
			this._breakpoint = match;
			this.settings = settings;
			this.invalidate('settings');
			this.trigger('changed', { property: { name: 'settings', value: this.settings } });
		}
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		// Toggle Center class
		this.$element.toggleClass('owl-center', this.settings.center);

		// if items number is less than in body
		if (this.settings.loop && this._items.length < this.settings.items) {
			this.settings.loop = false;
		}

		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.settings.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		if (this._items.length === 0) {
			return false;
		}

		var start = new Date().getTime();

		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		// hide and show methods helps here to set a proper widths,
		// this prevents scrollbar to be calculated in stage width
		this.$stage.addClass('owl-refresh');

		this.update();

		this.$stage.removeClass('owl-refresh');

		this.state.orientation = window.orientation;

		this.watchVisibility();

		this.trigger('refreshed');
	};

	/**
	 * Save internal event references and add event based functions.
	 * @protected
	 */
	Owl.prototype.eventsCall = function() {
		// Save events references
		this.e._onDragStart = $.proxy(function(e) {
			this.onDragStart(e);
		}, this);
		this.e._onDragMove = $.proxy(function(e) {
			this.onDragMove(e);
		}, this);
		this.e._onDragEnd = $.proxy(function(e) {
			this.onDragEnd(e);
		}, this);
		this.e._onResize = $.proxy(function(e) {
			this.onResize(e);
		}, this);
		this.e._transitionEnd = $.proxy(function(e) {
			this.transitionEnd(e);
		}, this);
		this.e._preventClick = $.proxy(function(e) {
			this.preventClick(e);
		}, this);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (this.trigger('resize').isDefaultPrevented()) {
			return false;
		}

		this._width = this.$element.width();

		this.invalidate('width');

		this.refresh();

		this.trigger('resized');
	};

	/**
	 * Checks for touch/mouse drag event type and add run event handlers.
	 * @protected
	 */
	Owl.prototype.eventsRouter = function(event) {
		var type = event.type;

		if (type === "mousedown" || type === "touchstart") {
			this.onDragStart(event);
		} else if (type === "mousemove" || type === "touchmove") {
			this.onDragMove(event);
		} else if (type === "mouseup" || type === "touchend") {
			this.onDragEnd(event);
		} else if (type === "touchcancel") {
			this.onDragEnd(event);
		}
	};

	/**
	 * Checks for touch/mouse drag options and add necessery event handlers.
	 * @protected
	 */
	Owl.prototype.internalEvents = function() {
		var isTouch = isTouchSupport(),
			isTouchIE = isTouchSupportIE();

		if (this.settings.mouseDrag){
			this.$stage.on('mousedown', $.proxy(function(event) { this.eventsRouter(event) }, this));
			this.$stage.on('dragstart', function() { return false });
			this.$stage.get(0).onselectstart = function() { return false };
		} else {
			this.$element.addClass('owl-text-select-on');
		}

		if (this.settings.touchDrag && !isTouchIE){
			this.$stage.on('touchstart touchcancel', $.proxy(function(event) { this.eventsRouter(event) }, this));
		}

		// catch transitionEnd event
		if (this.transitionEndVendor) {
			this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, false);
		}

		// responsive
		if (this.settings.responsive !== false) {
			this.on(window, 'resize', $.proxy(this.onThrottledResize, this));
		}
	};

	/**
	 * Handles touchstart/mousedown event.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var ev, isTouchEvent, pageX, pageY, animatedPos;

		ev = event.originalEvent || event || window.event;

		// prevent right click
		if (ev.which === 3 || this.state.isTouch) {
			return false;
		}

		if (ev.type === 'mousedown') {
			this.$stage.addClass('owl-grab');
		}

		this.trigger('drag');
		this.drag.startTime = new Date().getTime();
		this.speed(0);
		this.state.isTouch = true;
		this.state.isScrolling = false;
		this.state.isSwiping = false;
		this.drag.distance = 0;

		pageX = getTouches(ev).x;
		pageY = getTouches(ev).y;

		// get stage position left
		this.drag.offsetX = this.$stage.position().left;
		this.drag.offsetY = this.$stage.position().top;

		if (this.settings.rtl) {
			this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width()
				+ this.settings.margin;
		}

		// catch position // ie to fix
		if (this.state.inMotion && this.support3d) {
			animatedPos = this.getTransformProperty();
			this.drag.offsetX = animatedPos;
			this.animate(animatedPos);
			this.state.inMotion = true;
		} else if (this.state.inMotion && !this.support3d) {
			this.state.inMotion = false;
			return false;
		}

		this.drag.startX = pageX - this.drag.offsetX;
		this.drag.startY = pageY - this.drag.offsetY;

		this.drag.start = pageX - this.drag.startX;
		this.drag.targetEl = ev.target || ev.srcElement;
		this.drag.updatedX = this.drag.start;

		// to do/check
		// prevent links and images dragging;
		if (this.drag.targetEl.tagName === "IMG" || this.drag.targetEl.tagName === "A") {
			this.drag.targetEl.draggable = false;
		}

		$(document).on('mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents', $.proxy(function(event) {this.eventsRouter(event)},this));
	};

	/**
	 * Handles the touchmove/mousemove events.
	 * @todo Simplify
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var ev, isTouchEvent, pageX, pageY, minValue, maxValue, pull;

		if (!this.state.isTouch) {
			return;
		}

		if (this.state.isScrolling) {
			return;
		}

		ev = event.originalEvent || event || window.event;

		pageX = getTouches(ev).x;
		pageY = getTouches(ev).y;

		// Drag Direction
		this.drag.currentX = pageX - this.drag.startX;
		this.drag.currentY = pageY - this.drag.startY;
		this.drag.distance = this.drag.currentX - this.drag.offsetX;

		// Check move direction
		if (this.drag.distance < 0) {
			this.state.direction = this.settings.rtl ? 'right' : 'left';
		} else if (this.drag.distance > 0) {
			this.state.direction = this.settings.rtl ? 'left' : 'right';
		}
		// Loop
		if (this.settings.loop) {
			if (this.op(this.drag.currentX, '>', this.coordinates(this.minimum())) && this.state.direction === 'right') {
				this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length);
			} else if (this.op(this.drag.currentX, '<', this.coordinates(this.maximum())) && this.state.direction === 'left') {
				this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length);
			}
		} else {
			// pull
			minValue = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maxValue = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? this.drag.distance / 5 : 0;
			this.drag.currentX = Math.max(Math.min(this.drag.currentX, minValue + pull), maxValue + pull);
		}

		// Lock browser if swiping horizontal

		if ((this.drag.distance > 8 || this.drag.distance < -8)) {
			if (ev.preventDefault !== undefined) {
				ev.preventDefault();
			} else {
				ev.returnValue = false;
			}
			this.state.isSwiping = true;
		}

		this.drag.updatedX = this.drag.currentX;

		// Lock Owl if scrolling
		if ((this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === false) {
			this.state.isScrolling = true;
			this.drag.updatedX = this.drag.start;
		}

		this.animate(this.drag.updatedX);
	};

	/**
	 * Handles the touchend/mouseup events.
	 * @protected
	 */
	Owl.prototype.onDragEnd = function(event) {
		var compareTimes, distanceAbs, closest;

		if (!this.state.isTouch) {
			return;
		}

		if (event.type === 'mouseup') {
			this.$stage.removeClass('owl-grab');
		}

		this.trigger('dragged');

		// prevent links and images dragging;
		this.drag.targetEl.removeAttribute("draggable");

		// remove drag event listeners

		this.state.isTouch = false;
		this.state.isScrolling = false;
		this.state.isSwiping = false;

		// to check
		if (this.drag.distance === 0 && this.state.inMotion !== true) {
			this.state.inMotion = false;
			return false;
		}

		// prevent clicks while scrolling

		this.drag.endTime = new Date().getTime();
		compareTimes = this.drag.endTime - this.drag.startTime;
		distanceAbs = Math.abs(this.drag.distance);

		// to test
		if (distanceAbs > 3 || compareTimes > 300) {
			this.removeClick(this.drag.targetEl);
		}

		closest = this.closest(this.drag.updatedX);

		this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
		this.current(closest);
		this.invalidate('position');
		this.update();

		// if pullDrag is off then fire transitionEnd event manually when stick
		// to border
		if (!this.settings.pullDrag && this.drag.updatedX === this.coordinates(closest)) {
			this.transitionEnd();
		}

		this.drag.distance = 0;

		$(document).off('.owl.dragEvents');
	};

	/**
	 * Attaches `preventClick` to disable link while swipping.
	 * @protected
	 * @param {HTMLElement} [target] - The target of the `click` event.
	 */
	Owl.prototype.removeClick = function(target) {
		this.drag.targetEl = target;
		$(target).on('click.preventClick', this.e._preventClick);
		// to make sure click is removed:
		window.setTimeout(function() {
			$(target).off('click.preventClick');
		}, 300);
	};

	/**
	 * Suppresses click event.
	 * @protected
	 * @param {Event} ev - The event arguments.
	 */
	Owl.prototype.preventClick = function(ev) {
		if (ev.preventDefault) {
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
		if (ev.stopPropagation) {
			ev.stopPropagation();
		}
		$(ev.target).off('click.preventClick');
	};

	/**
	 * Catches stage position while animate (only CSS3).
	 * @protected
	 * @returns
	 */
	Owl.prototype.getTransformProperty = function() {
		var transform, matrix3d;

		transform = window.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + 'transform');
		// var transform = this.$stage.css(this.vendorName + 'transform')
		transform = transform.replace(/matrix(3d)?\(|\)/g, '').split(',');
		matrix3d = transform.length === 16;

		return matrix3d !== true ? transform[4] : transform[12];
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate) {
		var position = -1, pull = 30, width = this.width(), coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				if (coordinate > value - pull && coordinate < value + pull) {
					position = index;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = this.state.direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		this.trigger('translate');
		this.state.inMotion = this.speed() > 0;

		if (this.support3d) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px' + ',0px, 0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (this.state.isTouch) {
			this.$stage.css({
				left: coordinate + 'px'
			});
		} else {
			this.$stage.animate({
				left: coordinate
			}, this.speed() / 1000, this.settings.fallbackEasing, $.proxy(function() {
				if (this.state.inMotion) {
					this.transitionEnd();
				}
			}, this));
		}
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} part - The part to invalidate.
	 */
	Owl.prototype.invalidate = function(part) {
		this._invalidated[part] = true;
	}

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position for an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = (relative ? this._items.length : this._items.length + this._clones.length);

		if (!$.isNumeric(position) || n < 1) {
			return undefined;
		}

		if (this._clones.length) {
			position = ((position % n) + n) % n;
		} else {
			position = Math.max(this.minimum(relative), Math.min(this.maximum(relative), position));
		}

		return position;
	};

	/**
	 * Converts an absolute position for an item into a relative position.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position = this.normalize(position);
		position = position - this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for an item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var maximum, width, i = 0, coordinate,
			settings = this.settings;

		if (relative) {
			return this._items.length - 1;
		}

		if (!settings.loop && settings.center) {
			maximum = this._items.length - 1;
		} else if (!settings.loop && !settings.center) {
			maximum = this._items.length - settings.items;
		} else if (settings.loop || settings.center) {
			maximum = this._items.length + settings.items;
		} else if (settings.autoWidth || settings.merge) {
			revert = settings.rtl ? 1 : -1;
			width = this.$stage.width() - this.$element.width();
			while (coordinate = this.coordinates(i)) {
				if (coordinate * revert >= width) {
					break;
				}
				maximum = ++i;
			}
		} else {
			throw 'Can not detect maximum absolute position.'
		}

		return maximum;
	};

	/**
	 * Gets the minimum position for an item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		if (relative) {
			return 0;
		}

		return this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var coordinate = null;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[position - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1);
		} else {
			coordinate = this._coordinates[position - 1] || 0;
		}

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		if (this.settings.loop) {
			var distance = position - this.relative(this.current()),
				revert = this.current(),
				before = this.current(),
				after = this.current() + distance,
				direction = before - after < 0 ? true : false,
				items = this._clones.length + this._items.length;

			if (after < this.settings.items && direction === false) {
				revert = before + this._items.length;
				this.reset(revert);
			} else if (after >= items - this.settings.items && direction === true) {
				revert = before - this._items.length;
				this.reset(revert);
			}
			window.clearTimeout(this.e._goToLoop);
			this.e._goToLoop = window.setTimeout($.proxy(function() {
				this.speed(this.duration(this.current(), revert + distance, speed));
				this.current(revert + distance);
				this.update();
			}, this), 30);
		} else {
			this.speed(this.duration(this.current(), position, speed));
			this.current(position);
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.transitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.state.inMotion = false;
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset($.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		position = position === undefined ? this._items.length : this.normalize(position, true);

		this.trigger('add', { content: content, position: position });

		if (this._items.length === 0 || position === this._items.length) {
			this.$stage.append(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Adds triggerable events.
	 * @protected
	 */
	Owl.prototype.addTriggerableEvents = function() {
		var handler = $.proxy(function(callback, event) {
			return $.proxy(function(e) {
				if (e.relatedTarget !== this) {
					this.suppress([ event ]);
					callback.apply(this, [].slice.call(arguments, 1));
					this.release([ event ]);
				}
			}, this);
		}, this);

		$.each({
			'next': this.next,
			'prev': this.prev,
			'to': this.to,
			'destroy': this.destroy,
			'refresh': this.refresh,
			'replace': this.replace,
			'add': this.add,
			'remove': this.remove
		}, $.proxy(function(event, callback) {
			this.$element.on(event + '.owl.carousel', handler(callback, event + '.owl.carousel'));
		}, this));

	};

	/**
	 * Watches the visibility of the carousel element.
	 * @protected
	 */
	Owl.prototype.watchVisibility = function() {

		// test on zepto
		if (!isElVisible(this.$element.get(0))) {
			this.$element.addClass('owl-hidden');
			window.clearInterval(this.e._checkVisibile);
			this.e._checkVisibile = window.setInterval($.proxy(checkVisible, this), 500);
		}

		function isElVisible(el) {
			return el.offsetWidth > 0 && el.offsetHeight > 0;
		}

		function checkVisible() {
			if (isElVisible(this.$element.get(0))) {
				this.$element.removeClass('owl-hidden');
				this.refresh();
				window.clearInterval(this.e._checkVisibile);
			}
		}
	};

	/**
	 * Preloads images with auto width.
	 * @protected
	 * @todo Still to test
	 */
	Owl.prototype.preloadAutoWidthImages = function(imgs) {
		var loaded, that, $el, img;

		loaded = 0;
		that = this;
		imgs.each(function(i, el) {
			$el = $(el);
			img = new Image();

			img.onload = function() {
				loaded++;
				$el.attr('src', img.src);
				$el.css('opacity', 1);
				if (loaded >= imgs.length) {
					that.state.imagesLoaded = true;
					that.initialize();
				}
			};

			img.src = $el.attr('src') || $el.attr('data-src') || $el.attr('data-src-retina');
		});
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		if (this.$element.hasClass(this.settings.themeClass)) {
			this.$element.removeClass(this.settings.themeClass);
		}

		if (this.settings.responsive !== false) {
			$(window).off('resize.owl.carousel');
		}

		if (this.transitionEndVendor) {
			this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
		}

		for ( var i in this._plugins) {
			this._plugins[i].destroy();
		}

		if (this.settings.mouseDrag || this.settings.touchDrag) {
			this.$stage.off('mousedown touchstart touchcancel');
			$(document).off('.owl.dragEvents');
			this.$stage.get(0).onselectstart = function() {};
			this.$stage.off('dragstart', function() { return false });
		}

		// remove event handlers in the ".owl.carousel" namespace
		this.$element.off('.owl');

		this.$stage.children('.cloned').remove();
		this.e = null;
		this.$element.removeData('owlCarousel');

		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.unwrap();
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers an public event.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=.owl.carousel] - The event namespace.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].apply(this, event);
			}
		}

		return event;
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	}

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	}

	/**
	 * Checks the availability of some browser features.
	 * @protected
	 */
	Owl.prototype.browserSupport = function() {
		this.support3d = isPerspective();

		if (this.support3d) {
			this.transformVendor = isTransform();

			// take transitionend event name by detecting transition
			var endVendors = [ 'transitionend', 'webkitTransitionEnd', 'transitionend', 'oTransitionEnd' ];
			this.transitionEndVendor = endVendors[isTransition()];

			// take vendor name from transform name
			this.vendorName = this.transformVendor.replace(/Transform/i, '');
			this.vendorName = this.vendorName !== '' ? '-' + this.vendorName.toLowerCase() + '-' : '';
		}

		this.state.orientation = window.orientation;
	};

	/**
	 * Get touch/drag coordinats.
	 * @private
	 * @param {event} - mousedown/touchstart event
	 * @returns {object} - Contains X and Y of current mouse/touch position
	 */

	function getTouches(event) {
		if (event.touches !== undefined) {
			return {
				x: event.touches[0].pageX,
				y: event.touches[0].pageY
			};
		}

		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return {
					x: event.pageX,
					y: event.pageY
				};
			}

		if (event.pageX === undefined) {
			return {
					x: event.clientX,
					y: event.clientY
				};
			}
		}
	}

	/**
	 * Checks for CSS support.
	 * @private
	 * @param {Array} array - The CSS properties to check for.
	 * @returns {Array} - Contains the supported CSS property name and its index or `false`.
	 */
	function isStyleSupported(array) {
		var p, s, fake = document.createElement('div'), list = array;
		for (p in list) {
			s = list[p];
			if (typeof fake.style[s] !== 'undefined') {
				fake = null;
				return [ s, p ];
			}
		}
		return [ false ];
	}

	/**
	 * Checks for CSS transition support.
	 * @private
	 * @todo Realy bad design
	 * @returns {Number}
	 */
	function isTransition() {
		return isStyleSupported([ 'transition', 'WebkitTransition', 'MozTransition', 'OTransition' ])[1];
	}

	/**
	 * Checks for CSS transform support.
	 * @private
	 * @returns {String} The supported property name or false.
	 */
	function isTransform() {
		return isStyleSupported([ 'transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ])[0];
	}

	/**
	 * Checks for CSS perspective support.
	 * @private
	 * @returns {String} The supported property name or false.
	 */
	function isPerspective() {
		return isStyleSupported([ 'perspective', 'webkitPerspective', 'MozPerspective', 'OPerspective', 'MsPerspective' ])[0];
	}

	/**
	 * Checks wether touch is supported or not.
	 * @private
	 * @returns {Boolean}
	 */
	function isTouchSupport() {
		return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
	}

	/**
	 * Checks wether touch is supported or not for IE.
	 * @private
	 * @returns {Boolean}
	 */
	function isTouchSupportIE() {
		return window.navigator.msPointerEnabled;
	}

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @public
	 */
	$.fn.owlCarousel = function(options) {
		return this.each(function() {
			if (!$(this).data('owlCarousel')) {
				$(this).data('owlCarousel', new Owl(this, options));
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = ((e.property && e.property.value) || this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position++)), load);
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	}

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url(' + url + ')',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function() {
				if (this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.autoHeight && e.property.name == 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (this._core.settings.autoHeight && e.element.closest('.' + this._core.settings.itemClass)
					=== this._core.$stage.children().eq(this._core.current())) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		this._core.$stage.parent()
			.height(this._core.$stage.children().eq(this._core.current()).height())
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * Whether this is in fullscreen or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._fullscreen = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'resize.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.video && !this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refresh.owl.carousel changed.owl.carousel': $.proxy(function(e) {
				if (this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				var $element = $(e.content).find('.owl-video');
				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {

		var type = target.attr('data-vimeo-id') ? 'vimeo' : 'youtube',
			id = target.attr('data-vimeo-id') || target.attr('data-youtube-id'),
			width = target.attr('data-width') || this._core.settings.videoWidth,
			height = target.attr('data-height') || this._core.settings.videoHeight,
			url = target.attr('href');

		if (url) {
			id = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {

		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "http://img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: 'http://vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} ev - The event arguments.
	 */
	Video.prototype.play = function(ev) {
		this._core.trigger('play', null, 'video');

		if (this._playing) {
			this.stop();
		}

		var target = $(ev.target || ev.srcElement),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html, wrap;

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/'
				+ video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="http://player.vimeo.com/video/' + video.id + '?autoplay=1" width="' + width
				+ '" height="' + height
				+ '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}

		item.addClass('owl-video-playing');
		this._playing = item;

		wrap = $('<div style="height:' + height + 'px; width:' + width + 'px" class="owl-video-frame">'
			+ html + '</div>');
		target.after(wrap);
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {

		// if Vimeo Fullscreen mode
		var element = document.fullscreenElement || document.mozFullScreenElement
			|| document.webkitFullscreenElement;

		if (element && $(element).parent().hasClass('owl-video-frame')) {
			this._core.speed(0);
			this._fullscreen = true;
		}

		if (element && this._fullscreen && this._playing) {
			return false;
		}

		// comming back from fullscreen
		if (this._fullscreen) {
			this._fullscreen = false;
			return false;
		}

		// check full screen mode and window orientation
		if (this._playing) {
			if (this._core.state.orientation !== window.orientation) {
				this._core.state.orientation = window.orientation;
				return false;
			}
		}

		return true;
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				this.swapping = e.type == 'translated';
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1 || !this.core.support3d) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing)
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', clear);
		}

		if (incoming) {
			next.addClass('animated owl-animated-in')
				.addClass(incoming)
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', clear);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.transitionEnd();
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Autoplay.Defaults, this.core.options);

		this.handlers = {
			'translated.owl.carousel refreshed.owl.carousel': $.proxy(function() {
				this.autoplay();
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				this.play(t, s);
			}, this),
			'stop.owl.autoplay': $.proxy(function() {
				this.stop();
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this.core.settings.autoplayHoverPause) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this.core.settings.autoplayHoverPause) {
					this.autoplay();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * @protected
	 * @todo Must be documented.
	 */
	Autoplay.prototype.autoplay = function() {
		if (this.core.settings.autoplay && !this.core.state.videoPlay) {
			window.clearInterval(this.interval);

			this.interval = window.setInterval($.proxy(function() {
				this.play();
			}, this), this.core.settings.autoplayTimeout);
		} else {
			window.clearInterval(this.interval);
		}
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - ...
	 * @param {Number} [speed] - ...
	 * @returns {Boolean|undefined} - ...
	 * @todo Must be documented.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		// if tab is inactive - doesnt work in <IE10
		if (document.hidden === true) {
			return;
		}

		if (this.core.state.isTouch || this.core.state.isScrolling
			|| this.core.state.isSwiping || this.core.state.inMotion) {
			return;
		}

		if (this.core.settings.autoplay === false) {
			window.clearInterval(this.interval);
			return;
		}

		this.core.next(this.core.settings.autoplaySpeed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		window.clearInterval(this.interval);
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		window.clearInterval(this.interval);
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this.interval);

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.push($(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot'));
				}
			}, this),
			'add.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, $(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot'));
				}
			}, this),
			'remove.owl.carousel prepared.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'change.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					if (!this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
						var current = this._core.current(),
							maximum = this._core.maximum(),
							minimum = this._core.minimum();
						e.data = e.property.value > maximum
							? current >= maximum ? minimum : maximum
							: e.property.value < minimum ? maximum : e.property.value;
					}
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function() {
				if (!this._initialized) {
					this.initialize();
					this._initialized = true;
				}
				this._core.trigger('refresh', null, 'navigation');
				this.update();
				this.draw();
				this._core.trigger('refreshed', null, 'navigation');
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navRewind: true,
		navText: [ 'prev', 'next' ],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [ 'owl-prev', 'owl-next' ],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotData: false,
		dotsSpeed: false,
		dotsContainer: false,
		controlsClass: 'owl-controls'
	}

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var $container, override,
			options = this._core.settings;

		// create the indicator template
		if (!options.dotsData) {
			this._templates = [ $('<div>')
				.addClass(options.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		// create controls container if needed
		if (!options.navContainer || !options.dotsContainer) {
			this._controls.$container = $('<div>')
				.addClass(options.controlsClass)
				.appendTo(this.$element);
		}

		// create DOM structure for absolute navigation
		this._controls.$indicators = options.dotsContainer ? $(options.dotsContainer)
			: $('<div>').hide().addClass(options.dotsClass).appendTo(this._controls.$container);

		this._controls.$indicators.on('click', 'div', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$indicators)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, options.dotsSpeed);
		}, this));

		// create DOM structure for relative navigation
		$container = options.navContainer ? $(options.navContainer)
			: $('<div>').addClass(options.navContainerClass).prependTo(this._controls.$container);

		this._controls.$next = $('<' + options.navElement + '>');
		this._controls.$previous = this._controls.$next.clone();

		this._controls.$previous
			.addClass(options.navClass[0])
			.html(options.navText[0])
			.hide()
			.prependTo($container)
			.on('click', $.proxy(function(e) {
				this.prev(options.navSpeed);
			}, this));
		this._controls.$next
			.addClass(options.navClass[1])
			.html(options.navText[1])
			.hide()
			.appendTo($container)
			.on('click', $.proxy(function(e) {
				this.next(options.navSpeed);
			}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	}

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			options = this._core.settings,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			size = options.center || options.autoWidth || options.dotData
				? 1 : options.dotsEach || options.items;

		if (options.slideBy !== 'page') {
			options.slideBy = Math.min(options.slideBy, options.items);
		}

		if (options.dots || options.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: i - lower,
						end: i - lower + size - 1
					});
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	}

	/**
	 * Draws the user interface.
	 * @todo The option `dotData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference, i, html = '',
			options = this._core.settings,
			$items = this._core.$stage.children(),
			index = this._core.relative(this._core.current());

		if (options.nav && !options.loop && !options.navRewind) {
			this._controls.$previous.toggleClass('disabled', index <= 0);
			this._controls.$next.toggleClass('disabled', index >= this._core.maximum());
		}

		this._controls.$previous.toggle(options.nav);
		this._controls.$next.toggle(options.nav);

		if (options.dots) {
			difference = this._pages.length - this._controls.$indicators.children().length;

			if (options.dotData && difference !== 0) {
				for (i = 0; i < this._controls.$indicators.children().length; i++) {
					html += this._templates[this._core.relative(i)];
				}
				this._controls.$indicators.html(html);
			} else if (difference > 0) {
				html = new Array(difference + 1).join(this._templates[0]);
				this._controls.$indicators.append(html);
			} else if (difference < 0) {
				this._controls.$indicators.children().slice(difference).remove();
			}

			this._controls.$indicators.find('.active').removeClass('active');
			this._controls.$indicators.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}

		this._controls.$indicators.toggle(options.dots);
	}

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotData
				? 1 : settings.dotsEach || settings.items)
		};
	}

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var index = this._core.relative(this._core.current());
		return $.grep(this._pages, function(o) {
			return o.start <= index && o.end >= index;
		}).pop();
	}

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			options = this._core.settings;

		if (options.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += options.slideBy : position -= options.slideBy;
		}
		return position;
	}

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	}

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	}

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash table for the hashes.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function() {
				if (this._core.settings.startPosition == 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				var hash = $(e.content).find('[data-hash]').andSelf('[data-hash]').attr('data-hash');
				this._hashes[hash] = e.content;
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function() {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]) || 0;

			if (!hash) {
				return false;
			}

			this._core.to(position, false, true);
		}, this));
	}

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=c20b4a7c215b78e71b0b)
 * Config saved to config.json and https://gist.github.com/c20b4a7c215b78e71b0b
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2015, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var head = $('head');
    head.prepend($.map(class_array, function (class_name) {
      if (head.has('.' + class_name).length === 0) {
        return '<meta class="' + class_name + '" />';
      }
    }));
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-small-only',
    'foundation-mq-medium',
    'foundation-mq-medium-only',
    'foundation-mq-large',
    'foundation-mq-large-only',
    'foundation-mq-xlarge',
    'foundation-mq-xlarge-only',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function () {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) {
            return context;
          }
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) {
      arr.push('data');
    }
    if (this.namespace.length > 0) {
      arr.push(this.namespace);
    }
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        bind = function(){
          var $this = S(this),
              should_bind_events = !$this.data(self.attr_name(true) + '-init');
          $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

          if (should_bind_events) {
            self.events(this);
          }
        };

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      bind.call(this.scope);
    } else {
      S('[' + this.attr_name() +']', this.scope).each(bind);
    }
    // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };

  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

  window.matchMedia || (window.matchMedia = function() {
      "use strict";

      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media);

      // For those that don't support matchMedium
      if (!styleMedia) {
          var style       = document.createElement('style'),
              script      = document.getElementsByTagName('script')[0],
              info        = null;

          style.type  = 'text/css';
          style.id    = 'matchmediajs-test';

          script.parentNode.insertBefore(style, script);

          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

          styleMedia = {
              matchMedium: function(media) {
                  var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                  if (style.styleSheet) {
                      style.styleSheet.cssText = text;
                  } else {
                      style.textContent = text;
                  }

                  // Test if media query is true or false
                  return info.width === '1px';
              }
          };
      }

      return function(media) {
          return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
          };
      };
  }());

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function(jQuery) {


  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + 'RequestAnimationFrame' ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + 'CancelAnimationFrame' ] ||
      window[ vendors[lastTime] + 'CancelRequestAnimationFrame' ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);

      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( $ ));

  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  function MediaQuery(selector) {
    this.selector = selector;
    this.query = '';
  }

  MediaQuery.prototype.toString = function () {
    return this.query || (this.query = S(this.selector).css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''));
  };

  window.Foundation = {
    name : 'Foundation',

    version : '5.5.3',

    media_queries : {
      'small'       : new MediaQuery('.foundation-mq-small'),
      'small-only'  : new MediaQuery('.foundation-mq-small-only'),
      'medium'      : new MediaQuery('.foundation-mq-medium'),
      'medium-only' : new MediaQuery('.foundation-mq-medium-only'),
      'large'       : new MediaQuery('.foundation-mq-large'),
      'large-only'  : new MediaQuery('.foundation-mq-large-only'),
      'xlarge'      : new MediaQuery('.foundation-mq-xlarge'),
      'xlarge-only' : new MediaQuery('.foundation-mq-xlarge-only'),
      'xxlarge'     : new MediaQuery('.foundation-mq-xxlarge')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global : {
      namespace : undefined
    },

    init : function (scope, libraries, method, options, response) {
      var args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      S(window).load(function () {
        S(window)
          .trigger('resize.fndtn.clearing')
          .trigger('resize.fndtn.dropdown')
          .trigger('resize.fndtn.equalizer')
          .trigger('resize.fndtn.interchange')
          .trigger('resize.fndtn.joyride')
          .trigger('resize.fndtn.magellan')
          .trigger('resize.fndtn.topbar')
          .trigger('resize.fndtn.slider');
      });

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
              $.extend(true, this.libs[lib].settings, args[lib]);
            } else if (typeof this.libs[lib].defaults !== 'undefined') {
              $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace : function () {

      // Description:
      //    Don't bother reading the namespace out of the meta tag
      //    if the namespace has been set globally in javascript
      //
      // Example:
      //    Foundation.global.namespace = 'my-namespace';
      // or make it an empty string:
      //    Foundation.global.namespace = '';
      //
      //

      // If the namespace has not been set (is undefined), try to read it out of the meta element.
      // Otherwise use the globally defined namespace, even if it's empty ('')
      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

      // Finally, if the namsepace is either undefined or false, set it to an empty string.
      // Otherwise use the namespace value.
      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          if (timer == null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      //    Immediate (Bool): Whether the function should be called at the beginning
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) {
            result = func.apply(context, args);
          }
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options
      //    attribute.
      data_options : function (el, data_attr_name) {
        data_attr_name = data_attr_name || 'options';
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-' + data_attr_name);
              }

              return el.data(data_attr_name);
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';');
        ii = opts_arr.length;

        function isNumber (o) {
          return !isNaN (o - 0) && o !== null && o !== '' && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') {
            return $.trim(str);
          }
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) {
            p[1] = true;
          }
          if (/false/i.test(p[1])) {
            p[1] = false;
          }
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1]);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if (Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '"/>');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' +
              Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Function to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        function pictures_has_height(images) {
          var pictures_number = images.length;

          for (var i = pictures_number - 1; i >= 0; i--) {
            if(images.attr('height') === undefined) {
              return false;
            };
          };

          return true;
        }

        if (unloaded === 0 || pictures_has_height(images)) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) {
          this.fidx = 0;
        }
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      },

      // Description:
      //    Helper for window.matchMedia
      //
      // Arguments:
      //    mq (String): Media query
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not
      match : function (mq) {
        return window.matchMedia(mq).matches;
      },

      // Description:
      //    Helpers for checking Foundation default media queries with JS
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not

      is_small_up : function () {
        return this.match(Foundation.media_queries.small);
      },

      is_medium_up : function () {
        return this.match(Foundation.media_queries.medium);
      },

      is_large_up : function () {
        return this.match(Foundation.media_queries.large);
      },

      is_xlarge_up : function () {
        return this.match(Foundation.media_queries.xlarge);
      },

      is_xxlarge_up : function () {
        return this.match(Foundation.media_queries.xxlarge);
      },

      is_small_only : function () {
        return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_medium_only : function () {
        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_large_only : function () {
        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xxlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, window, window.document));

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version : '5.5.3',

    settings : {
      index : 0,
      start_offset : 0,
      sticky_class : 'sticky',
      custom_back_text : false,
      back_text : 'Back',
      mobile_show_parent_link : false,
      is_hover : true,
      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
      sticky_on : 'all',
      dropdown_autoclose: true
    },

    init : function (section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar');

      this.bindings(method, options);

      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section, .top-bar-section', this);
        topbar.data('index', 0);
        var topbarContainer = topbar.parent();
        if (topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings) ) {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.sticky_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight());
          topbar.data('stickyoffset', topbarContainer.offset().top);
        } else {
          topbar.data('height', topbar.outerHeight());
        }

        if (!settings.assembled) {
          self.assemble(topbar);
        }

        if (settings.is_hover) {
          self.S('.has-dropdown', topbar).addClass('not-click');
        } else {
          self.S('.has-dropdown', topbar).removeClass('not-click');
        }

        // Pad body when sticky (scrolled) or fixed.
        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

        if (topbarContainer.hasClass('fixed')) {
          self.S('body').addClass('f-topbar-fixed');
        }
      });

    },

    is_sticky : function (topbar, topbarContainer, settings) {
      var sticky     = topbarContainer.hasClass(settings.sticky_class);
      var smallMatch = matchMedia(Foundation.media_queries.small).matches;
      var medMatch   = matchMedia(Foundation.media_queries.medium).matches;
      var lrgMatch   = matchMedia(Foundation.media_queries.large).matches;

      if (sticky && settings.sticky_on === 'all') {
        return true;
      }
      if (sticky && this.small() && settings.sticky_on.indexOf('small') !== -1) {
        if (smallMatch && !medMatch && !lrgMatch) { return true; }
      }
      if (sticky && this.medium() && settings.sticky_on.indexOf('medium') !== -1) {
        if (smallMatch && medMatch && !lrgMatch) { return true; }
      }
      if (sticky && this.large() && settings.sticky_on.indexOf('large') !== -1) {
        if (smallMatch && medMatch && lrgMatch) { return true; }
      }

       return false;
    },

    toggle : function (toggleEl) {
      var self = this,
          topbar;

      if (toggleEl) {
        topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');

      var section = self.S('section, .top-bar-section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({left : '0%'});
          $('>.name', section).css({left : '100%'});
        } else {
          section.css({right : '0%'});
          $('>.name', section).css({right : '100%'});
        }

        self.S('li.moved', section).removeClass('moved');
        topbar.data('index', 0);

        topbar
          .toggleClass('expanded')
          .css('height', '');
      }

      if (settings.scrolltop) {
        if (!topbar.hasClass('expanded')) {
          if (topbar.hasClass('fixed')) {
            topbar.parent().addClass('fixed');
            topbar.removeClass('fixed');
            self.S('body').addClass('f-topbar-fixed');
          }
        } else if (topbar.parent().hasClass('fixed')) {
          if (settings.scrolltop) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            self.S('body').removeClass('f-topbar-fixed');

            window.scrollTo(0, 0);
          } else {
            topbar.parent().removeClass('expanded');
          }
        }
      } else {
        if (self.is_sticky(topbar, topbar.parent(), settings)) {
          topbar.parent().addClass('fixed');
        }

        if (topbar.parent().hasClass('fixed')) {
          if (!topbar.hasClass('expanded')) {
            topbar.removeClass('fixed');
            topbar.parent().removeClass('expanded');
            self.update_sticky_positioning();
          } else {
            topbar.addClass('fixed');
            topbar.parent().addClass('expanded');
            self.S('body').addClass('f-topbar-fixed');
          }
        }
      }
    },

    timer : null,

    events : function (bar) {
      var self = this,
          S = this.S;

      S(this.scope)
        .off('.topbar')
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
          e.preventDefault();
          self.toggle(this);
        })
        .on('click.fndtn.topbar contextmenu.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function (e) {
          var li = $(this).closest('li'),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if (settings.dropdown_autoclose && settings.is_hover) {
            var hoverLi = $(this).closest('.hover');
            hoverLi.removeClass('hover');
          }
          if (self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown')) {
            self.toggle();
          }

        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
          var li = S(this),
              target = S(e.target),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if (target.data('revealId')) {
            self.toggle();
            return;
          }

          if (self.breakpoint()) {
            return;
          }

          if (settings.is_hover && !Modernizr.touch) {
            return;
          }

          e.stopImmediatePropagation();

          if (li.hasClass('hover')) {
            li
              .removeClass('hover')
              .find('li')
              .removeClass('hover');

            li.parents('li.hover')
              .removeClass('hover');
          } else {
            li.addClass('hover');

            $(li).siblings().removeClass('hover');

            if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
              e.preventDefault();
            }
          }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
          if (self.breakpoint()) {

            e.preventDefault();

            var $this = S(this),
                topbar = $this.closest('[' + self.attr_name() + ']'),
                section = topbar.find('section, .top-bar-section'),
                dropdownHeight = $this.next('.dropdown').outerHeight(),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');

            if (!self.rtl) {
              section.css({left : -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
            } else {
              section.css({right : -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
            }

            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
          }
        });

      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
          self.resize.call(self);
      }, 50)).trigger('resize.fndtn.topbar').load(function () {
          // Ensure that the offset is calculated after all of the pages resources have loaded
          S(this).trigger('resize.fndtn.topbar');
      });

      S('body').off('.topbar').on('click.fndtn.topbar', function (e) {
        var parent = S(e.target).closest('li').closest('li.hover');

        if (parent.length > 0) {
          return;
        }

        S('[' + self.attr_name() + '] li.hover').removeClass('hover');
      });

      // Go up a level on Click
      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = S(this),
            topbar = $this.closest('[' + self.attr_name() + ']'),
            section = topbar.find('section, .top-bar-section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({left : -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
        } else {
          section.css({right : -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
        }

        if (topbar.data('index') === 0) {
          topbar.css('height', '');
        } else {
          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });

      // Show dropdown menus when their items are focused
      S(this.scope).find('.dropdown a')
        .focus(function () {
          $(this).parents('.has-dropdown').addClass('hover');
        })
        .blur(function () {
          $(this).parents('.has-dropdown').removeClass('hover');
        });
    },

    resize : function () {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var topbar = self.S(this),
            settings = topbar.data(self.attr_name(true) + '-init');

        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
        var stickyOffset;

        if (!self.breakpoint()) {
          var doToggle = topbar.hasClass('expanded');
          topbar
            .css('height', '')
            .removeClass('expanded')
            .find('li')
            .removeClass('hover');

            if (doToggle) {
              self.toggle(topbar);
            }
        }

        if (self.is_sticky(topbar, stickyContainer, settings)) {
          if (stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');

            stickyOffset = stickyContainer.offset().top;
            if (self.S(document.body).hasClass('f-topbar-fixed')) {
              stickyOffset -= topbar.data('height');
            }

            topbar.data('stickyoffset', stickyOffset);
            stickyContainer.addClass('fixed');
          } else {
            stickyOffset = stickyContainer.offset().top;
            topbar.data('stickyoffset', stickyOffset);
          }
        }

      });
    },

    breakpoint : function () {
      return !matchMedia(Foundation.media_queries['topbar']).matches;
    },

    small : function () {
      return matchMedia(Foundation.media_queries['small']).matches;
    },

    medium : function () {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },

    large : function () {
      return matchMedia(Foundation.media_queries['large']).matches;
    },

    assemble : function (topbar) {
      var self = this,
          settings = topbar.data(this.attr_name(true) + '-init'),
          section = self.S('section, .top-bar-section', topbar);

      // Pull element out of the DOM for manipulation
      section.detach();

      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href'),
            $titleLi;

        if (!$dropdown.find('.title.back').length) {

          if (settings.mobile_show_parent_link == true && url) {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="' + url + '">' + $link.html() +'</a></li>');
          } else {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
          }

          // Copy link to subnav
          if (settings.custom_back_text == true) {
            $('h5>a', $titleLi).html(settings.back_text);
          } else {
            $('h5>a', $titleLi).html(' ' + $link.html());
          }
          $dropdown.prepend($titleLi);
        }
      });

      // Put element back in the DOM
      section.appendTo(topbar);

      // check for sticky
      this.sticky();

      this.assembled(topbar);
    },

    assembled : function (topbar) {
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled : true}));
    },

    height : function (ul) {
      var total = 0,
          self = this;

      $('> li', ul).each(function () {
        total += self.S(this).outerHeight(true);
      });

      return total;
    },

    sticky : function () {
      var self = this;

      this.S(window).on('scroll', function () {
        self.update_sticky_positioning();
      });
    },

    update_sticky_positioning : function () {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window),
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset') + this.settings.start_offset;
        if (!self.S(klass).hasClass('expanded')) {
          if ($window.scrollTop() > (distance)) {
            if (!self.S(klass).hasClass('fixed')) {
              self.S(klass).addClass('fixed');
              self.S('body').addClass('f-topbar-fixed');
            }
          } else if ($window.scrollTop() <= distance) {
            if (self.S(klass).hasClass('fixed')) {
              self.S(klass).removeClass('fixed');
              self.S('body').removeClass('f-topbar-fixed');
            }
          }
        }
      }
    },

    off : function () {
      this.S(this.scope).off('.fndtn.topbar');
      this.S(window).off('.fndtn.topbar');
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.invokeAll('enable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }

  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;
/*!
Waypoints Sticky Element Shortcut - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
  function Sticky(options) {
    this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
    this.element = this.options.element
    this.$element = $(this.element)
    this.createWrapper()
    this.createWaypoint()
  }

  /* Private */
  Sticky.prototype.createWaypoint = function() {
    var originalHandler = this.options.handler

    this.waypoint = new Waypoint($.extend({}, this.options, {
      element: this.wrapper,
      handler: $.proxy(function(direction) {
        var shouldBeStuck = this.options.direction.indexOf(direction) > -1
        var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

        this.$wrapper.height(wrapperHeight)
        this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

        if (originalHandler) {
          originalHandler.call(this, direction)
        }
      }, this)
    }))
  }

  /* Private */
  Sticky.prototype.createWrapper = function() {
    this.$element.wrap(this.options.wrapper)
    this.$wrapper = this.$element.parent()
    this.wrapper = this.$wrapper[0]
  }

  /* Public */
  Sticky.prototype.destroy = function() {
    if (this.$element.parent()[0] === this.wrapper) {
      this.waypoint.destroy()
      this.$element.removeClass(this.options.stuckClass).unwrap()
    }
  }

  Sticky.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }

  Waypoint.Sticky = Sticky
}())
;
/*
Copyright © 2013 Adobe Systems Incorporated.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name jquery
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jquery
 */

/**
 * @fileOverview accessibleMegaMenu plugin
 *
 *<p>Licensed under the Apache License, Version 2.0 (the “License”)
 *<br />Copyright © 2013 Adobe Systems Incorporated.
 *<br />Project page <a href="https://github.com/adobe-accessibility/Accessible-Mega-Menu">https://github.com/adobe-accessibility/Accessible-Mega-Menu</a>
 * @version 0.1
 * @author Michael Jordan
 * @requires jquery
 */

/*jslint browser: true, devel: true, plusplus: true, nomen: true */
/*global jQuery */
(function ($, window, document) {
    "use strict";
    var pluginName = "accessibleMegaMenu",
        defaults = {
            uuidPrefix: "accessible-megamenu", // unique ID's are required to indicate aria-owns, aria-controls and aria-labelledby
            menuClass: "accessible-megamenu", // default css class used to define the megamenu styling
            topNavItemClass: "accessible-megamenu-top-nav-item", // default css class for a top-level navigation item in the megamenu
            panelClass: "accessible-megamenu-panel", // default css class for a megamenu panel
            panelGroupClass: "accessible-megamenu-panel-group", // default css class for a group of items within a megamenu panel
            hoverClass: "hover", // default css class for the hover state
            focusClass: "focus", // default css class for the focus state
            openClass: "open" // default css class for the open state
        },
        Keyboard = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            keyMap: {
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                190: "."
            }
        };
        
    /**
     * @desc Creates a new accessible mega menu instance.
     * @param {jquery} element
     * @param {object} [options] Mega Menu options
     * @param {string} [options.uuidPrefix=accessible-megamenu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
     * @param {string} [options.menuClass=accessible-megamenu] - CSS class used to define the megamenu styling
     * @param {string} [options.topNavItemClass=accessible-megamenu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
     * @param {string} [options.panelClass=accessible-megamenu-panel] - CSS class for a megamenu panel
     * @param {string} [options.panelGroupClass=accessible-megamenu-panel-group] - CSS class for a group of items within a megamenu panel
     * @param {string} [options.hoverClass=hover] - CSS class for the hover state
     * @param {string} [options.focusClass=focus] - CSS class for the focus state
     * @param {string} [options.openClass=open] - CSS class for the open state
     * @constructor
     */
    function AccessibleMegaMenu(element, options) {
        this.element = element;
        
        // merge optional settings and defaults into settings
        this.settings = $.extend({}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
    
    AccessibleMegaMenu.prototype = (function () {

        /* private attributes and methods ------------------------ */
        var uuid = 0,
            keydownTimeoutDuration = 1000,
            keydownSearchString = "",
			isTouch = !!window.hasOwnProperty("ontouchstart"),
            _getPlugin,
            _addUniqueId,
            _togglePanel,
            _clickHandler,
            _clickOutsideHandler,
            _DOMAttrModifiedHandler,
            _focusInHandler,
            _focusOutHandler,
            _keyDownHandler,
            _mouseDownHandler,
            _mouseOverHandler,
            _mouseOutHandler,
            _toggleExpandedEventHandlers;
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_getPlugin
         * @desc Returns the parent accessibleMegaMenu instance for a given element
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _getPlugin = function (element) {
            return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_addUniqueId
         * @desc Adds a unique id and element.
         * The id string starts with the 
         * string defined in settings.uuidPrefix.
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _addUniqueId = function (element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id")) {
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + (++uuid));
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_togglePanel
         * @desc Toggle the display of mega menu panels in response to an event.
         * The optional boolean value 'hide' forces all panels to hide.
         * @param {event} event
         * @param {Boolean} [hide] Hide all mega menu panels when true
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _togglePanel = function (event, hide) {
            var target = $(event.target),
                that = this,
                settings = this.settings,
                menu = this.menu,
                topli = target.closest('.' + settings.topNavItemClass),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                newfocus;
            
            _toggleExpandedEventHandlers.call(this, hide);
            $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu, pointerup.outside-accessible-megamenu', _clickOutsideHandler);
            menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
            
            if (hide) {
                topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);
                if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
                    if ((event.type === 'mouseout' || event.type === 'focusout') && topli.has(document.activeElement).length > 0) {
                        return;
                    }
                    topli.find('[aria-expanded]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                    if ((event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE) || event.type === 'DOMAttrModified') {
                        newfocus = topli.find(':tabbable:first');
                        setTimeout(function () {
                            menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
                            newfocus.focus();
                            that.justFocused = false;
                        }, 99);
                    }
                } else if (topli.length === 0) {
                    menu.find('[aria-expanded=true]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                }
            } else {
                clearTimeout(that.focusTimeoutID);
                topli.siblings()
                    .find('[aria-expanded]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'true');
                topli.find('[aria-expanded]')
                    .attr('aria-expanded', 'true')
                    .addClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'false');
                if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.focus();
                    that.justFocused = false;
                }
                
                _toggleExpandedEventHandlers.call(that);
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickHandler
         * @desc Handle click event on mega menu item
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickHandler = function (event) {
            var target = $(event.target),
                topli = target.closest('.' + this.settings.topNavItemClass),
                panel = target.closest('.' + this.settings.panelClass);
            if (topli.length === 1
                    && panel.length === 0
                    && topli.find('.' + this.settings.panelClass).length === 1) {
                if (!target.hasClass(this.settings.openClass)) {
                    event.preventDefault();
                    event.stopPropagation();
                    _togglePanel.call(this, event);
                } else {
                    if (this.justFocused) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.justFocused = false;
                    } else if (isTouch) {
                        event.preventDefault();
                        event.stopPropagation();
                        _togglePanel.call(this, event, target.hasClass(this.settings.openClass));
                    }
                }
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickOutsideHandler
         * @desc Handle click event outside of a the megamenu
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickOutsideHandler = function (event) {
            if (this.menu.has($(event.target)).length === 0) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_DOMAttrModifiedHandler
         * @desc Handle DOMAttrModified event on panel to respond to Windows 8 Narrator ExpandCollapse pattern
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _DOMAttrModifiedHandler = function (event) {
            if (event.originalEvent.attrName === 'aria-expanded'
                    && event.originalEvent.newValue === 'false'
                    && $(event.target).hasClass(this.settings.openClass)) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusInHandler
         * @desc Handle focusin event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusInHandler = function (event) {
            clearTimeout(this.focusTimeoutID);
            $(event.target)
                .addClass(this.settings.focusClass)
                .on('click.accessible-megamenu', _clickHandler.bind(this));
            this.justFocused = true;
            if (this.panels.filter('.' + this.settings.openClass).length) {
                _togglePanel.call(this, event);
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusOutHandler
         * @desc Handle focusout event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusOutHandler = function (event) {
            this.justFocused = false;
            var that = this,
                target = $(event.target),
                topli = target.closest('.' + this.settings.topNavItemClass),
                keepOpen = false;
            target
                .removeClass(this.settings.focusClass)
                .off('click.accessible-megamenu', _clickHandler);
            
            if (window.cvox) {
                // If ChromeVox is running...
                that.focusTimeoutID = setTimeout(function () {
                    window.cvox.Api.getCurrentNode(function (node) {
                        if (topli.has(node).length) {
                            // and the current node being voiced is in
                            // the mega menu, clearTimeout, 
                            // so the panel stays open.
                            clearTimeout(that.focusTimeoutID);
                        } else {
                            that.focusTimeoutID = setTimeout(function (scope, event, hide) {
                                _togglePanel.call(scope, event, hide);
                            }, 275, that, event, true);
                        }
                    });
                }, 25);
            } else {
                that.focusTimeoutID = setTimeout(function () {
                    _togglePanel.call(that, event, true);
                }, 300);
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_keyDownHandler
         * @desc Handle keydown event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _keyDownHandler = function (event) {
            var target = $($(this).is('.hover:tabbable') ? this : event.target),
                that = target.is(event.target) ? this : _getPlugin(target),
                settings = that.settings,
                menu = that.menu,
                topnavitems = that.topnavitems,
                topli = target.closest('.' + settings.topNavItemClass),
                tabbables = menu.find(':tabbable'),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                panelGroups = panel.find('.' + settings.panelGroupClass),
                currentPanelGroup = target.closest('.' + settings.panelGroupClass),
                next,
                keycode = event.keyCode || event.which,
                start,
                i,
                o,
                label,
                found = false,
                newString = Keyboard.keyMap[event.keyCode] || '',
                regex,
                isTopNavItem = (topli.length === 1 && panel.length === 0);
            if (target.is('.hover:tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }
            switch (keycode) {
            case Keyboard.ESCAPE:
                _togglePanel.call(that, event, true);
                break;
            case Keyboard.DOWN:
                event.preventDefault();
                if (isTopNavItem) {
                    _togglePanel.call(that, event);
                    found = (topli.find('.' + settings.panelClass + ' :tabbable:first').focus().length === 1);
                } else {
                    found = (tabbables.filter(':gt(' + tabbables.index(target) + '):first').focus().length === 1);
                }
                
                if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.UP:
                event.preventDefault();
                if (isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel.call(that, event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length) {
                        found = (next.children()
                            .attr('aria-expanded', 'true')
                            .addClass(settings.openClass)
                            .filter('.' + settings.panelClass)
                            .attr('aria-hidden', 'false')
                            .find(':tabbable:last')
                            .focus() === 1);
                    }
                } else if (!isTopNavItem) {
                    found = (tabbables.filter(':lt(' + tabbables.index(target) + '):last').focus().length === 1);
                }
                    
                if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.RIGHT:
                event.preventDefault();
                if (isTopNavItem) {
                    found = (topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').focus().length === 1);
                } else {
                    if (panelGroups.length && currentPanelGroup.length) {
                        // if the current panel contains panel groups, and we are able to focus the first tabbable element of the next panel group
                        found = (panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').focus().length === 1);
                    }
                    
                    if (!found) {
                        found = (topli.find(':tabbable:first').focus().length === 1);
                    }
                }
                break;
            case Keyboard.LEFT:
                event.preventDefault();
                if (isTopNavItem) {
                    found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
                } else {
                    if (panelGroups.length && currentPanelGroup.length) {
                        // if the current panel contains panel groups, and we are able to focus the first tabbable element of the previous panel group
                        found = (panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').focus().length === 1);
                    }
                    
                    if (!found) {
                        found = (topli.find(':tabbable:first').focus().length === 1);
                    }
                }
                break;
            case Keyboard.TAB:
                i = tabbables.index(target);
                if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel(event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length) {
                        found = next.children()
                            .attr('aria-expanded', 'true')
                            .addClass(settings.openClass)
                            .filter('.' + settings.panelClass)
                            .attr('aria-hidden', 'false')
                            .find(':tabbable:last')
                            .focus();
                    }
                } else if (event.shiftKey && i > 0) {
                    found = (tabbables.filter(':lt(' + i + '):last').focus().length === 1);
                } else if (!event.shiftKey && i < tabbables.length - 1) {
                    found = (tabbables.filter(':gt(' + i + '):first').focus().length === 1);
                } else if (window.opera && opera.toString() === "[object Opera]") {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    if (event.shiftKey) {
                        found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):last').focus().length === 1);
                    } else {
                        found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                    }
                }
                
                if (found) {
                    event.preventDefault();
                }
                break;
            case Keyboard.SPACE:
                if (isTopNavItem) {
                    event.preventDefault();
                    _clickHandler.call(that, event);
                }
                break;
            default:
                // alphanumeric filter    
                clearTimeout(this.keydownTimeoutID);
                keydownSearchString += newString !== keydownSearchString ? newString : '';
                
                if (keydownSearchString.length === 0) {
                    return;
                }
                
                this.keydownTimeoutID = setTimeout(function () {
                    keydownSearchString = '';
                }, keydownTimeoutDuration);

                if (isTopNavItem && !target.hasClass(settings.openClass)) {
                    tabbables = tabbables.filter('.' + settings.topNavItemClass + ' > :tabbable');
                } else {
                    tabbables = topli.find(':tabbable');
                }

                if (event.shiftKey) {
                    tabbables = $(tabbables.get()
                        .reverse());
                }

                for (i = 0; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    if (o.is(target)) {
                        start = (keydownSearchString.length === 1) ? i + 1 : i;
                        break;
                    }
                }
                
                regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'i');
                    
                for (i = start; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    label = $.trim(o.text());
                    if (regex.test(label)) {
                        found = true;
                        o.focus();
                        break;
                    }
                }
                if (!found) {
                    for (i = 0; i < start; i++) {
                        o = tabbables.eq(i);
                        label = $.trim(o.text());
                        if (regex.test(label)) {
                            o.focus();
                            break;
                        }
                    }
                }
                break;
            }
            that.justFocused = false;
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseDownHandler
         * @desc Handle mousedown event on mega menu.
         * @param {event} Event object
         * @memberof accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseDownHandler = function (event) {
            this.mouseTimeoutID = setTimeout(function () {
                clearTimeout(this.focusTimeoutID);
            }, 1);
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOverHandler
         * @desc Handle mouseover event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOverHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            $(event.target)
                .addClass(this.settings.hoverClass);
            _togglePanel.call(this, event);
            if ($(event.target).is(':tabbable')) {
                $('html').on('keydown.accessible-megamenu', _keyDownHandler.bind(event.target));
            }
        };
        
        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOutHandler
         * @desc Handle mouseout event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOutHandler = function (event) {
            var that = this;
            $(event.target)
                .removeClass(that.settings.hoverClass);
            
            that.mouseTimeoutID = setTimeout(function () {
                _togglePanel.call(that, event, true);
            }, 250);
            if ($(event.target).is(':tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }
        };
        
        _toggleExpandedEventHandlers = function (hide) {
            var menu = this.menu;
            if (hide) {
                $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', _clickOutsideHandler);
                
                menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu', _DOMAttrModifiedHandler);
            } else {
                $('html').on('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', _clickOutsideHandler.bind(this));
                
                /* Narrator in Windows 8 automatically toggles the aria-expanded property on double tap or click. 
                   To respond to the change to collapse the panel, we must add a listener for a DOMAttrModified event. */
                menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-megamenu', _DOMAttrModifiedHandler.bind(this));
            }
        };
        
        /* public attributes and methods ------------------------- */
        return {
            constructor: AccessibleMegaMenu,
            
            /**
             * @lends jQuery.fn.accessibleMegaMenu
             * @desc Initializes an instance of the accessibleMegaMenu plugins
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            init: function () {
                var that = this,
                    settings = this.settings,
                    justFocused = this.justFocused = false,
                    nav = this.nav = $(this.element),
                    menu = this.menu = nav.children().first(),
                    topnavitems = this.topnavitems = menu.children();
                nav.attr("role", "navigation");
                menu.addClass(settings.menuClass);
                topnavitems.each(function (i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({
                            "aria-haspopup": true,
                            "aria-owns": topnavitempanel.attr("id"),
                            "aria-controls": topnavitempanel.attr("id"),
                            "aria-expanded": false
                        });

                        topnavitempanel.attr({
                            "role": "group",
                            "aria-expanded": false,
                            "aria-hidden": true
                        })
                            .addClass(settings.panelClass)
                            .not("[aria-labelledby]")
                            .attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });
                
                this.panels = menu.find("." + settings.panelClass);

                menu.on("focusin.accessible-megamenu", ":tabbable, :focusable, ." + settings.panelClass, _focusInHandler.bind(this))
                    .on("focusout.accessible-megamenu", ":tabbable, :focusable, ." + settings.panelClass, _focusOutHandler.bind(this))
                    .on("keydown.accessible-megamenu", _keyDownHandler.bind(this))
                    .on("mouseover.accessible-megamenu", _mouseOverHandler.bind(this))
                    .on("mouseout.accessible-megamenu", _mouseOutHandler.bind(this))
                    .on("mousedown.accessible-megamenu", _mouseDownHandler.bind(this));
                
				if (isTouch) {
					menu.on("touchstart.accessible-megamenu", _clickHandler.bind(this));
				}
                
				menu.find("hr").attr("role", "separator");
            },
            
            /**
             * @desc Get default values
             * @example $(selector).accessibleMegaMenu("getDefaults");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getDefaults: function () {
                return this._defaults;
            },
            
            /**
             * @desc Get any option set to plugin using its name (as string)
             * @example $(selector).accessibleMegaMenu("getOption", some_option);
             * @param {string} opt
             * @return {string}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getOption: function (opt) {
                return this.settings[opt];
            },
            
            /**
             * @desc Get all options
             * @example $(selector).accessibleMegaMenu("getAllOptions");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getAllOptions: function () {
                return this.settings;
            },
            
            /**
             * @desc Set option
             * @example $(selector).accessibleMegaMenu("setOption", "option_name",  "option_value",  reinitialize);
             * @param {string} opt - Option name
             * @param {string} val - Option value
             * @param {boolean} [reinitialize] - boolean to re-initialize the menu.
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            setOption: function (opt, value, reinitialize) {
                this.settings[opt] = value;
                if (reinitialize) {
                    this.init();
                }
            }
        };
    }());
        
    /* lightweight plugin wrapper around the constructor, 
       to prevent against multiple instantiations */
       
    /**
     * @class accessibleMegaMenu
     * @memberOf jQuery.fn
     * @classdesc Implements an accessible mega menu as a jQuery plugin. 
     * <p>The mega-menu It is modeled after the mega menu on {@link http://adobe.com|adobe.com} but has been simplified for use by others. A brief description of the interaction design choices can be found in a blog post at {@link http://blogs.adobe.com/accessibility/2013/05/adobe-com.html|Mega menu accessibility on adobe.com}.</p>
     * <h3>Keyboard Accessibility</h3>
     * <p>The accessible mega menu supports keyboard interaction modeled after the behavior described in the {@link http://www.w3.org/TR/wai-aria-practices/#menu|WAI-ARIA Menu or Menu bar (widget) design pattern}, however we also try to respect users' general expectations for the behavior of links in a global navigation. To this end, the accessible mega menu implementation permits tab focus on each of the six top-level menu items. When one of the menu items has focus, pressing the Enter key, Spacebar or Down arrow will open the submenu panel, and pressing the Left or Right arrow key will shift focus to the adjacent menu item. Links within the submenu panels are included in the tab order when the panel is open. They can also be navigated with the arrow keys or by typing the first character in the link name, which speeds up keyboard navigation considerably. Pressing the Escape key closes the submenu and restores focus to the parent menu item.</p>
     * <h3>Screen Reader Accessibility</h3>
     * <p>The accessible mega menu models its use of WAI-ARIA Roles, States, and Properties after those described in the {@link http://www.w3.org/TR/wai-aria-practices/#menu|WAI-ARIA Menu or Menu bar (widget) design pattern} with some notable exceptions, so that it behaves better with screen reader user expectations for global navigation. We don't use <code class="prettyprint prettyprinted" style=""><span class="pln">role</span><span class="pun">=</span><span class="str">"menu"</span></code> for the menu container and <code class="prettyprint prettyprinted" style=""><span class="pln">role</span><span class="pun">=</span><span class="str">"menuitem"</span></code> for each of the links therein, because if we do, assistive technology will no longer interpret the links as links, but instead, as menu items, and the links in our global navigation will no longer show up when a screen reader user executes a shortcut command to bring up a list of links in the page.</p>
     * @example <h4>HTML</h4><hr/>
&lt;nav&gt;
    &lt;ul class=&quot;nav-menu&quot;&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a href=&quot;?movie&quot;&gt;Movies&lt;/a&gt;
            &lt;div class=&quot;sub-nav&quot;&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=0&quot;&gt;Action &amp;amp; Adventure&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=2&quot;&gt;Children &amp;amp; Family&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=7&quot;&gt;Dramas&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=9&quot;&gt;Foreign&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=14&quot;&gt;Musicals&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=15&quot;&gt;Romance&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/li&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a href=&quot;?tv&quot;&gt;TV Shows&lt;/a&gt;
            &lt;div class=&quot;sub-nav&quot;&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=20&quot;&gt;Classic TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=21&quot;&gt;Crime TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=27&quot;&gt;Reality TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=30&quot;&gt;TV Action&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=33&quot;&gt;TV Dramas&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=34&quot;&gt;TV Horror&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
     * @example <h4>CSS</h4><hr/>
&#47;* Rudimentary mega menu CSS for demonstration *&#47;    

&#47;* mega menu list *&#47;
.nav-menu {
    display: block;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 15;
}

&#47;* a top level navigation item in the mega menu *&#47;
.nav-item {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
}

&#47;* first descendant link within a top level navigation item *&#47;
.nav-item &gt; a {
    position: relative;
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0 0 -1px 0;
    border: 1px solid transparent;
}

&#47;* focus/open states of first descendant link within a top level 
   navigation item *&#47;
.nav-item &gt; a:focus,
.nav-item &gt; a.open {
    border: 1px solid #dedede;
}

&#47;* open state of first descendant link within a top level 
   navigation item *&#47;
.nav-item &gt; a.open {
    background-color: #fff;
    border-bottom: none;
    z-index: 1;
}

&#47;* sub-navigation panel *&#47;
.sub-nav {
    position: absolute;
    display: none;
    top: 2.2em;
    margin-top: -1px;
    padding: 0.5em 1em;
    border: 1px solid #dedede;
    background-color: #fff;
}

&#47;* sub-navigation panel open state *&#47;
.sub-nav.open {
    display: block;
}

&#47;* list of items within sub-navigation panel *&#47;
.sub-nav ul {
    display: inline-block;
    vertical-align: top;
    margin: 0 1em 0 0;
    padding: 0;
}

&#47;* list item within sub-navigation panel *&#47;
.sub-nav li {
    display: block;
    list-style-type: none;
    margin: 0;
    padding: 0;
}     
     * @example <h4>JavaScript</h4><hr/>
&lt;!-- include jquery --&gt;
&lt;script src=&quot;http://code.jquery.com/jquery-1.10.1.min.js&quot;&gt;&lt;/script&gt;

&lt;!-- include the jquery-accessibleMegaMenu plugin script --&gt;
&lt;script src=&quot;js/jquery-accessibleMegaMenu.js&quot;&gt;&lt;/script&gt;

&lt;!-- initialize a selector as an accessibleMegaMenu --&gt;
&lt;script&gt;
    $(&quot;nav:first&quot;).accessibleMegaMenu({
        &#47;* prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby *&#47;
        uuidPrefix: &quot;accessible-megamenu&quot;,
        
        &#47;* css class used to define the megamenu styling *&#47;
        menuClass: &quot;nav-menu&quot;,
        
        &#47;* css class for a top-level navigation item in the megamenu *&#47;
        topNavItemClass: &quot;nav-item&quot;,
        
        &#47;* css class for a megamenu panel *&#47;
        panelClass: &quot;sub-nav&quot;,
        
        &#47;* css class for a group of items within a megamenu panel *&#47;
        panelGroupClass: &quot;sub-nav-group&quot;,
        
        &#47;* css class for the hover state *&#47;
        hoverClass: &quot;hover&quot;,
        
        &#47;* css class for the focus state *&#47;
        focusClass: &quot;focus&quot;,
        
        &#47;* css class for the open state *&#47;
        openClass: &quot;open&quot;
    });
&lt;/script&gt;
     * @param {object} [options] Mega Menu options
     * @param {string} [options.uuidPrefix=accessible-megamenu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
     * @param {string} [options.menuClass=accessible-megamenu] - CSS class used to define the megamenu styling
     * @param {string} [options.topNavItemClass=accessible-megamenu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
     * @param {string} [options.panelClass=accessible-megamenu-panel] - CSS class for a megamenu panel
     * @param {string} [options.panelGroupClass=accessible-megamenu-panel-group] - CSS class for a group of items within a megamenu panel
     * @param {string} [options.hoverClass=hover] - CSS class for the hover state
     * @param {string} [options.focusClass=focus] - CSS class for the focus state
     * @param {string} [options.openClass=open] - CSS class for the open state
     */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new AccessibleMegaMenu(this, options));
            }
        });
    };
        
    /* :focusable and :tabbable selectors from 
       https://raw.github.com/jquery/jquery-ui/master/ui/jquery.ui.core.js */
        
    /**
     * @private
     */
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }
        
    /**
     * @private
     */
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
                "a" === nodeName ?
                        element.href || isTabIndexNotNaN :
                        isTabIndexNotNaN) &&
                            // the element and all of its ancestors must be visible
                            visible(element);
    }
        
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : // support: jQuery <1.8
                function (elem, i, match) {
                    return !!$.data(elem, match[3]);
                },
    
        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
    
        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
}(jQuery, window, document));
jQuery(document).ready(function($){

	// MAIN NAVIGATION SETTINGS
	$("#dawgdrops").accessibleMegaMenu({
		/* prefix for generated unique id attributes, which are required
			to indicate aria-owns, aria-controls and aria-labelledby */
		uuidPrefix: "accessible-megamenu",

		/* css class used to define the megamenu styling */
		menuClass: "nav-menu",

		/* css class for a top-level navigation item in the megamenu */
		topNavItemClass: "nav-item",

		/* css class for a megamenu panel */
		panelClass: "sub-nav",

		/* css class for a group of items within a megamenu panel */
		panelGroupClass: "sub-nav-group",

		/* css class for the hover state */
		hoverClass: "hover",

		/* css class for the focus state */
		focusClass: "focus",

		/* css class for the open state */
		openClass: "open"
	});

	// POPUP WINDOW FOR SOCIAL MEDIA
	function windowPopup(url, width, height) {
	  // Calculate the position of the popup so it's centered on the screen.
	  var left = (screen.width / 2) - (width / 2),
		  top = (screen.height / 2) - (height / 2);
	  window.open(
		url,
		"",
		"menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
	  );
	}
	$(".js-social-share").on("click", function(e) {
	  e.preventDefault();
	  windowPopup($(this).attr("href"), 500, 300);
	});


	// scroll to top of page
	// $('.scrollup').click(function () {
	// 	$("html, body").animate({
	// 		scrollTop: 0
	// 	}, 600);
	// 	return false;
	// });


	// homepage carousel
	$(".home-hero1").owlCarousel({
		responsive:{
			0:{
				items:1,
				loop:true,
				center:true,
				dots: true,
				nav: false,
				autoplay:true,
				dotsSpeed: 1200,
				autoplaySpeed: 1200
			},
			768:{
				items:1,
				loop:true,
				center:true,
				dots: false,
				nav: true,
				stagePadding: 100,
				autoplay:true,
				navSpeed: 1200,
				autoplaySpeed: 1200,
				autoplayTimeout: 6000
			},
			1140:{
				items:1,
				loop:true,
				center:true,
				dots: false,
				nav: true,
				stagePadding: 200,
				autoplay:true,
				navSpeed: 1200,
				autoplaySpeed: 1200,
				autoplayTimeout: 6000
			}
		}
	});


	$(".home-featured").owlCarousel({
		loop:false,
		margin:10,
		lazyLoad:true,
		responsive:{
			0:{
				items:2,
				loop:true,
				center:true,
				dots: false
			},
			480:{
				items:3,
				loop:true,
				center:true,
				dots: false,
				stagePadding: 70
			},
			768:{
				items:4,
				loop:false,
				center:false,
				dots: true,
				stagePadding: 70
			},
			980:{
				items:4,
				loop:false,
				center:false,
				dots: false,
				nav:true,
				stagePadding: 120,
				slideBy: 4
			}
		}
	});

	$(".catalog-featured").owlCarousel({
		loop:false,
		margin:10,
		responsive:{
			0:{
				items:2,
				loop:true,
				center:true,
				dots: false
			},
			480:{
				items:3,
				loop:true,
				center:true,
				dots: false,
				stagePadding: 70
			},
			768:{
				items:4,
				//stagePadding: 70,
				loop:true,
				center:true,
				dots: false
			},
			980:{
				items:5,
				dots: false
			}
		}
	});

	$('.suggested-gallery').owlCarousel({
		loop:false,
		margin:10,
		responsive:{
			0:{
				items:2,
				loop:false,
				center:false,
				dots: true
			},
			480:{
				items:3,
				loop:false,
				center:false,
				dots: true
			},
			768:{
				items:4,
				dots: false,
				loop:false
			}
		}
	});

	// Featured items on Browse pages
	$('.product-list .browse-featured').owlCarousel({
		items:1
	});

	// Featured items on Catalog pages
	$('.catalog-list .browse-featured').owlCarousel({
		loop:false,
		margin:10,
		responsive:{
			0:{
				items:2,
				loop:true,
				center:true,
				dots: false
			},
			480:{
				items:3,
				loop:true,
				center:true,
				dots: false,
				stagePadding: 70
			},
			768:{
				items:4,
				//stagePadding: 70,
				loop:true,
				center:true,
				dots: false
			},
			980:{
				items:5,
				dots: false
			}
		}
	});

	// sub-catalog slider
	$(".owl-sub-catalogs").owlCarousel({
		margin:10,
		dots:false,
		responsive:{
			0:{
				items:3
			},
			480:{
				items:4
			},
			768:{
				items:5
			},
			980:{
				items:6
			}
		}
	});

	// Header dropdown menus
	$('.dropdown-toggle').dropdown()

	// Footer tabs
	$('body').addClass('js');
	  var $tab = $('.tab');

		$tab.on("click", function(e){
	  e.preventDefault();
	  var $this = $(this);
	  $this.toggleClass('active');
	  $this.next('.panel').toggleClass('active');
	});

	// Lazy Load
	$("img.lazy").lazyload({
		threshold : 200,
		effect : "fadeIn"
	});
	$("html,body").trigger("scroll");

	// Sticky header
	// var sticky = new Waypoint.Sticky({
	// 	element: $('#header')[0]
	// })


});
