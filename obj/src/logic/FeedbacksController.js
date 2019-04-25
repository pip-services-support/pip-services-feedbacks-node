"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const FeedbacksCommandSet_1 = require("./FeedbacksCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class FeedbacksController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(FeedbacksController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new FeedbacksCommandSet_1.FeedbacksCommandSet(this);
        return this._commandSet;
    }
    getFeedbacks(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getFeedbackById(correlationId, feedbackId, callback) {
        this._persistence.getOneById(correlationId, feedbackId, callback);
    }
    sendFeedback(correlationId, feedback, user, callback) {
        let newFeedback = null;
        if (user != null)
            feedback.sender = user;
        feedback.sent_time = new Date();
        async.series([
            (callback) => {
                this._persistence.create(correlationId, feedback, (err, data) => {
                    newFeedback = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newFeedback, callback);
            }
        ], (err) => {
            callback(err, newFeedback);
        });
    }
    replyFeedback(correlationId, feedbackId, reply, user, callback) {
        let data = pip_services3_commons_node_3.AnyValueMap.fromTuples('reply_time', new Date(), 'reply', reply, 'replier', user);
        this._persistence.updatePartially(correlationId, feedbackId, data, callback);
    }
    deleteFeedbackById(correlationId, feedbackId, callback) {
        let oldFeedback = null;
        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, feedbackId, (err, data) => {
                    oldFeedback = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldFeedback, callback);
            }
        ], (err) => {
            callback(err, oldFeedback);
        });
    }
}
FeedbacksController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-feedbacks:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
exports.FeedbacksController = FeedbacksController;
//# sourceMappingURL=FeedbacksController.js.map