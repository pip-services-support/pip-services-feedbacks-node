let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { NotFoundException } from 'pip-services-commons-node';

import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';

export class FeedbacksMemoryPersistence 
    extends IdentifiableMemoryPersistence<FeedbackV1, string> 
    implements IFeedbacksPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: FeedbackV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.title, search))
            return true;
        if (this.matchString(item.content, search))
            return true;
        if (this.matchString(item.reply, search))
            return true;
        if (item.sender && this.matchString(item.sender.name, search))
            return true;
        if (item.sender && this.matchString(item.sender.email, search))
            return true;
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let category = filter.getAsNullableString('category');
        let app = filter.getAsNullableString('app');
        let senderId = filter.getAsNullableString('sender_id');
        let senderEmail = filter.getAsNullableString('sender_email');
        let replierId = filter.getAsNullableString('replier_id');
        let fromSentTime = filter.getAsNullableDateTime('from_sent_time');
        let toSentTime = filter.getAsNullableDateTime('to_sent_time');
        let replied = filter.getAsNullableBoolean('replied');

        return (item: FeedbackV1) => {
            if (id != null && id != item.id)
                return false;
            if (category != null && category != item.category)
                return false;
            if (app != null && app != item.app)
                return false;
            if (senderId != null && item.sender && senderId != item.sender.id)
                return false;
            if (senderEmail != null && item.sender && senderEmail != item.sender.email)
                return false;
            if (replierId != null && item.replier && replierId != item.replier.id)
                return false;
            if (replied != null) {
                if (replied && item.reply_time == null)
                    return false;
                if (!replied && item.reply_time != null)
                    return false;
            }
            if (fromSentTime != null && item.sent_time >= fromSentTime)
                return false;
            if (toSentTime != null && item.sent_time < toSentTime)
                return false;
            if (search != null && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<FeedbackV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
