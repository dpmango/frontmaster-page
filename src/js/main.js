$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    legacySupport();
    initHeaderScroll();

    initPopups();
    initSliders();
    initScrollMonitor();
    initMasks();
  }

  // this is a master function which should have all functionality
  pageReady();

  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }

  // Examples work compare(before/after)
  $('.slide__compare').twentytwenty({
    no_overlay: true
  })


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', '.header__menu a', function() {
      closeMobileMenu();
      var el = $(this).attr('href');
      $(this).parent().siblings().find('a').removeClass('active-link');
      $(this).addClass('active-link');
      $('body, html').animate({
          scrollTop: $(el).offset().top}, 1000);
      return false;
    });


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  function initHeaderScroll(){
    _window.on('scroll', throttle(function(e) {
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');

      if ( vScroll > 20 ){
        header.addClass('is-fixed');
      } else {
        header.removeClass('is-fixed');
      }

    }, 10));
  }

  // UPDATE HEADER MENU ANCHORS
  // Cache selectors
  var topMenu = $(".header__menu"),
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if ( item.length ) { return item; }
  });

  // Bind to scroll
  _window.on('scroll', throttle(function(){
    // Get container scroll position
    var topMenuHeight = topMenu.outerHeight()
    var fromTop = $(this).scrollTop() + 1;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems.removeClass("active-link").filter("[href='#"+id+"']").addClass("active-link");
  }, 20));

  // HAMBURGER TOGGLER
  _document.on('click', '[js-hamburger]', function(){
    $(this).toggleClass('is-active');
    $('.header').toggleClass('is-blue');
    $('.mobile-navi').toggleClass('is-active');
  });

  function closeMobileMenu(){
    $('[js-hamburger]').removeClass('is-active');
    $('.header').removeClass('is-blue');
    $('.mobile-navi').removeClass('is-active');
  }

  //////////
  // SLIDERS
  //////////

  function initSliders(){
    var slickNextArrow = '<button type="button" class="slick-next"><i class="icon icon-arrow-right"></i></button>';
    var slickPrevArrow = '<button type="button" class="slick-prev"><i class="icon icon-arrow-left"></i></button>'

    // other individual sliders goes here

    // Materials carousel
    var swiperMaterials = new Swiper ('.materials__carousel', {
      wrapperClass: "swiper-wrapper",
      slideClass: "materials__item",
      direction: 'horizontal',
      slidesPerView: 5,
      spaceBetween: 0,
      watchOverflow: true,
      freeMode: false,
      // Responsive breakpoints
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // works as max-width prop
        375: {
          slidesPerView: 1
        },
        850: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 3
        },
        1100: {
          slidesPerView: 4
        }
      }
    })

    var iconBreakpoints = {
      375: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      568: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
    // Why carousel
    var swiperWhy = new Swiper ('.why__carousel', {
      wrapperClass: "swiper-wrapper",
      slideClass: "why__item",
      direction: 'horizontal',
      loop: false,
      watchOverflow: true,
      // setWrapperSize: true,
      spaceBetween: 0,
      slidesPerView: 5,
      normalizeSlideIndex: true,
      // centeredSlides: true,
      freeMode: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Responsive breakpoints
      breakpoints: iconBreakpoints
    })

    // Steps of work carousel
    var swiperSteps = new Swiper ('.steps__carousel', {
      wrapperClass: "swiper-wrapper",
      slideClass: "why__item",
      direction: 'horizontal',
      // loop: true,
      watchOverflow: true,
      // setWrapperSize: true,
      slidesPerView: 5,
      spaceBetween: 0,
      // normalizeSlideIndex: true,
      // centeredSlides: true,
      freeMode: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Responsive breakpoints
      breakpoints: iconBreakpoints
    })

    // Credit carousel
    var creditSwiperOptions = {
      wrapperClass: "swiper-wrapper",
      slideClass: "why__item",
      direction: 'horizontal',
      watchOverflow: true,
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Responsive breakpoints
      breakpoints: {
        375: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        568: {
          slidesPerView: 3,
          spaceBetween: 20
        },
      }
    }

    var swiperCredit

    function checkSwiperCredit(){
      console.log(swiperCredit)
      if ( _window.width() > 768 ) {
        if ( swiperCredit !== undefined ) {
          swiperCredit.destroy( true, true );
        }
        return
      }
      else if ( swiperCredit === undefined ) {
        return swiperCredit = new Swiper ('.credit__carousel', creditSwiperOptions)
      }
    }

    _window.on('resize', debounce(checkSwiperCredit, 300));
    checkSwiperCredit();

    // work example carousel
    $('.works__example').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      draggable: false,
      prevArrow: slickNextArrow,
      nextArrow: slickPrevArrow,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            draggable: true,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 568,
          settings: {
            arrows: true,
            slidesToShow: 1
          }
        }
      ]
    })

    // Review carousel
    $('.reviews__carousel').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: slickNextArrow,
      nextArrow: slickPrevArrow,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 568,
          settings: {
            arrows: true,
            slidesToShow: 1
          }
        }
      ]
    })


  }

  // Accordion for materials om mobile
  $('.materials__accordion .materials__item').on('click' , toggleAccordion);

  function toggleAccordion() {
    $('.materials__accordion .materials__item').not($(this)).removeClass('is-show');
    $(this).addClass('is-show');
  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var mfpCloseBtn = '<button class="mfp-close"><svg class="ico ico-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#ico-close"></use></svg></button>'

    // video play
    $('.review__play').magnificPopup({
      // disableOn: 700,
      type: 'iframe',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-fade',
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=', // String that splits URL in a two parts, second part should be %id%
          src: '//www.youtube.com/embed/%id%?autoplay=1&controls=0&showinfo=0' // URL that will be set as a source for iframe.
        }
      },
      closeMarkup: mfpCloseBtn
    });


    // Popup callback
    $('.contact-callback , .personal__data , .detail').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      mainClass: 'popup-fade',
      removalDelay: 300,
      closeMarkup: mfpCloseBtn
    });
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  ////////////
  // UI
  ////////////

  // Select
  $('select').selectric();

  // textarea autoExpand
  _document
    .one('focus.autoExpand', '.ui-group textarea', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', '.ui-group textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });

  // Masked input
  function initMasks(){
    $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }


  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 150, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });

  }

  // Google Maps API
  function initMap() {
    var coordinates = {lat: 55.807846, lng: 37.512125},

        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 16,
            disableDefaultUI: false,
            scrollwheel: false
        }),

        image = 'img/map-marker.png',
        marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: image
        });
  }

  initMap();

});
