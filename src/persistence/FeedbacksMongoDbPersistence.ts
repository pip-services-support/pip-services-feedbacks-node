let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';
import { Version1 as StorageV1 } from 'pip-clients-storage-node';

import { FeedbacksDataConverter } from './FeedbacksDataConverter';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';

export class FeedbacksMongoDbPersistence extends MongoDbPersistence implements IFeedbacksPersistence {
	/**
	 * Unique descriptor for the FeedbacksMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-feedbacks", "mongodb", "*"
	);
    
    private _storage: StorageV1.IStorageClient;
    
    constructor() {
        super(FeedbacksMongoDbPersistence.Descriptor, require('./FeedbackModel'));
    }

    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._storage = <StorageV1.IStorageClient>components.getOneRequired(
        	new ComponentDescriptor(Category.Clients, "pip-services-storage", '*', '*')
    	);
        
        super.link(components);
    }

    private defineFilterCondition(filter: any): any {
        let criteria = _.pick(filter, 
            'category', 'app', 'sender_id', 'sender_email', 'replier_id'
        );

        // Decode sender id
        if (filter.sender_id)
            criteria['sender.id'] = filter.sender_id;

        // Decode sender email
        if (filter.sender_email)
            criteria['sender.email'] = filter.sender_email;

        // Decode replier id
        if (filter.replier_id)
            criteria['replier.id'] = filter.replier_id;

        // Start time interval
        if (filter.from) {
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                sent: { $gte: filter.from }
            });
        }

        // End time interval
        if (filter.to) {
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                sent: { $lt: filter.to }
            });
        }

        // Replied flag
        if (filter.replied != null) {
            criteria.replied = {
                $exists: Converter.toBoolean(filter.replied)
            };
        }

        // Full text search
        if (filter.search) {
            var search = filter.search,
                searchRegex = new RegExp(search, 'i');

            // Todo: This will not work for multi-language text
            criteria.$or = [
                { title: { $regex: searchRegex} },
                { content: { $regex: searchRegex} },
                { sender_name: { $regex: searchRegex} }
            ];
        }
                
        return criteria;
    }
        
    public getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let criteria = this.defineFilterCondition(filter);

        this.getPage(criteria, paging, '-sent', { custom_dat: 0 }, callback);
    }

    public getFeedbackById(correlationId: string, feedbackId: string, callback: any) {
        this.getById(feedbackId, callback);
    }

    public sendFeedback(correlationId: string, feedback: any, user: any, callback: any) {            
        let newItem = FeedbacksDataConverter.validate(feedback);            
        newItem = _.omit(newItem, 'replied', 'replier', 'reply');
        
        newItem._id = newItem.id || this.createUuid();
        newItem.sent = new Date();
        if (user) newItem.sender = _.pick(user, 'id', 'name', 'email');

        let item;
        
        async.series([
        // Create feedback
            (callback) => {
                this.create(newItem, (err, data) => {
                    item = data;
                    callback(err);
                });
            },
        // Add file references
            (callback) => {
                this._storage.addBlockRefs(
                    correlationId,
                    FeedbacksDataConverter.getBlockIds(item),
                    {
                        type: 'feedback',
                        id: item._id,
                        name: Converter.fromMultiString(item)
                    },  
                    callback  
                );
            }
        ], (err) => {
            callback(err, item);
        });
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback) {
        // Todo: Send email back to sender
        this._model.findByIdAndUpdate(
            feedbackId,
            {
                $set: {
                    replied: new Date(),
                    replier: _.pick(user, 'id', 'name', 'email'),
                    reply: reply
                }
            },
            { 'new': true },
            (err, item) => {
                item = this.convertItem(item);
                callback(err, item);
            }
        );
    }

    public deleteFeedback(correlationId: string, feedbackId: string, callback) {
        let item;

        async.series([
        // Remove feedback
            (callback) => {
                this.delete(
                    feedbackId,
                    (err, data) => {
                        item = data;
                        callback(err);
                    }
                );
            },
        // Remove block references
            (callback) => {
                if (item == null) {
                    callback();
                    return;
                }
                
                this._storage.removeBlockRefs(
                    correlationId,
                    FeedbacksDataConverter.getBlockIds(item),
                    {
                        type: 'feedback',
                        id: item._id
                    },
                    callback
                );
            }
        ], (err) => {
            callback(err);
        });
    }
}
