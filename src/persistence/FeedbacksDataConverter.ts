let _ = require('lodash');

import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';

export class FeedbacksDataConverter {
    
    public static validate(item): any {
        return _.pick(item, 'id', 'category', 'app', 'sender',
            'sent', 'title', 'content', 'pic_ids', 'docs', 
            'company_name', 'company_addr', 'copyright_holder', 
            'original_loc', 'unauth_loc',
            'replied', 'replier', 'reply', 'custom_hdr', 'custom_dat'
        );
    }

    // Extracts block ids from feedback from pic_ids and docs fields
    public static getBlockIds(item) {
        let blockIds = [];

        // Process pictures
        _.each(item.pic_ids, (id) => {
            blockIds.push(id);
        });

        // Process documents
        _.each(item.docs, (doc)=> {
            blockIds.push(doc.id);
        });

        return blockIds;
    }

}