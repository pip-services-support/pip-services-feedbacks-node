import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class PartyReferenceV1 implements IStringIdentifiable {
    constructor(id: string, name?: string, email?: string);
    id: string;
    name?: string;
    email?: string;
}
