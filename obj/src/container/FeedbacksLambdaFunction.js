"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const FeedbacksServiceFactory_1 = require("../build/FeedbacksServiceFactory");
class FeedbacksLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("feedbacks", "User feedbacks function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-feedbacks', 'controller', 'default', '*', '*'));
        this._factories.add(new FeedbacksServiceFactory_1.FeedbacksServiceFactory());
    }
}
exports.FeedbacksLambdaFunction = FeedbacksLambdaFunction;
exports.handler = new FeedbacksLambdaFunction().getHandler();
//# sourceMappingURL=FeedbacksLambdaFunction.js.map