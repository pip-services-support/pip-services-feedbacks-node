import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class FeedbacksHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/feedbacks');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}