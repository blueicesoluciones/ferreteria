(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // Catálogo: isotope solo en shop (no forzar display:block en .row: rompe el grid Bootstrap)
        var $productLists = $(".product-lists");
        var hasIsotope = false;
        var $catalogSearch = $("#catalog-search");
        var $catalogSearchEmpty = $("#catalog-search-empty");

        var normalizeSearchText = function (value) {
            if (!value) {
                return "";
            }
            var normalizedValue = value.toLowerCase();
            if (typeof normalizedValue.normalize === "function") {
                normalizedValue = normalizedValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }
            return normalizedValue.trim();
        };

        var applyCatalogSearch = function () {
            if (!$productLists.length || !$catalogSearch.length) {
                return;
            }

            var query = normalizeSearchText($catalogSearch.val());
            var visibleCount = 0;

            if (hasIsotope) {
                $productLists.isotope({
                    filter: function () {
                        var $item = $(this);
                        var searchableText = normalizeSearchText(
                            $item.find("h3").text() + " " + $item.find(".product-price").text()
                        );
                        var isMatch = !query || searchableText.indexOf(query) !== -1;
                        if (isMatch) {
                            visibleCount += 1;
                        }
                        return isMatch;
                    }
                });
            } else {
                $productLists.children("div").each(function () {
                    var $item = $(this);
                    var searchableText = normalizeSearchText(
                        $item.find("h3").text() + " " + $item.find(".product-price").text()
                    );
                    var isMatch = !query || searchableText.indexOf(query) !== -1;
                    $item.toggle(isMatch);
                    if (isMatch) {
                        visibleCount += 1;
                    }
                });
            }

            $catalogSearchEmpty.toggle(visibleCount === 0);
        };

        if ($productLists.length && $.fn.isotope) {
            try {
                $productLists.isotope({
                    itemSelector: "> div",
                    layoutMode: "fitRows",
                    percentPosition: true
                });
                hasIsotope = true;
            } catch (e) {
                if (window.console && console.warn) {
                    console.warn("Isotope:", e);
                }
            }
        }

        if ($catalogSearch.length) {
            $catalogSearch.on("input", applyCatalogSearch);
            applyCatalogSearch();
        }

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // sticky: z-index por CSS en móvil (.mean-bar); en PC se mantiene el comportamiento por defecto del plugin
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
        if (jQuery(".product-lists").length && jQuery.fn.isotope) {
            jQuery(".product-lists").isotope("layout");
        }
    });


}(jQuery));