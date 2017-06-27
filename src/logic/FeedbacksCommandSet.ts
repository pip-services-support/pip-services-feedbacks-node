import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { PartyReferenceV1Schema } from '../data/version1/PartyReferenceV1Schema';
import { FeedbackV1Schema } from '../data/version1/FeedbackV1Schema';
import { IFeedbacksController } from './IFeedbacksController';

export class FeedbacksCommandSet extends CommandSet {
    private _logic: IFeedbacksController;

	constructor(logic: IFeedbacksController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetFeedbacksCommand());
		this.addCommand(this.makeGetFeedbackByIdCommand());
		this.addCommand(this.makeSendFeedbackCommand());
		this.addCommand(this.makeReplyFeedbackCommand());
		this.addCommand(this.makeDeleteFeedbackByIdCommand());
	}

	private makeGetFeedbacksCommand(): ICommand {
		return new Command(
			"get_feedbacks",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getFeedbacks(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetFeedbackByIdCommand(): ICommand {
		return new Command(
			"get_feedback_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('feedback_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let feedbackId = args.getAsNullableString("feedback_id");
				this._logic.getFeedbackById(correlationId, feedbackId, callback);
			}
		);
	}

	private makeSendFeedbackCommand(): ICommand {
		return new Command(
			"send_feedback",
			new ObjectSchema(true)
				.withRequiredProperty('feedback', new FeedbackV1Schema())
				.withOptionalProperty('user', new PartyReferenceV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let feedback = args.get("feedback");
				let user = args.get("user");
				this._logic.sendFeedback(correlationId, feedback, user, callback);
			}
		);
	}

	private makeReplyFeedbackCommand(): ICommand {
		return new Command(
			"reply_feedback",
			new ObjectSchema(true)
				.withRequiredProperty('feedback_id', TypeCode.String)
				.withRequiredProperty('reply', TypeCode.String)
				.withRequiredProperty('user', new PartyReferenceV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let feedbackId = args.getAsNullableString("feedback_id");
				let reply = args.getAsNullableString("reply");
				let user = args.get("user");
				this._logic.replyFeedback(correlationId, feedbackId, reply, user, callback);
			}
		);
	}

	private makeDeleteFeedbackByIdCommand(): ICommand {
		return new Command(
			"delete_feedback_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('feedback_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let feedbackId = args.getAsNullableString("feedback_id");
				this._logic.deleteFeedbackById(correlationId, feedbackId, callback);
			}
		);
	}

}