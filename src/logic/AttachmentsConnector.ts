let _ = require('lodash');

import { ReferenceV1 } from 'pip-clients-attachments-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { FeedbackV1 } from '../data/version1/FeedbackV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(feedback: FeedbackV1): string[] {
        let ids: string[] = [];

        _.each(feedback.pics, (pic) => {
            if (pic.id)
                ids.push(pic.id);
        });

        _.each(feedback.docs, (doc) => {
            if (doc.id)
                ids.push(doc.id);
        });

        return ids;
    }

    public addAttachments(correlationId: string, feedback: FeedbackV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || feedback == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(feedback);
        let reference = new ReferenceV1(feedback.id, 'feedback');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

    public removeAttachments(correlationId: string, feedback: FeedbackV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || feedback == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(feedback);
        let reference = new ReferenceV1(feedback.id, 'feedback');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

}