"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const PartyReferenceV1Schema_1 = require("../data/version1/PartyReferenceV1Schema");
const FeedbackV1Schema_1 = require("../data/version1/FeedbackV1Schema");
class FeedbacksCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetFeedbacksCommand());
        this.addCommand(this.makeGetFeedbackByIdCommand());
        this.addCommand(this.makeSendFeedbackCommand());
        this.addCommand(this.makeReplyFeedbackCommand());
        this.addCommand(this.makeDeleteFeedbackByIdCommand());
    }
    makeGetFeedbacksCommand() {
        return new pip_services_commons_node_2.Command("get_feedbacks", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getFeedbacks(correlationId, filter, paging, callback);
        });
    }
    makeGetFeedbackByIdCommand() {
        return new pip_services_commons_node_2.Command("get_feedback_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('feedback_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let feedbackId = args.getAsNullableString("feedback_id");
            this._logic.getFeedbackById(correlationId, feedbackId, callback);
        });
    }
    makeSendFeedbackCommand() {
        return new pip_services_commons_node_2.Command("send_feedback", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('feedback', new FeedbackV1Schema_1.FeedbackV1Schema())
            .withOptionalProperty('user', new PartyReferenceV1Schema_1.PartyReferenceV1Schema()), (correlationId, args, callback) => {
            let feedback = args.get("feedback");
            let user = args.get("user");
            this._logic.sendFeedback(correlationId, feedback, user, callback);
        });
    }
    makeReplyFeedbackCommand() {
        return new pip_services_commons_node_2.Command("reply_feedback", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('feedback_id', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('reply', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('user', new PartyReferenceV1Schema_1.PartyReferenceV1Schema()), (correlationId, args, callback) => {
            let feedbackId = args.getAsNullableString("feedback_id");
            let reply = args.getAsNullableString("reply");
            let user = args.get("user");
            this._logic.replyFeedback(correlationId, feedbackId, reply, user, callback);
        });
    }
    makeDeleteFeedbackByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_feedback_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('feedback_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let feedbackId = args.getAsNullableString("feedback_id");
            this._logic.deleteFeedbackById(correlationId, feedbackId, callback);
        });
    }
}
exports.FeedbacksCommandSet = FeedbacksCommandSet;
//# sourceMappingURL=FeedbacksCommandSet.js.map