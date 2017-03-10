"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var FeedbacksFilePersistence_1 = require('./FeedbacksFilePersistence');
var FeedbacksMemoryPersistence = (function (_super) {
    __extends(FeedbacksMemoryPersistence, _super);
    function FeedbacksMemoryPersistence() {
        _super.call(this, FeedbacksMemoryPersistence.Descriptor);
    }
    FeedbacksMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    FeedbacksMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the FeedbacksMemoryPersistence component
     */
    FeedbacksMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-feedbacks", "memory", "*");
    return FeedbacksMemoryPersistence;
}(FeedbacksFilePersistence_1.FeedbacksFilePersistence));
exports.FeedbacksMemoryPersistence = FeedbacksMemoryPersistence;
