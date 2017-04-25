import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { PartyReferenceV1Schema } from './PartyReferenceV1Schema';
import { AttachmentV1Schema } from './AttachmentV1Schema';

export class FeedbackV1Schema extends ObjectSchema {
    public constructor() {
        super();
    
        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('category', TypeCode.String);
        this.withOptionalProperty('app', TypeCode.String);

        /* Generic request properties */
        this.withOptionalProperty('sender', new PartyReferenceV1Schema());
        this.withOptionalProperty('sent_time', null); //TypeCode.DateTime);

        /* Common properties */
        this.withOptionalProperty('title', TypeCode.String);
        this.withOptionalProperty('content', TypeCode.String);
        this.withOptionalProperty('pics', new ArraySchema(new AttachmentV1Schema()));
        this.withOptionalProperty('docs', new ArraySchema(new AttachmentV1Schema()));

        /* Copyright/Trademark Violation */
        this.withOptionalProperty('company_name', TypeCode.String);
        this.withOptionalProperty('company_addr', TypeCode.String);
        this.withOptionalProperty('copyright_holder', TypeCode.String);
        this.withOptionalProperty('original_loc', TypeCode.String);
        this.withOptionalProperty('copyrighted_work', TypeCode.String);
        this.withOptionalProperty('unauth_loc', TypeCode.String);

        /* Generic reply properties */
        this.withOptionalProperty('replier', new PartyReferenceV1Schema());
        this.withOptionalProperty('reply', TypeCode.String);
        this.withOptionalProperty('reply_time', null); //TypeCode.DateTime);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}