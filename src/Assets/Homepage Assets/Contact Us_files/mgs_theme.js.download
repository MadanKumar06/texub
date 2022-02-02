require([
    'jquery'
], function ($) {
    var $_miniCart = $("header.page-header .minicart-wrapper .block-minicart");
    var $_loginForm = $("header.page-header .header-top-links .login-form");
    var $_settingSite = $("header.page-header .setting-site .setting-site-content");
    var $_wishlistHeader = $("header.page-header .top-wishlist .block-wishlist");

    $(document).ready(function(){
        /* Header */

        /* Header Top Links */
        $(document).on("click",".header-top-links > .actions",function(e){
            e.preventDefault();
            if($('.header-area').hasClass('myaccount-slide')){
                disableBodyScroll();
            }
            $('.header-top-links').toggleClass('active');
            if($('.header-top-links').hasClass('active') && $('.header-top-links .captcha-reload').length){
                $('.header-top-links').find('.captcha-reload').click();
            }
        });

        $(document).on("click","#close-myaccount",function(e){
            $(this).parents('.header-top-links').removeClass('active');
            if($('header-area').hasClass('myaccount-slide')){
                activeBodyScroll(false);
            }
        });

        $(document).on("click","#close-myaccount",function(e){
            $(this).parents('.header-top-links').removeClass('active');
            if($('header-area').hasClass('myaccount-slide')){
                activeBodyScroll(false);
            }
        });
        /* ++++++++++++ */

        /* Mini Cart */
        $(document).on("click",".minicart-wrapper .details-qty .minus",function(e){
            var $itemQty = parseInt($(this).parent().find('.cart-item-qty').attr('data-item-qty'));
            var $val = parseInt($(this).parent().find('.cart-item-qty').val());
            var $valChange = $val - 1;
            if($val > 1){
                $(this).parent().find('.cart-item-qty').val($valChange);
                if($itemQty != $valChange){
                    $(this).parents('.details-qty').find('.update-cart-item').show('fade', 300);
                }else {
                    $(this).parents('.details-qty').find('.update-cart-item').hide('fade', 300);
                }
            }
        });

        $(document).on("click",".minicart-wrapper .details-qty .plus",function(e){
            var $val = parseInt($(this).parent().find('.cart-item-qty').val());
            var $itemQty = parseInt($(this).parent().find('.cart-item-qty').attr('data-item-qty'));
            var $valChange = $val + 1;
            $(this).parent().find('.cart-item-qty').val($valChange);
            if($itemQty != $valChange){
                $(this).parents('.details-qty').find('.update-cart-item').show('fade', 300);
            }else {
                $(this).parents('.details-qty').find('.update-cart-item').hide('fade', 300);
            }
        });
        /* ++++++++++++ */

        /* Header Setting */
        $(document).on("click",".setting-site .actions .action.setting",function(e){
            disableBodyScroll();
            $(this).parents('.setting-site').addClass('active');
        });

        $(document).on("click","#close-setting-site",function(e){
            $('header.page-header .setting-site').removeClass('active');
            activeBodyScroll(false);
        });
        /* ++++++++++++ */

        /* Header Sticky Menu */
        if($('.active-sticky:not(.header7)').length){
            var headerHeight = $('.active-sticky:not(.header7)').height();
            $(window).scroll(function(){
                var st = $(this).scrollTop();
                if(st > headerHeight){
                    $('.active-sticky').addClass('scrolling');
                }else {
                    $('.active-sticky').removeClass('scrolling');
                }
            });
        }
        /* Footer */
        $(".footer-title").click(function(){
            if($(window).width() < 767){
                $(this).parent().toggleClass('active');
                $(this).parent().find('ul').slideToggle();
            }
        });
        /* Menu Mobile */
        $(document).on("click",".megamenu_action_mb",function(e){
            if($('header.page-header').hasClass('active-menu')){
                $('header.page-header').removeClass('active-menu');
                activeBodyScroll(true);
            }else {
                $('header.page-header').addClass('active-menu');
                disableBodyScroll();
            }

        });
        $('.nav-main-menu .static-menu li > .toggle-menu a').click(function(){
            $(this).toggleClass('active');
            $(this).parent().parent().find('> ul').slideToggle();
        });

        $(document).on("click",".close-nav-button",function(e){
            $('header.page-header').removeClass('active-menu');
            activeBodyScroll(true);
        });
        /* Responsive Header*/
        $('header.page-header button.action.nav-tg').click(function(){
            if ($('html').hasClass('nav-open')) {
                $('html').removeClass('nav-open');
                setTimeout(function () {
                    $('html').removeClass('nav-before-open');
                }, 300);
            } else {
                $('html').addClass('nav-before-open');
                setTimeout(function () {
                    $('html').addClass('nav-open');
                }, 42);
            }
        });

        $('.close-nav-button').click(function(){
            $('html').removeClass('nav-open');
            setTimeout(function () {
                $('html').removeClass('nav-before-open');
            }, 300);
        });

        // Active minicart
        $(document).on("click","#cart-top-action",function(e){
            $('.table-icon-menu .minicart-wrapper .action.showcart').click();
        });

        //Active Mobile tabs
        $(document).on("click","#js_mobile_tabs .action-mb-tabs",function(e){
            if ($('html').hasClass('nav-open')) {
                $('html').removeClass('nav-open');
                setTimeout(function () {
                    $('html').removeClass('nav-before-open');
                }, 300);
            } else {
                $('html').addClass('nav-before-open');
                setTimeout(function () {
                    $('html').addClass('nav-open');
                }, 42);
                var $el_action = $(this).attr('id');
                switch ($el_action) {
                    case "my-account-action":
                        $(".megamenu-content .nav-tabs li a").each(function() {
                            $(this).parent('li').removeClass("active");
                            $(".megamenu-content .tab-content .tab-pane").removeClass("active");
                            $('[href="#main-Accountcontent"]').parent().addClass('active');
                            $(".megamenu-content .tab-content #main-Accountcontent").addClass('active');
                        });
                        break;
                    case "setting-web-action":
                        $(".megamenu-content .nav-tabs li a ").each(function() {
                            $(this).parent('li').removeClass("active");
                            $(".megamenu-content .tab-content .tab-pane").removeClass("active");
                            $('[href="#main-Settingcontent"]').parent().addClass('active');
                            $(".megamenu-content .tab-content #main-Settingcontent").addClass('active');
                        });
                        break;

                }
            }
        });

        //Menu content mobile
        $('.menu-content-mb .data.item.title li a').click(function(event){
            event.preventDefault();
            $('.menu-content-mb .data.item.title li').removeClass('active');
            $('.menu-content-mb .data.item.tab-content > .tab-pane').removeClass('active');
            $(this).parent().addClass('active');
            var id = $(this).attr('href');
            $(id).addClass('active');
        });

        // Footer Parallax
        if ($('body').hasClass('parallax-footer')) {
            var footerHeight = $('.page-footer').height();
            $('body').css('padding-bottom', footerHeight);
        }

        //Quick view mobile
        if ($(".products-grid .product-item-info .actions-link a").hasClass('quickview-mobile')) {
            $(".products-grid .product-item-info").each(function() {
                if($(window).width() < 768) {
                    $(this).find(".actions-secondary > a.action.quickview").appendTo($(this).find(".action-mobile"));
                }else {
                    $(this).find(".action-mobile > a.action.quickview").appendTo($(this).find(".actions-secondary"));
                }
            });
            $(window).resize(function(){
                $(".products-grid .product-item-info").each(function() {
                    if($(window).width() < 768) {
                        $(this).find(".actions-secondary > a.action.quickview").appendTo($(this).find(".action-mobile"));
                    }else {
                        $(this).find(".action-mobile > a.action.quickview").appendTo($(this).find(".actions-secondary"));
                    }
                });
            });
        }

        // Closed minicart
        $(document).on("click","#close-minicart",function(e){
            $('.table-icon-menu .minicart-wrapper .action.showcart').click();
        });
        // Home metro
        if ($(window).width() <= 767) {
            $(".metro-new-sale-off").prependTo(".metro-product-middle");
            $(".metro-third-product").appendTo(".metro-product-top>.frame>.line>div:nth-child(1)>.line ");
        }

    });

    $(document).mouseup(function(e) {
        var container = $(".top-wishlist");
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('active');
        }
    });

    function disableBodyScroll() {
        $('body').addClass('fixed-content');
    }

    function activeBodyScroll($status) {
        if(!$status){
            $('body').removeClass('fixed-content');
        }else {
            if(!$('.page-header .header-top-links').hasClass('active') && !$('.page-header .top-wishlist').hasClass('active') && !$('.page-header .setting-site').hasClass('active') && !$('.page-header').hasClass('active-menu')){
                $('body').removeClass('fixed-content');
            }
        }
    }

    $(document).ready(function() {

        function changeNumber(el, classEl) {
            if ($(".change-product-per-row a").hasClass('active')) {
                $(".change-product-per-row a").removeClass('active')
            }
            el.addClass('active');

            if($(window).width() >= 992) {
                $('.product-list-masonry-change-product .product-item-masonry').removeClass(function (index, css) {
                    return (css.match (/\bcol-des\S+/g) || []).join(' '); // removes anything that starts with "itemnx"
                });
                $('.product-list-masonry-change-product .product-item-masonry').removeClass(function (index, css) {
                    return (css.match (/\bcol-tb\S+/g) || []).join(' '); // removes anything that starts with "itemnx"
                });
            }
            $('.product-list-masonry-change-product .product-item-masonry').addClass(classEl);


        }

        if($(window).width() >= 992) {
            $(".change-product-per-row .one").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-12 col-tb-12');
            });
            $(".change-product-per-row .two").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-6 col-tb-6');
            });
            $(".change-product-per-row .three").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-4 col-tb-4');
            });
            $(".change-product-per-row .four").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-3 col-tb-3');
            });
            $(".change-product-per-row .five").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-custom-5');
            });
            $(".change-product-per-row .six").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-2 col-tb-2');
            });
            $(".change-product-per-row .seven").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-custom-7');
            });
            $(".change-product-per-row .eight").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-custom-8');
            });
        }

    });
    $(document).ajaxComplete(function() {

        function changeNumber(el, classEl) {
            if ($(".change-product-per-row a").hasClass('active')) {
                $(".change-product-per-row a").removeClass('active')
            }
            el.addClass('active');

            if($(window).width() >= 992) {
                $('.product-list-masonry-change-product .product-item-masonry').removeClass(function (index, css) {
                    return (css.match (/\bcol-des\S+/g) || []).join(' '); // removes anything that starts with "itemnx"
                });
                $('.product-list-masonry-change-product .product-item-masonry').removeClass(function (index, css) {
                    return (css.match (/\bcol-tb\S+/g) || []).join(' '); // removes anything that starts with "itemnx"
                });
            }
            $('.product-list-masonry-change-product .product-item-masonry').addClass(classEl);


        }

        if($(window).width() >= 992) {
            $(".change-product-per-row .one").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-12 col-tb-12');
            });
            $(".change-product-per-row .two").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-6 col-tb-6');
            });
            $(".change-product-per-row .three").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-4 col-tb-4');
            });
            $(".change-product-per-row .four").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-3 col-tb-3');
            });
            $(".change-product-per-row .five").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-custom-5');
            });
            $(".change-product-per-row .six").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-2 col-tb-2');
            });
            $(".change-product-per-row .seven").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-custom-7');
            });
            $(".change-product-per-row .eight").click(function(e) {
                e.preventDefault();
                changeNumber($(this), 'col-des-custom-8');
            });
        }

    });




    /* ++++++++++++ */
    /* ++++++ Resize Function  ++++++ */
    $(window).resize(function(){
        // Home metro
        if ($(window).width() <= 767) {
            $(".metro-new-sale-off").prependTo(".metro-product-middle");
            $(".metro-third-product").appendTo(".metro-product-top>.frame>.line>div:nth-child(1)>.line ");
        }

        // Footer Parallax
        var footerHeight = $('.page-footer').height();
        if ($('body').hasClass('parallax-footer')) {
            $('body').css('padding-bottom', footerHeight);
        }
    });
    /* ++++++++++++ */
});
