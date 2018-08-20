import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';
export declare class FeedbacksMongoDbPersistence extends IdentifiableMongoDbPersistence<FeedbackV1, string> implements IFeedbacksPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
}
