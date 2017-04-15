import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { FeedbacksMongoDbPersistence } from '../persistence/FeedbacksMongoDbPersistence';
import { FeedbacksFilePersistence } from '../persistence/FeedbacksFilePersistence';
import { FeedbacksMemoryPersistence } from '../persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../logic/FeedbacksController';
import { FeedbacksHttpServiceV1 } from '../services/version1/FeedbacksHttpServiceV1';
import { FeedbacksSenecaServiceV1 } from '../services/version1/FeedbacksSenecaServiceV1'; 

export class FeedbacksFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-feedbacks", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-feedbacks", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-feedbacks", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-feedbacks", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-feedbacks", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-feedbacks", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-feedbacks", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(FeedbacksFactory.MemoryPersistenceDescriptor, FeedbacksMemoryPersistence);
		this.registerAsType(FeedbacksFactory.FilePersistenceDescriptor, FeedbacksFilePersistence);
		this.registerAsType(FeedbacksFactory.MongoDbPersistenceDescriptor, FeedbacksMongoDbPersistence);
		this.registerAsType(FeedbacksFactory.ControllerDescriptor, FeedbacksController);
		this.registerAsType(FeedbacksFactory.SenecaServiceDescriptor, FeedbacksSenecaServiceV1);
		this.registerAsType(FeedbacksFactory.HttpServiceDescriptor, FeedbacksHttpServiceV1);
	}
	
}
