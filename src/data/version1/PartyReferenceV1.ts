import { IStringIdentifiable } from 'pip-services-commons-node';

export class PartyReferenceV1 implements IStringIdentifiable {

    public constructor(id: string, name?: string, email?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public id: string;
    public name?: string;
    public email?: string;
}
