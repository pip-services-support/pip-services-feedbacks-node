"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(feedback) {
        let ids = [];
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
    addAttachments(correlationId, feedback, callback) {
        if (this._attachmentsClient == null || feedback == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(feedback);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(feedback.id, 'feedback');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, feedback, callback) {
        if (this._attachmentsClient == null || feedback == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(feedback);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(feedback.id, 'feedback');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map