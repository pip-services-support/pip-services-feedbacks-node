"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const FeedbacksMongoDbPersistence_1 = require("../persistence/FeedbacksMongoDbPersistence");
const FeedbacksFilePersistence_1 = require("../persistence/FeedbacksFilePersistence");
const FeedbacksMemoryPersistence_1 = require("../persistence/FeedbacksMemoryPersistence");
const FeedbacksController_1 = require("../logic/FeedbacksController");
const FeedbacksHttpServiceV1_1 = require("../services/version1/FeedbacksHttpServiceV1");
class FeedbacksServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(FeedbacksServiceFactory.MemoryPersistenceDescriptor, FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence);
        this.registerAsType(FeedbacksServiceFactory.FilePersistenceDescriptor, FeedbacksFilePersistence_1.FeedbacksFilePersistence);
        this.registerAsType(FeedbacksServiceFactory.MongoDbPersistenceDescriptor, FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence);
        this.registerAsType(FeedbacksServiceFactory.ControllerDescriptor, FeedbacksController_1.FeedbacksController);
        this.registerAsType(FeedbacksServiceFactory.HttpServiceDescriptor, FeedbacksHttpServiceV1_1.FeedbacksHttpServiceV1);
    }
}
FeedbacksServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-feedbacks", "factory", "default", "default", "1.0");
FeedbacksServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-feedbacks", "persistence", "memory", "*", "1.0");
FeedbacksServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-feedbacks", "persistence", "file", "*", "1.0");
FeedbacksServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-feedbacks", "persistence", "mongodb", "*", "1.0");
FeedbacksServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-feedbacks", "controller", "default", "*", "1.0");
FeedbacksServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-feedbacks", "service", "http", "*", "1.0");
exports.FeedbacksServiceFactory = FeedbacksServiceFactory;
//# sourceMappingURL=FeedbacksServiceFactory.js.map