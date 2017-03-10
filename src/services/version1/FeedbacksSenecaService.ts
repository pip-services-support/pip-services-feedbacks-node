let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IFeedbacksBusinessLogic } from '../../logic/IFeedbacksBusinessLogic';

export class FeedbacksSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the FeedbacksSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-feedbacks", "seneca", "1.0"
	);

    private _logic: IFeedbacksBusinessLogic;

    constructor() {
        super(FeedbacksSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IFeedbacksBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-feedbacks", "*", "*")
		);

		super.link(components);		

        this.registerCommands('feedbacks', this._logic.getCommands());
	}

}
