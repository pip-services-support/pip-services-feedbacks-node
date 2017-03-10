let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IFeedbacksPersistence } from '../../src/persistence/IFeedbacksPersistence';

let FEEDBACK = {
    // sender_id: '1',
    // sender_email: 'test@digitallivingsoftware.com',
    // sender_name: 'Test User',
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
let USER1 = {
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
let USER2 = {
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};

export class FeedbacksPersistenceFixture {
    private _db: IFeedbacksPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    testSendFeedback(done) {
        let feedback1;
        
        async.series([
        // Request a Feedback
            (callback) => {
                this._db.sendFeedback(
                    null,
                    FEEDBACK,
                    USER1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK.category);
                        assert.equal(feedback.title, FEEDBACK.title);
                        assert.equal(feedback.content, FEEDBACK.content);
                        assert.equal(feedback.sender.id, USER1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.isDefined(feedback.sent);
                        assert.isUndefined(feedback.replied);
                        
                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Check that feedback was written
            (callback) => {
                this._db.getFeedbackById(
                    null,
                    feedback1.id,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK.category);
                        assert.equal(feedback.title, FEEDBACK.title);
                        assert.equal(feedback.content, FEEDBACK.content);
                        assert.equal(feedback.sender.id, USER1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.isDefined(feedback.sent);
                        assert.isUndefined(feedback.replied);

                        callback();
                    });
            }
        ], done);
    }

    testReplyFeedback(done) {
        let feedback1;
        
        async.series([
        // Request a Feedback
            (callback) => {
                this._db.sendFeedback(
                    null,
                    FEEDBACK, 
                    USER1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Reply a Feedback
            (callback) => {
                this._db.replyFeedback(
                    null,
                    feedback1.id, 
                    'This is a test reply',
                    USER2,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.reply, 'This is a test reply')
                        assert.isDefined(feedback.replied);

                        feedback1 = feedback;

                        callback(null, feedback);
                    }
                );
            },
        // Check that reply was written
            (callback) => {
                this._db.getFeedbackById(
                    null,
                    feedback1.id,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.equal(feedback.category, FEEDBACK.category);

                        assert.isDefined(feedback.replied);
                        assert.equal(feedback.replier.id, USER2.id);
                        assert.equal(feedback.replier.name, USER2.name);
                        assert.equal(feedback.replier.email, USER2.email);
                        assert.equal(feedback.reply, 'This is a test reply');

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetFeedback(done) {
        let feedback1;
        
        async.series([
        // Request a Feedback
            (callback) => {
                this._db.sendFeedback(
                    null,
                    FEEDBACK,
                    USER1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback1 = feedback;
                        
                        callback();
                    }
                );
            },
        // Get a Feedback
            (callback) => {
                this._db.getFeedbackById(
                    null,
                    feedback1.id, 
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.id, feedback1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.equal(feedback.category, FEEDBACK.category);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetMultipleFeedbacks(done) {
        let feedback1, feedback2, feedback3;
        
        async.series([
        // Send feedback #1
            (callback) => {
                this._db.sendFeedback(
                    null,
                    FEEDBACK,
                    USER1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback1 = feedback;
                        
                        callback();
                    }
                );
            },
        // Send feedback #2
            (callback) => {
                this._db.sendFeedback(
                    null,
                    FEEDBACK,
                    USER1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback2 = feedback;
                        
                        callback();
                    }
                );
            },
        // Send feedback #3
            (callback) => {
                this._db.sendFeedback(
                    null,
                    FEEDBACK,
                    USER2,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback3 = feedback;
                        
                        callback();
                    }
                );
            },
        // Reply a feedback
            (callback) => {
                this._db.replyFeedback(
                    null,
                    feedback1.id,
                    'This is a reply',
                    USER2, 
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback1 = feedback;
                        
                        callback();
                    }
                );
            },
        // Get feedback
            (callback) => {
                this._db.getFeedbacks(
                    null,
                    FilterParams.fromValue({ replied: false }),
                    new PagingParams(), 
                    (err, feedbacks) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedbacks);
                        assert.lengthOf(feedbacks.data, 2);

                        let feedback = feedbacks.data[0];
                        assert.isUndefined(feedback.replied);
                        assert.equal(feedback.category, FEEDBACK.category);

                        callback(null);
                    }
                );
            }
        ], done);
    }

    testDeleteFeedback(done) {
        let feedback1;
        
        async.series([
        // Request feedback
            (callback) => {
                 this._db.sendFeedback(
                     null,
                     FEEDBACK,
                     USER1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        feedback1 = feedback;
                        
                        callback();
                    }
                );
           },
        // Get feedback
            (callback) => {
                this._db.getFeedbackById(
                    null,
                    feedback1.id, 
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);

                        callback();
                    }
                );
            },
        // Delete feedback
            (callback) => {
                this._db.deleteFeedback(
                    null,
                    feedback1.id, 
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get nothing
            (callback) => {
                this._db.getFeedbackById(
                    null,
                    feedback1.id, 
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isNull(feedback || null);

                        callback();
                    }
                );
            },
        ], done);
    }

}
