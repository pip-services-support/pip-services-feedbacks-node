"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var FeedbacksDataConverter_1 = require('./FeedbacksDataConverter');
var FeedbacksFilePersistence = (function (_super) {
    __extends(FeedbacksFilePersistence, _super);
    function FeedbacksFilePersistence(descriptor) {
        _super.call(this, descriptor || FeedbacksFilePersistence.Descriptor);
    }
    FeedbacksFilePersistence.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._storage = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-storage", '*', '*'));
        _super.prototype.link.call(this, components);
    };
    FeedbacksFilePersistence.prototype.getFeedbackFilter = function (filter) {
        var category = filter.category;
        var app = filter.app;
        var sender_id = filter.sender_id;
        var sender_email = filter.sender_email;
        var replier_id = filter.replier_id;
        var from = pip_services_runtime_node_4.Converter.toDate(filter.from);
        var to = pip_services_runtime_node_4.Converter.toDate(filter.to);
        var search = filter.search;
        var searchRegex = search ? new RegExp(search, 'i') : null;
        var replied = filter.replied;
        replied = replied != null ? pip_services_runtime_node_4.Converter.toBoolean(replied) : null;
        return function (item) {
            if (category && item.category != category)
                return false;
            if (app && item.app != app)
                return false;
            if (sender_id && (item.sender == null || item.sender.id != sender_id))
                return false;
            if (sender_email && (item.sender == null || item.sender.email != sender_email))
                return false;
            if (replier_id && (item.replier == null || item.replier.id != replier_id))
                return false;
            if (from && item.from < from)
                return false;
            if (to && item.to >= to)
                return false;
            if (replied == true && item.replied == null)
                return false;
            if (replied == false && item.replied != null)
                return false;
            // Todo: This will not work for multi-language text
            if (searchRegex) {
                if (!searchRegex.test(item.title))
                    return false;
                if (!searchRegex.test(item.content))
                    return false;
                if (!searchRegex.test(item.sender_name))
                    return false;
            }
            return true;
        };
    };
    FeedbacksFilePersistence.prototype.getFeedbacks = function (correlationId, filter, paging, callback) {
        var filterParams = filter || {};
        var filterFunc = this.getFeedbackFilter(filterParams);
        this.getPage(filterFunc, paging, null, null, callback);
    };
    FeedbacksFilePersistence.prototype.getFeedbackById = function (correlationId, feedbackId, callback) {
        this.getById(feedbackId, callback);
    };
    FeedbacksFilePersistence.prototype.sendFeedback = function (correlationId, feedback, user, callback) {
        var _this = this;
        var item = FeedbacksDataConverter_1.FeedbacksDataConverter.validate(feedback);
        item = _.omit(item, 'replied', 'replier', 'reply');
        item.id = item.id || this.createUuid();
        item.sent = new Date();
        if (user)
            item.sender = _.pick(user, 'id', 'name', 'email');
        async.series([
            // Create feedback
            function (callback) {
                _this.create(item, callback);
            },
            // Add file references
            function (callback) {
                _this._storage.addBlockRefs(correlationId, FeedbacksDataConverter_1.FeedbacksDataConverter.getBlockIds(item), {
                    type: 'feedback',
                    id: item.id,
                    name: item.title
                }, callback);
            }
        ], function (err) {
            callback(err, item);
        });
    };
    FeedbacksFilePersistence.prototype.replyFeedback = function (correlationId, feedbackId, reply, user, callback) {
        var _this = this;
        this.getById(feedbackId, function (err, item) {
            if (err) {
                callback(err);
                return;
            }
            if (item == null) {
                callback(new pip_services_runtime_node_5.NotFoundError(_this, 'FeedbackNotFound', 'Feedback ' + feedbackId + ' was not found')
                    .withCorrelationId(correlationId)
                    .withDetails(feedbackId));
                return;
            }
            // Todo: Send email back to sender
            item.replied = new Date();
            if (user)
                item.replier = _.pick(user, 'id', 'name', 'email');
            item.reply = reply;
            _this.save(function (err) {
                callback(err, item);
            });
        });
    };
    FeedbacksFilePersistence.prototype.deleteFeedback = function (correlationId, feedbackId, callback) {
        var _this = this;
        var item;
        async.series([
            // Remove feedback
            function (callback) {
                _this.delete(feedbackId, function (err, data) {
                    item = data;
                    callback(err);
                });
            },
            // Remove block references
            function (callback) {
                if (item == null) {
                    callback();
                    return;
                }
                _this._storage.removeBlockRefs(correlationId, FeedbacksDataConverter_1.FeedbacksDataConverter.getBlockIds(item), {
                    type: 'feedback',
                    id: item.id
                }, callback);
            }
        ], function (err) {
            callback(err, item);
        });
    };
    /**
     * Unique descriptor for the FeedbacksFilePersistence component
     */
    FeedbacksFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-feedbacks", "file", "*");
    return FeedbacksFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.FeedbacksFilePersistence = FeedbacksFilePersistence;
