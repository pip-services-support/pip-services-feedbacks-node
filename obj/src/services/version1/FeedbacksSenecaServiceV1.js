"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class FeedbacksSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('feedbacks');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}
exports.FeedbacksSenecaServiceV1 = FeedbacksSenecaServiceV1;
//# sourceMappingURL=FeedbacksSenecaServiceV1.js.map