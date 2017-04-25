"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const PartyReferenceV1Schema_1 = require("./PartyReferenceV1Schema");
const AttachmentV1Schema_1 = require("./AttachmentV1Schema");
class FeedbackV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('category', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('app', pip_services_commons_node_3.TypeCode.String);
        /* Generic request properties */
        this.withOptionalProperty('sender', new PartyReferenceV1Schema_1.PartyReferenceV1Schema());
        this.withOptionalProperty('sent_time', null); //TypeCode.DateTime);
        /* Common properties */
        this.withOptionalProperty('title', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('content', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('pics', new pip_services_commons_node_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        this.withOptionalProperty('docs', new pip_services_commons_node_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        /* Copyright/Trademark Violation */
        this.withOptionalProperty('company_name', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('company_addr', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('copyright_holder', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('original_loc', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('copyrighted_work', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('unauth_loc', pip_services_commons_node_3.TypeCode.String);
        /* Generic reply properties */
        this.withOptionalProperty('replier', new PartyReferenceV1Schema_1.PartyReferenceV1Schema());
        this.withOptionalProperty('reply', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('reply_time', null); //TypeCode.DateTime);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.FeedbackV1Schema = FeedbackV1Schema;
//# sourceMappingURL=FeedbackV1Schema.js.map