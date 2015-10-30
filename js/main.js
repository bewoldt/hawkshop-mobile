jQuery(document).ready(function($){

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
	var sticky = new Waypoint.Sticky({
		element: $('#header')[0]
	})


});
