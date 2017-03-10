import { Microservice } from 'pip-services-runtime-node';

import { FeedbacksFactory } from '../build/FeedbacksFactory';

/**
 * Feedbacks microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-27
 */
export class FeedbacksMicroservice extends Microservice {
	/**
	 * Creates instance of feedbacks microservice.
	 */
	constructor() {
		super("pip-services-feedbacks", FeedbacksFactory.Instance);
	}
}
