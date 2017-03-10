import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IFeedbacksPersistence } from '../persistence/IFeedbacksPersistence';
import { IFeedbacksBusinessLogic } from './IFeedbacksBusinessLogic';
import { FeedbacksCommandSet } from './FeedbacksCommandSet';

export class FeedbacksController extends AbstractController implements IFeedbacksBusinessLogic {
	/**
	 * Unique descriptor for the FeedbacksController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-feedbacks", "*", "*"
	);
    
	private _db: IFeedbacksPersistence;
    
    constructor() {
        super(FeedbacksController.Descriptor);
    }
    
    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._db = <IFeedbacksPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-feedbacks", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new FeedbacksCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedbacks', callback);
        this._db.getFeedbacks(correlationId, filter, paging, callback);
    }

    public getFeedbackById(correlationId: string, feedbackId: string, callback) {
        callback = this.instrument(correlationId, 'feedbacks.get_feedback_by_id', callback);
        this._db.getFeedbackById(correlationId, feedbackId, callback);        
    }

    public sendFeedback(correlationId: string, feedback: any, user: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.send_feedback', callback);
        this._db.sendFeedback(correlationId, feedback, user, callback);
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback) {
        callback = this.instrument(correlationId, 'feedbacks.reply_feedback', callback);
        this._db.replyFeedback(correlationId, feedbackId, reply, user, callback);
    }

    public deleteFeedback(correlationId: string, feedbackId: string, callback) {
        callback = this.instrument(correlationId, 'feedbacks.delete_feedback', callback);
        this._db.deleteFeedback(correlationId, feedbackId, callback);
    }
    
}
