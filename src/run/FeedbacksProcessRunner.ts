import { ProcessRunner } from 'pip-services-runtime-node';

import { FeedbacksMicroservice } from './FeedbacksMicroservice';

/**
 * Feedbacks process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-27
 */
export class FeedbacksProcessRunner extends ProcessRunner {
    /**
     * Creates instance of feedbacks process runner
     */
    constructor() {
        super(new FeedbacksMicroservice());
    }
}