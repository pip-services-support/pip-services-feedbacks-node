"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var FeedbacksRestService = (function (_super) {
    __extends(FeedbacksRestService, _super);
    function FeedbacksRestService() {
        _super.call(this, FeedbacksRestService.Descriptor);
    }
    FeedbacksRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-feedbacks", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    FeedbacksRestService.prototype.getFeedbacks = function (req, res) {
        this._logic.getFeedbacks(req.params.correlation_id, new pip_services_runtime_node_3.FilterParams(req.params), new pip_services_runtime_node_4.PagingParams(req.params), this.sendResult(req, res));
    };
    FeedbacksRestService.prototype.getFeedbackById = function (req, res) {
        this._logic.getFeedbackById(req.params.correlation_id, req.params.feedbackId, this.sendResult(req, res));
    };
    FeedbacksRestService.prototype.sendFeedback = function (req, res) {
        this._logic.sendFeedback(req.params.correlation_id, req.body.feedback, req.body.user, this.sendCreatedResult(req, res));
    };
    FeedbacksRestService.prototype.replyFeedback = function (req, res) {
        this._logic.replyFeedback(req.params.correlation_id, req.params.feedbackId, req.body.reply, req.body.user, this.sendResult(req, res));
    };
    FeedbacksRestService.prototype.deleteFeedback = function (req, res) {
        this._logic.deleteFeedback(req.params.correlation_id, req.params.feedbackId, this.sendDeletedResult(req, res));
    };
    FeedbacksRestService.prototype.register = function () {
        this.registerRoute('get', '/feedbacks', this.getFeedbacks);
        this.registerRoute('get', '/feedbacks/:feedbackId', this.getFeedbackById);
        this.registerRoute('post', '/feedbacks', this.sendFeedback);
        this.registerRoute('put', '/feedbacks/:feedbackId', this.replyFeedback);
        this.registerRoute('delete', '/feedbacks/:feedbackId', this.deleteFeedback);
    };
    /**
     * Unique descriptor for the FeedbacksRestService component
     */
    FeedbacksRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-feedbacks", "rest", "1.0");
    return FeedbacksRestService;
}(pip_services_runtime_node_5.RestService));
exports.FeedbacksRestService = FeedbacksRestService;
