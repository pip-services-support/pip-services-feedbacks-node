import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IBusinessLogic } from 'pip-services-runtime-node';

export interface IFeedbacksBusinessLogic extends IBusinessLogic {
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getFeedbackById(correlationId: string, feedbackId: string, callback: any): void;
    sendFeedback(correlationId: string, feedback: any, user: any, callback: any): void;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback: any): void;
    deleteFeedback(correlationId: string, feedbackId: string, callback: any): void;
}
