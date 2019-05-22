import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, feedback: FeedbackV1, callback: (err: any) => void): void;
    removeAttachments(correlationId: string, feedback: FeedbackV1, callback: (err: any) => void): void;
}
