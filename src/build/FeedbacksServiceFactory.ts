import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { FeedbacksMongoDbPersistence } from '../persistence/FeedbacksMongoDbPersistence';
import { FeedbacksFilePersistence } from '../persistence/FeedbacksFilePersistence';
import { FeedbacksMemoryPersistence } from '../persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../logic/FeedbacksController';
import { FeedbacksHttpServiceV1 } from '../services/version1/FeedbacksHttpServiceV1';
import { FeedbacksSenecaServiceV1 } from '../services/version1/FeedbacksSenecaServiceV1'; 

export class FeedbacksServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-feedbacks", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-feedbacks", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-feedbacks", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-feedbacks", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-feedbacks", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-feedbacks", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-feedbacks", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(FeedbacksServiceFactory.MemoryPersistenceDescriptor, FeedbacksMemoryPersistence);
		this.registerAsType(FeedbacksServiceFactory.FilePersistenceDescriptor, FeedbacksFilePersistence);
		this.registerAsType(FeedbacksServiceFactory.MongoDbPersistenceDescriptor, FeedbacksMongoDbPersistence);
		this.registerAsType(FeedbacksServiceFactory.ControllerDescriptor, FeedbacksController);
		this.registerAsType(FeedbacksServiceFactory.SenecaServiceDescriptor, FeedbacksSenecaServiceV1);
		this.registerAsType(FeedbacksServiceFactory.HttpServiceDescriptor, FeedbacksHttpServiceV1);
	}
	
}
