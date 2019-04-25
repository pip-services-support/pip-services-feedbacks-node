"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
const FeedbacksServiceFactory_1 = require("../build/FeedbacksServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class FeedbacksProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksServiceFactory_1.FeedbacksServiceFactory);
        this._factories.add(new pip_clients_attachments_node_1.AttachmentsClientFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.FeedbacksProcess = FeedbacksProcess;
//# sourceMappingURL=FeedbacksProcess.js.map