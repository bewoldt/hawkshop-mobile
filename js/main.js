jQuery(document).ready(function($){

	// homepage carousel
	$(".home-hero1").owlCarousel({
		items:1
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
                loop:true,
                center:true,
                dots: false,
                stagePadding: 20
            },
            980:{
                items:4,
                loop:true,
                center:true,
                dots: false,
                stagePadding: 20,
                nav:true
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
                loop:true,
                center:true,
                dots: false
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

	$('.product-items').owlCarousel({
		items:1
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


	$('body').addClass('js');
  	  var $tab = $('.tab');

		$tab.on("click", function(e){
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active');
      $this.next('.panel').toggleClass('active');
    });

	$("img.lazy").lazyload({
		threshold : 200,
		effect : "fadeIn"
	});
	$("html,body").trigger("scroll");

	// var sticky = new Waypoint.Sticky({
	// 	element: $('.basic-sticky-example')[0]
	// })

    // $('.mobile-searchtoggle').click(function() {
    //     $(this).toggleClass('active');
    //     $('.top-wrapper').slideToggle();
    //     $('#search').focus();
    //     return false;
    // });

    $('.mobile-searchtoggle').click(function(e){
        $(this).toggleClass('active');
        $('.top-wrapper').toggleClass('search-open');
        $('.top-wrapper').slideToggle();
        if ($('.top-wrapper').hasClass('search-open')) {
            $('#search').focus();
        } else {
            $('#search').blur();
        }
        return false;
    });

});
