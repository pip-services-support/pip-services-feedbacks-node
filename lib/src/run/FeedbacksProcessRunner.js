"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var FeedbacksMicroservice_1 = require('./FeedbacksMicroservice');
/**
 * Feedbacks process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-27
 */
var FeedbacksProcessRunner = (function (_super) {
    __extends(FeedbacksProcessRunner, _super);
    /**
     * Creates instance of feedbacks process runner
     */
    function FeedbacksProcessRunner() {
        _super.call(this, new FeedbacksMicroservice_1.FeedbacksMicroservice());
    }
    return FeedbacksProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.FeedbacksProcessRunner = FeedbacksProcessRunner;
