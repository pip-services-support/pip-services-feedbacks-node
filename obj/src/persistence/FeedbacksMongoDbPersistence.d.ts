import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';
export declare class FeedbacksMongoDbPersistence extends IdentifiableMongoDbPersistence<FeedbackV1, string> implements IFeedbacksPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    send(correlationId: string, item: FeedbackV1, user: PartyReferenceV1, callback: (err: any, item: FeedbackV1) => void): void;
    reply(correlationId: string, id: string, reply: string, user: PartyReferenceV1, callback: (err: any, item: FeedbackV1) => void): void;
}
