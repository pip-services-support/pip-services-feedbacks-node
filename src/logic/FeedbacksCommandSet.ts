import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IFeedbacksBusinessLogic } from './IFeedbacksBusinessLogic';

export class FeedbacksCommandSet extends CommandSet {
    private _logic: IFeedbacksBusinessLogic;

    constructor(logic: IFeedbacksBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetFeedbacksCommand());
		this.addCommand(this.makeGetFeedbackByIdCommand());
		this.addCommand(this.makeSendFeedbackCommand());
		this.addCommand(this.makeReplyFeedbackCommand());
		this.addCommand(this.makeDeleteFeedbackCommand());
    }

	private makeGetFeedbacksCommand(): ICommand {
		return new Command(
			this._logic,
			"get_feedbacks",
			new Schema()
				.withOptionalProperty("filter", "FilterParams")
				.withOptionalProperty("paging", "PagingParams")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getFeedbacks(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetFeedbackByIdCommand(): ICommand {
		return new Command(
			this._logic,
			"get_feedback_by_id",
			new Schema()
				.withProperty("feedback_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let feedbackId = args.getNullableString("feedback_id");
                this._logic.getFeedbackById(correlationId, feedbackId, callback);
            }
		);
	}

	private makeSendFeedbackCommand(): ICommand {
		return new Command(
			this._logic,
			"send_feedback",
			new Schema()
				.withProperty("feedback", "any")
                .withProperty("user", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let feedback = args.get("feedback");
                let user = args.get("user");
                this._logic.sendFeedback(correlationId, feedback, user, callback);
            }
		);
	}

	private makeReplyFeedbackCommand(): ICommand {
		return new Command(
			this._logic,
			"reply_feedback",
			new Schema()
				.withProperty("feedback_id", "string")
				.withProperty("reply", "string")
                .withProperty("user", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let feedbackId = args.getNullableString("feedback_id");
                let reply = args.getNullableString("reply");
                let user = args.get("user");
                this._logic.replyFeedback(correlationId, feedbackId, reply, user, callback);
            }
		);
	}
	
	private makeDeleteFeedbackCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_feedback",
			new Schema()
				.withProperty("feedback_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let feedbackId = args.getNullableString("feedback_id");
                this._logic.deleteFeedback(correlationId, feedbackId, callback);
			}
		);
	}

}