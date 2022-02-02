/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'mage/translate',
    'Magento_Ui/js/modal/modal',
    'ko',
    'jquery/ui',
    'mage/validation/validation'

], function ($,$translate,modal,ko) {
    "use strict";

    $.widget('mgs.aQuickView', {

        _create: function () {
            // Do something
        },
        productQuickView: function (actionUrl, prdId) {
			var self = this;
			$.ajax({
				url: actionUrl,
				dataType: 'json',
				success: function (result) {
					$('#loading_overlay').removeClass('loading');
					if (result.product_detail) {
						$('body').append('<div id="product_quickview_content'+result.id_product+'" class="product_quickview_content"></div>');
						self.popupModal(result);
					}
				}
			});
        },

        popupModal: function (result) {
            var self = this,
				modelClass = "quickViewDetails viewBox";

            var options =
            {
                type: 'popup',
                modalClass: modelClass,
                responsive: true,
                innerScroll: true,
                title: false,
                buttons: false
            };

			var popup = modal(options, $('#product_quickview_content'+result.id_product));
			$('#product_quickview_content'+result.id_product).html(result.product_detail);
			$('#product_quickview_content'+result.id_product).trigger('contentUpdated');
			$('#product_quickview_content'+result.id_product).modal('openModal').on('modalclosed', function() {
				$('#product_quickview_content'+result.id_product).parents('.quickViewDetails').remove();
				$('body:not(.origin-catalog-product-view)').removeClass('catalog-product-view');
                $('body').removeAttr("style");
			});
        }
    });

    return $.mgs.aQuickView;
});

