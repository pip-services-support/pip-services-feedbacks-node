let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksPersistence } from '../persistence/IFeedbacksPersistence';
import { IFeedbacksController } from './IFeedbacksController';
import { FeedbacksCommandSet } from './FeedbacksCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class FeedbacksController implements IConfigurable, IReferenceable, ICommandable, IFeedbacksController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-feedbacks:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(FeedbacksController._defaultConfig);
    private _persistence: IFeedbacksPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: FeedbacksCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IFeedbacksPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new FeedbacksCommandSet(this);
        return this._commandSet;
    }

    public getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<FeedbackV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getFeedbackById(correlationId: string, feedbackId: string,
        callback: (err: any, item: FeedbackV1) => void): void {
        this._persistence.getOneById(correlationId, feedbackId, callback);
    }

    public sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let newFeedback: FeedbackV1 = null;

        feedback.sender = user;
        feedback.sent_time = new Date();

        async.series([
            (callback) => {
                this._persistence.create(correlationId, feedback, (err, data) => {
                    newFeedback = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newFeedback, callback);
            }
        ], (err) => {
            callback(err, newFeedback);
        });
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1,
        callback: (err: any, feedback: FeedbackV1) => void): void {

        let data: AnyValueMap = AnyValueMap.fromTuples(
            'reply_time', new Date(),
            'reply', reply,
            'replier', user
        );

        this._persistence.updatePartially(correlationId, feedbackId, data, callback);
    }

    public deleteFeedbackById(correlationId: string, feedbackId: string,
        callback: (err: any, feedback: FeedbackV1) => void): void {
        let oldFeedback: FeedbackV1 = null;

        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, feedbackId, (err, data) => {
                    oldFeedback = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldFeedback, callback);
            }
        ], (err) => {
            callback(err, oldFeedback);
        });
    }

}
