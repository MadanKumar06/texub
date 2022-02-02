/**
 * Copyright © 2016 MageWorx. All rights reserved.
 * See LICENSE.txt for license details.
 */

define([
    'jquery',
    'uiComponent',
    'uiRegistry',
    'underscore'
], function ($, Component, registry, _) {
    'use strict';
    $.Product = function (data) {
        this.name = data.name;
        this.image = data.image;
        this.reviews_rating = data[1] ? data[1].reviews_rating : null;
        this.short_description = data[0] ?  data[0].short_description : null;
        this.price = data.price;
        this.url = data.url;
    };
    $.Category = function (data) {
        this.name = data.name;
        this.url = data.url;
    };
    $.Page = function (data) {
        this.name = data.name;
        this.url = data.url;
    };
    $.Blog = function (data) {
        this.name = data.name;
        this.short_content = data.short_content;
        this.thumbnail = data.thumbnail;
        this.url = data.url;
    };
    return Component.extend({
        defaults: {
            localStorage: '',
            searchText: ''
        },

        initialize: function () {
            if(typeof $.initNamespaceStorage !== 'undefined') {
                this.localStorage = $.initNamespaceStorage('instantsearch').localStorage;
            }
            this._super();
        },

        load: function () {
            var self = this;

            if (this.xhr) {
                this.xhr.abort();
            }

            this.xhr = $.ajax({
                method: "get",
                dataType: "json",
                url: this.url,
                data: {q: this.searchText},
                beforeSend: function () {
                    self.spinnerShow();
                    if (self.loadFromLocalSorage(self.searchText)) {
                        self.showPopup();
                    }
                },
                success: $.proxy(function (response) {
                    self.parseData(response);
                    self.saveToLocalSorage(response, self.searchText);
                    self.spinnerHide();
                    self.showPopup();
                })
            });
        },

        showPopup: function () {
            registry.get('autocompleteBindEvents', function (binder) {
                binder.showPopup();
            });
        },

        spinnerShow: function () {
            registry.get('autocompleteBindEvents', function (binder) {
                binder.spinnerShow();
            });
        },

        spinnerHide: function () {
            registry.get('autocompleteBindEvents', function (binder) {
                binder.spinnerHide();
            });
        },

        parseData: function (response) {
            this.setProducts(this.getResponseData(response, 'product'));
            this.setCategories(this.getResponseData(response, 'category'));
            this.setPages(this.getResponseData(response, 'page'));
            this.setBlogs(this.getResponseData(response, 'blog'));
        },

        getResponseData: function (response, code) {
            var data = []

            if (_.isUndefined(response.result)) {
                return data;
            }
            $.each(response.result, function (index, obj) {
                if (index == code) {
                    data = obj;
                }
            });

            return data;
        },

        setProducts: function (productsData) {
            var products = [];

            if (!_.isUndefined(productsData.data)) {
                products = $.map(productsData.data, function (product) {
                    return new $.Product(product) });
            }

            registry.get('instant_search_form', function (autocomplete) {
                autocomplete.result.product.data(products);
                autocomplete.result.product.size(productsData.size);
                autocomplete.result.product.url(productsData.url);
            });
        },

        setCategories: function (categoriesData) {
            var categories = [];

            if (!_.isUndefined(categoriesData.data)) {
                categories = $.map(categoriesData.data, function (category) {
                    return new $.Category(category) });
            }

            registry.get('instant_search_form', function (autocomplete) {
                autocomplete.result.category.data(categories);
                autocomplete.result.category.size(categoriesData.size);
                autocomplete.result.category.url(categoriesData.url);
            });
        },

        setPages: function (pagesData) {
            var pages = [];

            if (!_.isUndefined(pagesData.data)) {
                pages = $.map(pagesData.data, function (page) {
                    return new $.Page(page) });
            }

            registry.get('instant_search_form', function (autocomplete) {
                autocomplete.result.page.data(pages);
                autocomplete.result.page.size(pagesData.size);
                autocomplete.result.page.url(pagesData.url);
            });
        },

        setBlogs: function (postsData) {
            var posts = [];

            if (!_.isUndefined(postsData.data)) {
                posts = $.map(postsData.data, function (post) {
                    return new $.Blog(post) });
            }

            registry.get('instant_search_form', function (autocomplete) {
                autocomplete.result.blog.data(posts);
                autocomplete.result.blog.size(postsData.size);
                autocomplete.result.blog.url(postsData.url);
            });
        },

        loadFromLocalSorage: function (queryText) {
            if (!this.localStorage) {
                return; }

            var hash = this._hash(queryText);
            var data = this.localStorage.get(hash);

            if (!data) {
                return false; }

            this.parseData(data);

            return true;
        },

        saveToLocalSorage: function (data, queryText) {
            if (!this.localStorage) {
                return; }

            var hash = this._hash(queryText);

            this.localStorage.remove(hash);
            this.localStorage.set(hash, data);
        },

        _hash: function (object) {
            var string = JSON.stringify(object) + "";

            var hash = 0, i, chr, len;
            if (string.length == 0) {
                return hash;
            }
            for (i = 0, len = string.length; i < len; i++) {
                chr = string.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return 'h' + hash;
        }

    });
});
