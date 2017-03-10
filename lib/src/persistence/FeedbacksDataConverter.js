"use strict";
var _ = require('lodash');
var FeedbacksDataConverter = (function () {
    function FeedbacksDataConverter() {
    }
    FeedbacksDataConverter.validate = function (item) {
        return _.pick(item, 'id', 'category', 'app', 'sender', 'sent', 'title', 'content', 'pic_ids', 'docs', 'company_name', 'company_addr', 'copyright_holder', 'original_loc', 'unauth_loc', 'replied', 'replier', 'reply', 'custom_hdr', 'custom_dat');
    };
    // Extracts block ids from feedback from pic_ids and docs fields
    FeedbacksDataConverter.getBlockIds = function (item) {
        var blockIds = [];
        // Process pictures
        _.each(item.pic_ids, function (id) {
            blockIds.push(id);
        });
        // Process documents
        _.each(item.docs, function (doc) {
            blockIds.push(doc.id);
        });
        return blockIds;
    };
    return FeedbacksDataConverter;
}());
exports.FeedbacksDataConverter = FeedbacksDataConverter;
