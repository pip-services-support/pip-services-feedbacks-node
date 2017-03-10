import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { FeedbacksMicroservice } from '../run/FeedbacksMicroservice';
import { IFeedbacksBusinessLogic } from '../logic/IFeedbacksBusinessLogic';

export class FeedbacksLambdaFunction extends LambdaFunction {
    private _logic: IFeedbacksBusinessLogic;

    constructor() {
        super(new FeedbacksMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IFeedbacksBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-feedbacks", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}