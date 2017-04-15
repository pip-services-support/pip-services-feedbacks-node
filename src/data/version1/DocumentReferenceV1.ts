import { IStringIdentifiable } from 'pip-services-commons-node';

export class DocumentReferenceV1 implements IStringIdentifiable {

    public constructor(id: string, name?: string) {
        this.id = id;
        this.name = name;
    }

    public id: string;
    public name?: string;
}
