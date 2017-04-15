import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class PartyReferenceV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);
        this.withOptionalProperty('email', TypeCode.String);
    }
}