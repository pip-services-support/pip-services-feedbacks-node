let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';
import { NotFoundError } from 'pip-services-runtime-node';
import { Version1 as StorageV1 } from 'pip-clients-storage-node';

import { IFeedbacksPersistence } from './IFeedbacksPersistence';
import { FeedbacksDataConverter } from './FeedbacksDataConverter';

export class FeedbacksFilePersistence extends FilePersistence implements IFeedbacksPersistence {    
	/**
	 * Unique descriptor for the FeedbacksFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-feedbacks", "file", "*"
	);
    
    private _storage: StorageV1.IStorageClient;
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || FeedbacksFilePersistence.Descriptor);
    }

    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._storage = <StorageV1.IStorageClient>components.getOneRequired(
        	new ComponentDescriptor(Category.Clients, "pip-services-storage", '*', '*')
    	);
        
        super.link(components);
    }
        
    private getFeedbackFilter(filter: any) {
        let category = filter.category;
        let app = filter.app;
        let sender_id = filter.sender_id;
        let sender_email = filter.sender_email;
        let replier_id = filter.replier_id;
        let from = Converter.toDate(filter.from);
        let to = Converter.toDate(filter.to);
        let search = filter.search;
        let searchRegex = search ? new RegExp(search, 'i') : null;
        let replied = filter.replied;
        
        replied = replied != null ? Converter.toBoolean(replied) : null;
        
        return (item) => {
            if (category && item.category != category) 
                return false;
            if (app && item.app != app) 
                return false;
            if (sender_id && (item.sender == null || item.sender.id != sender_id)) 
                return false;
            if (sender_email && (item.sender == null || item.sender.email != sender_email)) 
                return false;
            if (replier_id && (item.replier == null || item.replier.id != replier_id)) 
                return false;
            if (from && item.from < from)
                return false;
            if (to && item.to >= to)
                return false;
            if (replied == true && item.replied == null)  
                return false;
            if (replied == false && item.replied != null)  
                return false;
            // Todo: This will not work for multi-language text
            if (searchRegex) {
                if (!searchRegex.test(item.title))
                    return false;
                if (!searchRegex.test(item.content))
                    return false;
                if (!searchRegex.test(item.sender_name))
                    return false;
            }
            return true; 
        };
    }
    
    public getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterParams = <any>filter || {};
        let filterFunc = this.getFeedbackFilter(filterParams);
        this.getPage(filterFunc, paging, null, null, callback);
    }

    public getFeedbackById(correlationId: string, feedbackId: string, callback: any) {
        this.getById(feedbackId, callback);
    }

    public sendFeedback(correlationId: string, feedback: any, user: any, callback: any) {
        let item = FeedbacksDataConverter.validate(feedback);
        item = _.omit(item, 'replied', 'replier', 'reply');

        item.id = item.id || this.createUuid();
        item.sent = new Date();
        if (user) item.sender = _.pick(user, 'id', 'name', 'email');
                    
        async.series([
        // Create feedback
            (callback) => {
                this.create(item, callback);
            },
        // Add file references
            (callback) => {
                this._storage.addBlockRefs(
                    correlationId,
                    FeedbacksDataConverter.getBlockIds(item),
                    {
                        type: 'feedback',
                        id: item.id,
                        name: item.title
                    },  
                    callback  
                );
            }
        ], (err) => {
            callback(err, item);
        });
    }

    public replyFeedback(correlationId: string, feedbackId: string, reply: string, user: any, callback) {
        this.getById(
            feedbackId,
            (err, item) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (item == null) {
                    callback(
                        new NotFoundError(
                            this,
                            'FeedbackNotFound',
                            'Feedback ' + feedbackId + ' was not found'
                        )
                        .withCorrelationId(correlationId)
                        .withDetails(feedbackId)
                    );
                    return;
                }

                // Todo: Send email back to sender
                item.replied = new Date();
                if (user) item.replier = _.pick(user, 'id', 'name', 'email');
                item.reply = reply;
                
                this.save((err) => {
                    callback(err, item);
                });
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
                        id: item.id
                    },
                    callback
                );
            }
        ], (err) => {
            callback(err, item);
        });
    }
}
