import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { FeedbacksMemoryPersistence } from '../persistence/FeedbacksMemoryPersistence';
import { FeedbacksFilePersistence } from '../persistence/FeedbacksFilePersistence';
import { FeedbacksMongoDbPersistence } from '../persistence/FeedbacksMongoDbPersistence';
import { FeedbacksController } from '../logic/FeedbacksController';
import { FeedbacksSenecaServiceV1 } from '../services/version1/FeedbacksSenecaServiceV1';

export class FeedbacksSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-feedbacks', seneca, FeedbacksSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new FeedbacksController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new FeedbacksMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new FeedbacksFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new FeedbacksMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new FeedbacksSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-feedbacks', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-feedbacks', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new FeedbacksSenecaPlugin(seneca, options);
    return { name: plugin.name };
}