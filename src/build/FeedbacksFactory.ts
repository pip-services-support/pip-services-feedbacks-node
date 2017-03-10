import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { StorageFactory } from 'pip-clients-storage-node';

import { FeedbacksMongoDbPersistence } from '../persistence/FeedbacksMongoDbPersistence';
import { FeedbacksFilePersistence } from '../persistence/FeedbacksFilePersistence';
import { FeedbacksMemoryPersistence } from '../persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../logic/FeedbacksController';
import { FeedbacksRestService } from '../services/version1/FeedbacksRestService';
import { FeedbacksSenecaService } from '../services/version1/FeedbacksSenecaService'; 

export class FeedbacksFactory extends ComponentFactory {
	public static Instance: FeedbacksFactory = new FeedbacksFactory();
	
	constructor() {
		super(StorageFactory.Instance, DefaultFactory.Instance);

		this.register(FeedbacksFilePersistence.Descriptor, FeedbacksFilePersistence);
		this.register(FeedbacksMemoryPersistence.Descriptor, FeedbacksMemoryPersistence);
		this.register(FeedbacksMongoDbPersistence.Descriptor, FeedbacksMongoDbPersistence);
		this.register(FeedbacksController.Descriptor, FeedbacksController);
		this.register(FeedbacksRestService.Descriptor, FeedbacksRestService);
		this.register(FeedbacksSenecaService.Descriptor, FeedbacksSenecaService);
	}
	
}
