"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var FeedbacksCommandSet_1 = require('./FeedbacksCommandSet');
var FeedbacksController = (function (_super) {
    __extends(FeedbacksController, _super);
    function FeedbacksController() {
        _super.call(this, FeedbacksController.Descriptor);
    }
    FeedbacksController.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-feedbacks", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new FeedbacksCommandSet_1.FeedbacksCommandSet(this);
        this.addCommandSet(commands);
    };
    FeedbacksController.prototype.getFeedbacks = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        this._db.getFeedbacks(correlationId, filter, paging, callback);
    };
    FeedbacksController.prototype.getFeedbackById = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        this._db.getFeedbackById(correlationId, feedbackId, callback);
    };
    FeedbacksController.prototype.sendFeedback = function (correlationId, feedback, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.send_feedback', callback);
        this._db.sendFeedback(correlationId, feedback, user, callback);
    };
    FeedbacksController.prototype.replyFeedback = function (correlationId, feedbackId, reply, user, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        this._db.replyFeedback(correlationId, feedbackId, reply, user, callback);
    };
    FeedbacksController.prototype.deleteFeedback = function (correlationId, feedbackId, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);
        this._db.deleteFeedback(correlationId, feedbackId, callback);
    };
    /**
     * Unique descriptor for the FeedbacksController component
     */
    FeedbacksController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-feedbacks", "*", "*");
    return FeedbacksController;
}(pip_services_runtime_node_3.AbstractController));
exports.FeedbacksController = FeedbacksController;
