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
var FeedbacksDataConverter_1 = require('./FeedbacksDataConverter');
var FeedbacksMongoDbPersistence = (function (_super) {
    __extends(FeedbacksMongoDbPersistence, _super);
    function FeedbacksMongoDbPersistence() {
        _super.call(this, FeedbacksMongoDbPersistence.Descriptor, require('./FeedbackModel'));
    }
    FeedbacksMongoDbPersistence.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._storage = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-storage", '*', '*'));
        _super.prototype.link.call(this, components);
    };
    FeedbacksMongoDbPersistence.prototype.defineFilterCondition = function (filter) {
        var criteria = _.pick(filter, 'category', 'app', 'sender_id', 'sender_email', 'replier_id');
        // Decode sender id
        if (filter.sender_id)
            criteria['sender.id'] = filter.sender_id;
        // Decode sender email
        if (filter.sender_email)
            criteria['sender.email'] = filter.sender_email;
        // Decode replier id
        if (filter.replier_id)
            criteria['replier.id'] = filter.replier_id;
        // Start time interval
        if (filter.from) {
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                sent: { $gte: filter.from }
            });
        }
        // End time interval
        if (filter.to) {
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                sent: { $lt: filter.to }
            });
        }
        // Replied flag
        if (filter.replied != null) {
            criteria.replied = {
                $exists: pip_services_runtime_node_4.Converter.toBoolean(filter.replied)
            };
        }
        // Full text search
        if (filter.search) {
            var search = filter.search, searchRegex = new RegExp(search, 'i');
            // Todo: This will not work for multi-language text
            criteria.$or = [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { sender_name: { $regex: searchRegex } }
            ];
        }
        return criteria;
    };
    FeedbacksMongoDbPersistence.prototype.getFeedbacks = function (correlationId, filter, paging, callback) {
        var criteria = this.defineFilterCondition(filter);
        this.getPage(criteria, paging, '-sent', { custom_dat: 0 }, callback);
    };
    FeedbacksMongoDbPersistence.prototype.getFeedbackById = function (correlationId, feedbackId, callback) {
        this.getById(feedbackId, callback);
    };
    FeedbacksMongoDbPersistence.prototype.sendFeedback = function (correlationId, feedback, user, callback) {
        var _this = this;
        var newItem = FeedbacksDataConverter_1.FeedbacksDataConverter.validate(feedback);
        newItem = _.omit(newItem, 'replied', 'replier', 'reply');
        newItem._id = newItem.id || this.createUuid();
        newItem.sent = new Date();
        if (user)
            newItem.sender = _.pick(user, 'id', 'name', 'email');
        var item;
        async.series([
            // Create feedback
            function (callback) {
                _this.create(newItem, function (err, data) {
                    item = data;
                    callback(err);
                });
            },
            // Add file references
            function (callback) {
                _this._storage.addBlockRefs(correlationId, FeedbacksDataConverter_1.FeedbacksDataConverter.getBlockIds(item), {
                    type: 'feedback',
                    id: item._id,
                    name: pip_services_runtime_node_4.Converter.fromMultiString(item)
                }, callback);
            }
        ], function (err) {
            callback(err, item);
        });
    };
    FeedbacksMongoDbPersistence.prototype.replyFeedback = function (correlationId, feedbackId, reply, user, callback) {
        var _this = this;
        // Todo: Send email back to sender
        this._model.findByIdAndUpdate(feedbackId, {
            $set: {
                replied: new Date(),
                replier: _.pick(user, 'id', 'name', 'email'),
                reply: reply
            }
        }, { 'new': true }, function (err, item) {
            item = _this.convertItem(item);
            callback(err, item);
        });
    };
    FeedbacksMongoDbPersistence.prototype.deleteFeedback = function (correlationId, feedbackId, callback) {
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
                    id: item._id
                }, callback);
            }
        ], function (err) {
            callback(err);
        });
    };
    /**
     * Unique descriptor for the FeedbacksMongoDbPersistence component
     */
    FeedbacksMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-feedbacks", "mongodb", "*");
    return FeedbacksMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.FeedbacksMongoDbPersistence = FeedbacksMongoDbPersistence;
