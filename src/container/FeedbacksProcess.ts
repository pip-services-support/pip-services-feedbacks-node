import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { AttachmentsClientFactory } from 'pip-clients-attachments-node';
import { FeedbacksServiceFactory } from '../build/FeedbacksServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class FeedbacksProcess extends ProcessContainer {

    public constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksServiceFactory);
        this._factories.add(new AttachmentsClientFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
