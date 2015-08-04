$( document ).ready(function() {

	$('.suggested-gallery').flickity({
	  cellAlign: 'left',
	  contain: true,
	  imagesLoaded: true,
	  pageDots: true,
	  prevNextButtons: false,
	  wrapAround: true,
	  freeScroll: true
	  // initialIndex: 2
	});

	$('.browse-featured').flickity({
		imagesLoaded: true,
		contain: true
	});
	$('.product-items').flickity({
		imagesLoaded: true
	});


	// Shifter
	$.shifter({
		maxWidth: "768px"
	});

	// $(".mainnav-wrapper").navigation({
	// 	maxWidth: "940px",
	// 	gravity: "left",
	// 	type: "push"
	// });


	$('body').addClass('js');
  	  var $tab = $('.tab');

		$tab.on("click", function(e){
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active');
      $this.next('.panel').toggleClass('active');
    });

	$("img.lazy").lazyload({
		threshold : 100,
		effect : "fadeIn"
	});
	$("html,body").trigger("scroll");

	var sticky = new Waypoint.Sticky({
		element: $('.basic-sticky-example')[0]
	})

});
