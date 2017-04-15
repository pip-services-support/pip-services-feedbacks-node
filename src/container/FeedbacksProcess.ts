import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { FeedbacksFactory } from '../build/FeedbacksFactory';

export class FeedbacksProcess extends ProcessContainer {

    public constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksFactory);
    }

}
