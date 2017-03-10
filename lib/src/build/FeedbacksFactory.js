"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var FeedbacksMongoDbPersistence_1 = require('../persistence/FeedbacksMongoDbPersistence');
var FeedbacksFilePersistence_1 = require('../persistence/FeedbacksFilePersistence');
var FeedbacksMemoryPersistence_1 = require('../persistence/FeedbacksMemoryPersistence');
var FeedbacksController_1 = require('../logic/FeedbacksController');
var FeedbacksRestService_1 = require('../services/version1/FeedbacksRestService');
var FeedbacksSenecaService_1 = require('../services/version1/FeedbacksSenecaService');
var FeedbacksFactory = (function (_super) {
    __extends(FeedbacksFactory, _super);
    function FeedbacksFactory() {
        _super.call(this, pip_clients_storage_node_1.StorageFactory.Instance, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(FeedbacksFilePersistence_1.FeedbacksFilePersistence.Descriptor, FeedbacksFilePersistence_1.FeedbacksFilePersistence);
        this.register(FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence.Descriptor, FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence);
        this.register(FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence.Descriptor, FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence);
        this.register(FeedbacksController_1.FeedbacksController.Descriptor, FeedbacksController_1.FeedbacksController);
        this.register(FeedbacksRestService_1.FeedbacksRestService.Descriptor, FeedbacksRestService_1.FeedbacksRestService);
        this.register(FeedbacksSenecaService_1.FeedbacksSenecaService.Descriptor, FeedbacksSenecaService_1.FeedbacksSenecaService);
    }
    FeedbacksFactory.Instance = new FeedbacksFactory();
    return FeedbacksFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.FeedbacksFactory = FeedbacksFactory;
