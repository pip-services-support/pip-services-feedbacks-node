let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';
import { FeedbacksFilePersistence } from './FeedbacksFilePersistence';

export class FeedbacksMemoryPersistence extends FeedbacksFilePersistence implements IFeedbacksPersistence {
	/**
	 * Unique descriptor for the FeedbacksMemoryPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-feedbacks", "memory", "*"
	);

    constructor() {
        super(FeedbacksMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
