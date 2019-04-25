import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { FeedbacksServiceFactory } from '../build/FeedbacksServiceFactory';

export class FeedbacksLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("feedbacks", "User feedbacks function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '*'));
        this._factories.add(new FeedbacksServiceFactory());
    }
}

export const handler = new FeedbacksLambdaFunction().getHandler();