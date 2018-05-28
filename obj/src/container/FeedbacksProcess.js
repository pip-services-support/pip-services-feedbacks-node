"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
const FeedbacksServiceFactory_1 = require("../build/FeedbacksServiceFactory");
class FeedbacksProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksServiceFactory_1.FeedbacksServiceFactory);
        this._factories.add(new pip_clients_attachments_node_1.AttachmentsClientFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.FeedbacksProcess = FeedbacksProcess;
//# sourceMappingURL=FeedbacksProcess.js.map