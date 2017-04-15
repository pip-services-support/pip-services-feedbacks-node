"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class DocumentReferenceV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.DocumentReferenceV1Schema = DocumentReferenceV1Schema;
//# sourceMappingURL=DocumentReferenceV1Schema.js.map