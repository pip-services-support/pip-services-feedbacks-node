import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { FeedbacksFactory } from '../build/FeedbacksFactory';

export class FeedbacksLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("feedbacks", "User feedbacks function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '*'));
        this._factories.add(new FeedbacksFactory());
    }
}

export const handler = new FeedbacksLambdaFunction().getHandler();