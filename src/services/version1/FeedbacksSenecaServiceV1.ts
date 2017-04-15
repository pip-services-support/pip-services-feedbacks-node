import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class FeedbacksSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('feedbacks');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}