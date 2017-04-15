import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
export interface IFeedbacksPersistence extends IGetter<FeedbackV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<FeedbackV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: FeedbackV1) => void): void;
    create(correlationId: string, item: FeedbackV1, callback: (err: any, item: FeedbackV1) => void): void;
    updatePartially(correlationId: string, id: string, data: AnyValueMap, callback: (err: any, item: FeedbackV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: FeedbackV1) => void): void;
}