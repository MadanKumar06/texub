/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'uiComponent',
    'ko'
], function ($, Component, ko) {
    'use strict';


    return Component.extend({
        defaults: {
            template: 'MGS_InstantSearch/search/autocomplete',
            showPopup: ko.observable(false),
            result: {
                product: {
                    data: ko.observableArray([]),
                    size: ko.observable(0),
                    url: ko.observable('')
                },
                category: {
                    data: ko.observableArray([]),
                    size: ko.observable(0),
                    url: ko.observable('')
                },
                page: {
                    data: ko.observableArray([]),
                    size: ko.observable(0),
                    url: ko.observable('')
                },
                blog: {
                    data: ko.observableArray([]),
                    size: ko.observable(0),
                    url: ko.observable('')
                }
            },
            textNoResult: '',
            anyResultCount: false
        },


        initialize: function () {
            var self = this;
            this._super();
            window.instantSearch = self.result;
            textNoResult: this.textNoResult;
            this.anyResultCount = ko.computed(function () {
                var sum = self.result.product.size() + self.result.category.size() + self.result.page.size() + self.result.blog.size();
                if (sum > 0) {
                    return true; }
                return false;
            }, this);

        }
    });
});