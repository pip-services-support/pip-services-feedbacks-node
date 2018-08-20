import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AttachmentsClientFactory } from 'pip-clients-attachments-node';

import { FeedbacksServiceFactory } from '../build/FeedbacksServiceFactory';

export class FeedbacksProcess extends ProcessContainer {

    public constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksServiceFactory);
        this._factories.add(new AttachmentsClientFactory);
    }

}
