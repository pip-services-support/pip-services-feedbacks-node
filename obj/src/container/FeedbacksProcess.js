"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const FeedbacksFactory_1 = require("../build/FeedbacksFactory");
class FeedbacksProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksFactory_1.FeedbacksFactory);
    }
}
exports.FeedbacksProcess = FeedbacksProcess;
//# sourceMappingURL=FeedbacksProcess.js.map