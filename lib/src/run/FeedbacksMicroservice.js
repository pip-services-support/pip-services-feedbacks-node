"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var FeedbacksFactory_1 = require('../build/FeedbacksFactory');
/**
 * Feedbacks microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-27
 */
var FeedbacksMicroservice = (function (_super) {
    __extends(FeedbacksMicroservice, _super);
    /**
     * Creates instance of feedbacks microservice.
     */
    function FeedbacksMicroservice() {
        _super.call(this, "pip-services-feedbacks", FeedbacksFactory_1.FeedbacksFactory.Instance);
    }
    return FeedbacksMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.FeedbacksMicroservice = FeedbacksMicroservice;
