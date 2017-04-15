"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const FeedbacksMongoDbPersistence_1 = require("../persistence/FeedbacksMongoDbPersistence");
const FeedbacksFilePersistence_1 = require("../persistence/FeedbacksFilePersistence");
const FeedbacksMemoryPersistence_1 = require("../persistence/FeedbacksMemoryPersistence");
const FeedbacksController_1 = require("../logic/FeedbacksController");
const FeedbacksHttpServiceV1_1 = require("../services/version1/FeedbacksHttpServiceV1");
const FeedbacksSenecaServiceV1_1 = require("../services/version1/FeedbacksSenecaServiceV1");
class FeedbacksFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(FeedbacksFactory.MemoryPersistenceDescriptor, FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence);
        this.registerAsType(FeedbacksFactory.FilePersistenceDescriptor, FeedbacksFilePersistence_1.FeedbacksFilePersistence);
        this.registerAsType(FeedbacksFactory.MongoDbPersistenceDescriptor, FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence);
        this.registerAsType(FeedbacksFactory.ControllerDescriptor, FeedbacksController_1.FeedbacksController);
        this.registerAsType(FeedbacksFactory.SenecaServiceDescriptor, FeedbacksSenecaServiceV1_1.FeedbacksSenecaServiceV1);
        this.registerAsType(FeedbacksFactory.HttpServiceDescriptor, FeedbacksHttpServiceV1_1.FeedbacksHttpServiceV1);
    }
}
FeedbacksFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "factory", "default", "default", "1.0");
FeedbacksFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "persistence", "memory", "*", "1.0");
FeedbacksFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "persistence", "file", "*", "1.0");
FeedbacksFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "persistence", "mongodb", "*", "1.0");
FeedbacksFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "controller", "default", "*", "1.0");
FeedbacksFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "service", "seneca", "*", "1.0");
FeedbacksFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-feedbacks", "service", "http", "*", "1.0");
exports.FeedbacksFactory = FeedbacksFactory;
//# sourceMappingURL=FeedbacksFactory.js.map