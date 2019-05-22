import { CommandSet } from 'pip-services3-commons-node';
import { IFeedbacksController } from './IFeedbacksController';
export declare class FeedbacksCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IFeedbacksController);
    private makeGetFeedbacksCommand;
    private makeGetFeedbackByIdCommand;
    private makeSendFeedbackCommand;
    private makeReplyFeedbackCommand;
    private makeDeleteFeedbackByIdCommand;
}
