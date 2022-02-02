/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
 define([
    'jquery',
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'underscore',
    'escaper',
    'jquery/jquery-storageapi'
], function ($, Component, customerData, _, escaper) {
    'use strict';

    return Component.extend({
        defaults: {
            cookieMessages: [],
            messages: [],
            selector: '.page.messages .message',
            allowedTags: ['div', 'span', 'b', 'strong', 'i', 'em', 'u', 'a'],
            listens: {
				isHidden: 'onHiddenChange'
			}
        },

        /**
         * Extends Component object by storage observable messages.
         */
        initialize: function () {
            this._super();

            this.cookieMessages = _.unique($.cookieStorage.get('mage-messages'), 'text');
            this.messages = customerData.get('messages').extend({
                disposableCustomerData: 'messages'
            });

            // Force to clean obsolete messages
            if (!_.isEmpty(this.messages().messages)) {
                customerData.set('messages', {});
            }

            $.cookieStorage.set('mage-messages', '');
        },

        /**
         * Prepare the given message to be rendered as HTML
         *
         * @param {String} message
         * @return {String}
         */
        prepareMessageForHtml: function (message) {
            return escaper.escapeHtml(message, this.allowedTags);
        },

        RemoveMessage: function () {
			$('.page.messages .message').toggleClass('fadeIn fadeOut');
			setTimeout(function () {
				$('.page.messages .message').hide()
			}, 2000);
		},

        onHiddenChange: function (isHidden) {
			var self = this;
			if (isHidden) {
				setTimeout(function () {
					self.RemoveMessage();
				}, 5000);
			}
			this.isHidden(false);
		}
    });
});
