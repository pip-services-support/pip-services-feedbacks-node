"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var FeedbacksCommandSet = (function (_super) {
    __extends(FeedbacksCommandSet, _super);
    function FeedbacksCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetFeedbacksCommand());
        this.addCommand(this.makeGetFeedbackByIdCommand());
        this.addCommand(this.makeSendFeedbackCommand());
        this.addCommand(this.makeReplyFeedbackCommand());
        this.addCommand(this.makeDeleteFeedbackCommand());
    }
    FeedbacksCommandSet.prototype.makeGetFeedbacksCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_feedbacks", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams")
            .withOptionalProperty("paging", "PagingParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            var paging = pip_services_runtime_node_5.PagingParams.fromValue(args.get("paging"));
            _this._logic.getFeedbacks(correlationId, filter, paging, callback);
        });
    };
    FeedbacksCommandSet.prototype.makeGetFeedbackByIdCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_feedback_by_id", new pip_services_runtime_node_3.Schema()
            .withProperty("feedback_id", "string"), function (correlationId, args, callback) {
            var feedbackId = args.getNullableString("feedback_id");
            _this._logic.getFeedbackById(correlationId, feedbackId, callback);
        });
    };
    FeedbacksCommandSet.prototype.makeSendFeedbackCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "send_feedback", new pip_services_runtime_node_3.Schema()
            .withProperty("feedback", "any")
            .withProperty("user", "any"), function (correlationId, args, callback) {
            var feedback = args.get("feedback");
            var user = args.get("user");
            _this._logic.sendFeedback(correlationId, feedback, user, callback);
        });
    };
    FeedbacksCommandSet.prototype.makeReplyFeedbackCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "reply_feedback", new pip_services_runtime_node_3.Schema()
            .withProperty("feedback_id", "string")
            .withProperty("reply", "string")
            .withProperty("user", "any"), function (correlationId, args, callback) {
            var feedbackId = args.getNullableString("feedback_id");
            var reply = args.getNullableString("reply");
            var user = args.get("user");
            _this._logic.replyFeedback(correlationId, feedbackId, reply, user, callback);
        });
    };
    FeedbacksCommandSet.prototype.makeDeleteFeedbackCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_feedback", new pip_services_runtime_node_3.Schema()
            .withProperty("feedback_id", "string"), function (correlationId, args, callback) {
            var feedbackId = args.getNullableString("feedback_id");
            _this._logic.deleteFeedback(correlationId, feedbackId, callback);
        });
    };
    return FeedbacksCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.FeedbacksCommandSet = FeedbacksCommandSet;
