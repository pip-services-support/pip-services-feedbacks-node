import { CommandSet } from 'pip-services-commons-node';
import { IFeedbacksBusinessLogic } from './IFeedbacksBusinessLogic';
export declare class FeedbacksCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IFeedbacksBusinessLogic);
    private makeGetFeedbacksCommand();
    private makeGetFeedbackByIdCommand();
    private makeSendFeedbackCommand();
    private makeReplyFeedbackCommand();
    private makeDeleteFeedbackByIdCommand();
}
