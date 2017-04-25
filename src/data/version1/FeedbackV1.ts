import { IStringIdentifiable } from 'pip-services-commons-node';

import { PartyReferenceV1 } from './PartyReferenceV1';
import { AttachmentV1 } from './AttachmentV1';

export class FeedbackV1 implements IStringIdentifiable {

    public constructor(id: string, category: string, app?: string,
        sender?: PartyReferenceV1, title?: string, content?: string) {
        this.id = id;
        this.category = category;
        this.app = app;
        this.sender = sender;
        this.title = title;
        this.content = content;

        this.pics = [];
        this.docs = [];
        this.sent_time = new Date();
    }

    /* Identification */
    public id: string;
    public category: string;
    public app?: string;

    /* Generic request properties */
    public sender: PartyReferenceV1;
    public sent_time: Date;

    /* Common properties */
    public title?: string;
    public content?: string;
    public pics: AttachmentV1[];
    public docs: AttachmentV1[];

    /* Copyright/Trademark Violation */
    public company_name?: string;
    public company_addr?: string;
    public copyright_holder?: string;
    public original_loc?: string;
    public copyrighted_work?: string;
    public unauth_loc?: string;

    /* Generic reply properties */
    public reply_time?: Date;
    public replier?: PartyReferenceV1;
    public reply?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}
