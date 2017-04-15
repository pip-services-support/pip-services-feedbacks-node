import { IStringIdentifiable } from 'pip-services-commons-node';
import { PartyReferenceV1 } from './PartyReferenceV1';
import { DocumentReferenceV1 } from './DocumentReferenceV1';
export declare class FeedbackV1 implements IStringIdentifiable {
    constructor(id: string, category: string, app?: string, sender?: PartyReferenceV1, title?: string, content?: string);
    id: string;
    category: string;
    app?: string;
    sender: PartyReferenceV1;
    sent_time: Date;
    title?: string;
    content?: string;
    pic_ids: string[];
    docs: DocumentReferenceV1[];
    company_name?: string;
    company_addr?: string;
    copyright_holder?: string;
    original_loc?: string;
    copyrighted_work?: string;
    unauth_loc?: string;
    reply_time?: Date;
    replier?: PartyReferenceV1;
    reply?: string;
    custom_hdr?: any;
    custom_dat?: any;
}
