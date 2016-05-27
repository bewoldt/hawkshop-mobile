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


	$('.home-gallery').flickity({
		lazyLoad: true,
		wrapAround: true,
		imagesLoaded: true,
		selectedAttraction: 0.01,
		friction: 0.15,
		autoPlay: true,
		autoPlay: 6000
	});

	$('.home-featured').flickity({
		imagesLoaded: true,
		cellAlign: 'left',
		freeScroll: true,
		contain: true,
		lazyLoad: 5,
		// disable previous & next buttons and dots
		prevNextButtons: true,
		pageDots: false
	});


	$('.catalog-featured').flickity({
		imagesLoaded: true,
		cellAlign: 'left',
		freeScroll: true,
		contain: true,
		// disable previous & next buttons and dots
		prevNextButtons: false,
		pageDots: false
	});

	$('.suggested-gallery').flickity({
		imagesLoaded: true,
		cellAlign: 'left',
		freeScroll: true,
		contain: true,
		// disable previous & next buttons and dots
		prevNextButtons: false,
		pageDots: false
	});

	//photoThumb
	// $('#photoThumb').flickity({
	// 	imagesLoaded: true,
	// 	contain: true,
	// 	// disable previous & next buttons and dots
	// 	prevNextButtons: true,
	// 	pageDots: true
	// });

	// var $gallery = $('#photoThumb').flickity({
	// 	cellSelector: 'img',
	// 	imagesLoaded: true,
	// 	percentPosition: false
	// });
	// var $caption = $('.caption');
	// // Flickity instance
	// var flkty = $gallery.data('flickity');

	// $gallery.on( 'cellSelect', function() {
	// 	// set image caption using img's alt
	// 	$caption.text( flkty.selectedElement.alt )
	// });






	// Header dropdown menus
	$('.dropdown-toggle').dropdown()


	// Footer tabs
	var $tab = $('.tab');
	$tab.on("click", function(e){
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass('active');
		$this.next('.panel').toggleClass('active');
	});


	// Lazy load images
	jQuery("img.lazy").lazyload({
		threshold : 300,
		effect : "fadeIn"
	});
	// make sure lazy loader runs and loads initial
	// images in the view without initiating a scroll.
	setTimeout(function() { jQuery(window).resize(); }, 1000);


	//Sticky header
	// var sticky = new Waypoint.Sticky({
	// 	element: $('#dawgdrops')[0]
	// });


});
