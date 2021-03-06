$(document).ready(function () {

	$('a[data-slide]').click(function (e) {
		e.preventDefault();
		var slideno = $(this).data('slide');
		$('.slider-nav').slick('slickGoTo', slideno - 1);
	});

	// Resize adjustment
	$(window).resize(function () {
		headerAdjustment();
		footerAdjustment();
		cardHeaderAdjustment()
	});
	headerAdjustment();
	footerAdjustment();
	cardHeaderAdjustment()

});

// Header Adjustment
function headerAdjustment() {
	var headerHeight = $(".theme-header").outerHeight(),
		finalHeight = headerHeight;
	$(".theme-main").css("padding-top", "" + finalHeight + "px");
}

// Sticky Footer
function footerAdjustment() {
	var height = $(".theme-footer").outerHeight();
	$(".push").css("height", height);
	$(".theme-main").css("margin-bottom", "-" + height + "px");
}

// Header Adjustment
function cardHeaderAdjustment() {
	var headerHeight = $(".card-package__desc").outerHeight(),
		finalHeight = headerHeight;
	$(".card-package__img").css("height", "" + finalHeight + "px");
}

// Auto Hide Navbar
jQuery(document).ready(function ($) {
	var mainHeader = $('.theme-header'),
		secondaryNavigation = $('.theme-header__navbar'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();

	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function (event) {
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function () {
		if (!scrolling) {
			scrolling = true;
			(!window.requestAnimationFrame) ?
			setTimeout(autoHideHeader, 150): requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function () {
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		(belowNavHeroContent.length > 0) ?
		checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

		previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
		if (previousTop - currentTop > scrollDelta) {
			//if scrolling up...
			mainHeader.removeClass('is-hidden');
		} else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			//if scrolling down...
			mainHeader.addClass('is-hidden');
		}
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

		if (previousTop >= currentTop) {
			//if scrolling up... 
			if (currentTop < secondaryNavOffsetTop) {
				//secondary nav is not fixed
				mainHeader.removeClass('is-hidden');
				secondaryNavigation.removeClass('fixed slide-up');
				belowNavHeroContent.removeClass('secondary-nav-fixed');
			} else if (previousTop - currentTop > scrollDelta) {
				//secondary nav is fixed
				mainHeader.removeClass('is-hidden');
				secondaryNavigation.removeClass('slide-up').addClass('fixed');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			}

		} else {
			//if scrolling down...	
			if (currentTop > secondaryNavOffsetTop + scrollOffset) {
				//hide primary nav
				mainHeader.addClass('is-hidden');
				secondaryNavigation.addClass('fixed slide-up');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			} else if (currentTop > secondaryNavOffsetTop) {
				//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
				mainHeader.removeClass('is-hidden');
				secondaryNavigation.addClass('fixed').removeClass('slide-up');
				belowNavHeroContent.addClass('secondary-nav-fixed');
			}

		}
	}
});


// Carousel
var Layout = (function () {
	// handle carousel
	var handleCarousel = function () {
		var $item = $(".theme-carousel .carousel-inner .item, .graphical-links a, .card-package__img");
		$item.eq(0).addClass("active");
		$item.addClass("full-screen");

		$(".theme-carousel img, .graphical-links a img, .card-package__img img").each(function () {
			var $src = $(this).attr("src");
			var $color = $(this).attr("data-color");
			$(this)
				.parent()
				.css({
					"background-image": "url(" + $src + ")",
					"background-color": $color
				});
			$(this).remove();
		});
	};

	var handleCard = function () {
		var $item = $(".card__img");
		$item.addClass("full-screen");
		$(".card__img img, .graphical-links a img, .card-package__img img").each(function () {
			var $src = $(this).attr("src");
			var $color = $(this).attr("data-color");

			$(this)
				.parent()
				.css({
					"background-image": "url(" + $src + ")",
					"background-color": $color
				});
			$(this).remove();
		});
	};

	var carouselAdjustment = function () {
		var height = $(window).height() - $(".theme-header").outerHeight(); //getting windows height
		$('.theme-carousel__carousel-inner>.item').css('min-height', (height + 1) + 'px'); //and setting height of carousel
	};

	var attachResizeEvent = function () {
		$(window).on("resize", function () {
			carouselAdjustment();
		});
	};

	return {
		init: function () {
			handleCarousel(); // initial setup for carousel
			handleCard(); // initial setup for card
			carouselAdjustment();
			attachResizeEvent();
		}
	};
})();

$(document).ready(function () {
	Layout.init();
});
