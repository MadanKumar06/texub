define(['jquery', 'MGS_AjaxCart/js/config', 'Magento_Ui/js/modal/modal', 'magnificPopup'], function($, mgsConfig, modal) {
    "use strict";
    jQuery.widget('mgs.action', {
        options: {
            requestParamName: mgsConfig.requestParamName
        },
        fire: function(tag, actionId, url, data, redirectToCatalog) {
            this._fire(tag, actionId, url, data);
        },
        _fire: function(tag, actionId, url, data) {
            var textCart = $.mage.__('Add To Cart');
            var self = this;
            data.push({
                name: this.options.requestParamName,
                value: 1
            });
            jQuery.ajax({
                url: url,
                data: jQuery.param(data),
                type: 'post',
                dataType: 'json',
                beforeSend: function(xhr, options) {
                    if (mgsConfig.animationType) {
                        jQuery('#mgs-ajax-loading').show();
                    } else {
                        if (tag.find('.tocart').length) {
                            tag.find('.tocart').addClass('disabled');
                            tag.find('.tocart .icon').removeClass('pe-7s-shopbag');
                            tag.find('.tocart .icon').addClass('fa-spin pe-7s-config');
                            tag.find('.tocart .text').text('Adding...');
                            tag.find('.tocart').attr('title', 'Adding...');
                            tag.attr('title', 'Adding...');
                            $("#product-addtocart-button > span").text('Adding...');
                        } else {
                            tag.addClass('disabled');
                            tag.attr('title', 'Adding...');
                        }
                    }
                },
                success: function(response, status) {
                    if (tag.find('.tocart').length) {
                        tag.find('.tocart').removeClass('disabled');
                        tag.find('.tocart .text').text(textCart);
                        tag.find('.tocart .icon').removeClass('pe-7s-config');
                        tag.find('.tocart .icon').removeClass('fa-spin');
                        tag.find('.tocart .icon').addClass('pe-7s-shopbag');
                        if (tag.closest('.product-item-info').length) {
                            $source = tag.closest('.product-item-info');
                            var width = $source.outerWidth();
                            var height = $source.outerHeight();
                        } else {
                            $source = tag.find('.tocart');
                            var width = 300;
                            var height = 300;
                        }
                    } else {
                        tag.removeClass('disabled');
                        tag.find('.icon').removeClass('fa-spin');
                        tag.find('.text').text(textCart);
                        tag.find('.icon').removeClass('pe-7s-config');
                        tag.find('.icon').addClass('pe-7s-shopbag');
                        $source = tag.closest('.product-item-info');
                        var width = $source.outerWidth();
                        var height = $source.outerHeight();
                    }


                    if (status == 'success') {
                        if (response.backUrl) {
                            data.push({
                                name: 'action_url',
                                value: response.backUrl
                            });
                            self._fire(tag, actionId, response.backUrl, data);
                        } else {
                            if (response.ui) {
                                if (response.productView) {

                                    if (!response.lisProduct && CATALOG_CHECK == 2) {
                                        $("#product-addtocart-button > span").text('Add to cart');
                                        return;
                                    }
                                    $.ajax({
                                        url: response.ui,
                                        dataType: 'json',
                                        success: function (result) {
                                            jQuery('#mgs-ajax-loading').hide();
                                            if (result.product_detail) {
                                                $('body').append('<div id="ajaxcart_form_popup'+result.id_product+'" class="product_quickview_content"></div>');
                                                var options =
                                                    {
                                                        type: 'popup',
                                                        modalClass: "ajaxCartForm viewBox",
                                                        responsive: true,
                                                        innerScroll: true,
                                                        title: false,
                                                        buttons: false
                                                    };

                                                var popup = modal(options, $('#ajaxcart_form_popup'+result.id_product));
                                                $('#ajaxcart_form_popup'+result.id_product).html(result.product_detail);
                                                $('#ajaxcart_form_popup'+result.id_product).trigger('contentUpdated');
                                                $('#ajaxcart_form_popup'+result.id_product).modal('openModal').on('modalclosed', function() {
                                                    $('#ajaxcart_form_popup'+result.id_product).parents('.ajaxCartForm').remove();
                                                    $('body:not(.origin-catalog-product-view)').removeClass('catalog-product-view');
                                                    $('body').css('overflow','auto');
                                                });
                                            }
                                        }
                                    });
                                } else{
                                    /* After Add to cart success */

                                    jQuery('#mgs-ajax-loading').hide();
                                    

                                    if(response.animationType == 'popup') {
                                        $('.page.messages').hide();
                                        /* Success Cart Popup */
                                        $('body').append('<div id="popup_ajaxcart_success" class="popup__main popup--result"></div>');

                                        var options =
                                            {
                                                type: 'popup',
                                                modalClass: "success-ajax--popup viewBox",
                                                responsive: true,
                                                innerScroll: true,
                                                title: false,
                                                buttons: false
                                            };

                                        var popup = modal(options, $('#popup_ajaxcart_success'));
                                        if(response.related != "") {
                                            $('.success-ajax--popup .modal-inner-wrap').addClass('popup-related');
                                        }
                                        $('#popup_ajaxcart_success').html(response.ui + response.related);
                                        $('#popup_ajaxcart_success').trigger('contentUpdated');
                                        $('#popup_ajaxcart_success').modal('openModal').on('modalclosed', function() {
                                            $('#popup_ajaxcart_success').parents('.success-ajax--popup').remove();
                                        });
                                        
                                        setTimeout(function () {
                                            $('.page.messages .message').hide();
                                            $('.page.messages').show();
                                        }, 2000);
                                    }else if(response.animationType == 'flycart'){
                                        /* Success Cart Fly */
                                        var $source = '';
                                        if(tag.find('.tocart').length){
                                            if(tag.closest('.product-item-info').length){
                                                $source = tag.closest('.product-item-info');
                                            }else{
                                                $source = tag.find('.tocart');
                                            }
                                        }else{
                                            tag.removeClass('disabled');
                                            $source = tag.closest('.product-item-info');
                                        }

                                        var $animatedObject = jQuery('<div class="flycart-animated-add" style="position: absolute;z-index: 99999;">'+response.image+'</div>');

                                        var $_left = $source.offset().left - 1;
                                        var $_top = $source.offset().top - 1;

                                        $animatedObject.css({top: $_top, left: $_left});
                                        jQuery('html').append($animatedObject);

                                        if(jQuery(window).width() > 767){
                                            var gotoX = jQuery("#fixed-cart-footer").offset().left + 20;
                                            var gotoY = jQuery("#fixed-cart-footer").offset().top;

                                            jQuery('#footer-cart-trigger').addClass('active');
                                            jQuery('#footer-mini-cart').slideDown(300);
                                        }else {
                                            var gotoX = jQuery("#cart-top-action").offset().left;
                                            var gotoY = jQuery("#cart-top-action").offset().top;
                                        }

                                        $animatedObject.animate({
                                                opacity: 0.6,
                                                left: gotoX,
                                                top: gotoY
                                            }, 2000,
                                            function () {
                                                $animatedObject.remove();
                                            });
                                    }else {
                                        $('.product_quickview_content').modal('closeModal');
                                        $("header.page-header").addClass("show-sticky-menu");
                                        $('[data-block="minicart"]').find('[data-role="dropdownDialog"]').dropdownDialog("open");
                                        
                                    }
                                }
                            }
                        }
                    }
                },
                error: function() {
                    jQuery('#mgs-ajax-loading').hide();
                    window.location.href = mgsConfig.redirectCartUrl;
                }
            });
        }
    });
    return jQuery.mgs.action;
});
