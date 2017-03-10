let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';

import { IFeedbacksBusinessLogic } from '../../logic/IFeedbacksBusinessLogic';

export class FeedbacksRestService extends RestService {       
	/**
	 * Unique descriptor for the FeedbacksRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-feedbacks", "rest", "1.0"
	);
    
	private _logic: IFeedbacksBusinessLogic;

    constructor() {
        super(FeedbacksRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IFeedbacksBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-feedbacks", "*", "*")
		);

		super.link(components);		
	}    

    private getFeedbacks(req, res) {
        this._logic.getFeedbacks(
            req.params.correlation_id,
            new FilterParams(req.params),
            new PagingParams(req.params),
            this.sendResult(req, res)
        );
    }

    private getFeedbackById(req, res) {
        this._logic.getFeedbackById(
            req.params.correlation_id,
            req.params.feedbackId,
            this.sendResult(req, res)
        );
    }

    private sendFeedback(req, res) {
        this._logic.sendFeedback(
            req.params.correlation_id,
            req.body.feedback,
            req.body.user,
            this.sendCreatedResult(req, res)
        );
    }

    private replyFeedback(req, res) {
        this._logic.replyFeedback(
            req.params.correlation_id,
            req.params.feedbackId,
            req.body.reply,
            req.body.user,
            this.sendResult(req, res)
        );
    }

    private deleteFeedback(req, res) {
        this._logic.deleteFeedback(
            req.params.correlation_id,
            req.params.feedbackId,
            this.sendDeletedResult(req, res)
        );
    }    
        
    protected register() {
        this.registerRoute('get', '/feedbacks', this.getFeedbacks);
        this.registerRoute('get', '/feedbacks/:feedbackId', this.getFeedbackById);
        this.registerRoute('post', '/feedbacks', this.sendFeedback);
        this.registerRoute('put', '/feedbacks/:feedbackId', this.replyFeedback);
        this.registerRoute('delete', '/feedbacks/:feedbackId', this.deleteFeedback);
    }
}
