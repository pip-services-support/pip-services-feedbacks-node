import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class FeedbacksHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('feedbacks');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}