import { SenecaPlugin } from 'pip-services-runtime-node';

import { FeedbacksMicroservice} from './FeedbacksMicroservice';

export class FeedbacksSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('feedbacks', new FeedbacksMicroservice());
    }
}