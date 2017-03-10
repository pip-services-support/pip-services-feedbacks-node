"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var FeedbacksMicroservice_1 = require('./FeedbacksMicroservice');
var FeedbacksSenecaPlugin = (function (_super) {
    __extends(FeedbacksSenecaPlugin, _super);
    function FeedbacksSenecaPlugin() {
        _super.call(this, 'feedbacks', new FeedbacksMicroservice_1.FeedbacksMicroservice());
    }
    return FeedbacksSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.FeedbacksSenecaPlugin = FeedbacksSenecaPlugin;
