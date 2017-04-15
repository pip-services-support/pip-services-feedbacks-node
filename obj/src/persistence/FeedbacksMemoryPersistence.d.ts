import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';
export declare class FeedbacksMemoryPersistence extends IdentifiableMemoryPersistence<FeedbackV1, string> implements IFeedbacksPersistence {
    constructor();
    private matchString(value, search);
    private matchSearch(item, search);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<FeedbackV1>) => void): void;
}
