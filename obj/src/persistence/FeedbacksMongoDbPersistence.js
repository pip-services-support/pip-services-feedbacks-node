"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const FeedbacksMongoDbSchema_1 = require("./FeedbacksMongoDbSchema");
class FeedbacksMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('feedbacks', FeedbacksMongoDbSchema_1.FeedbacksMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ title: { $regex: searchRegex } });
            searchCriteria.push({ content: { $regex: searchRegex } });
            searchCriteria.push({ reply: { $regex: searchRegex } });
            searchCriteria.push({ 'sender.name': { $regex: searchRegex } });
            searchCriteria.push({ 'sender.email': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let category = filter.getAsNullableString('category');
        if (category != null)
            criteria.push({ category: category });
        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        let senderId = filter.getAsNullableInteger('sender_id');
        if (senderId != null)
            criteria.push({ 'sender.id': senderId });
        let senderEmail = filter.getAsNullableInteger('sender_email');
        if (senderEmail != null)
            criteria.push({ 'sender.email': senderEmail });
        let replierId = filter.getAsNullableInteger('replier_id');
        if (replierId != null)
            criteria.push({ 'replier.id': replierId });
        let replied = filter.getAsNullableBoolean('replied');
        if (replied != null)
            criteria.push({ 'reply_time': { $exists: replied } });
        let sentFromTime = filter.getAsNullableDateTime('sent_from_time');
        if (sentFromTime != null)
            criteria.push({ sent_time: { $gte: sentFromTime } });
        let sentToTime = filter.getAsNullableDateTime('sent_to_time');
        if (sentToTime != null)
            criteria.push({ sent_time: { $lt: sentToTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-time', null, callback);
    }
    send(correlationId, item, user, callback) {
        item.sender = user;
        item.sent_time = new Date();
        super.create(correlationId, item, callback);
    }
    reply(correlationId, id, reply, user, callback) {
        let data = pip_services_commons_node_2.AnyValueMap.fromTuples('reply_time', new Date(), 'reply', reply, 'replier', user);
        super.updatePartially(correlationId, id, data, callback);
    }
}
exports.FeedbacksMongoDbPersistence = FeedbacksMongoDbPersistence;
//# sourceMappingURL=FeedbacksMongoDbPersistence.js.map