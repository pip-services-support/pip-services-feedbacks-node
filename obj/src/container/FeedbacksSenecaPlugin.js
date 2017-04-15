"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const FeedbacksMemoryPersistence_1 = require("../persistence/FeedbacksMemoryPersistence");
const FeedbacksFilePersistence_1 = require("../persistence/FeedbacksFilePersistence");
const FeedbacksMongoDbPersistence_1 = require("../persistence/FeedbacksMongoDbPersistence");
const FeedbacksController_1 = require("../logic/FeedbacksController");
const FeedbacksSenecaServiceV1_1 = require("../services/version1/FeedbacksSenecaServiceV1");
class FeedbacksSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-feedbacks', seneca, FeedbacksSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new FeedbacksController_1.FeedbacksController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new FeedbacksFilePersistence_1.FeedbacksFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new FeedbacksSenecaServiceV1_1.FeedbacksSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-feedbacks', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-feedbacks', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.FeedbacksSenecaPlugin = FeedbacksSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new FeedbacksSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=FeedbacksSenecaPlugin.js.map