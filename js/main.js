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
                loop:true,
                center:true,
                dots: false,
                stagePadding: 70
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
        items:1,
        loop:true
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
		items:1,
        loop:true
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




    // Navigation
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
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });

    var MqL = 768;
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function(){
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });
    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window,
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation(){
        // var navigation = $('.cd-navigation');
        var desktop = checkWindowWidth();
        var $lateral_menu_trigger = $('#cd-menu-trigger');
        var $content_wrapper = $('.cd-main-content');
        var $navigation = $('header');
        if ( desktop ) {
            $navigation.removeClass('lateral-menu-is-open');
            $content_wrapper.removeClass('lateral-menu-is-open');
            $lateral_menu_trigger.removeClass('is-clicked');
            $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
        } else {

        }
    }

});
