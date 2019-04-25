let _ = require
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { AnyValueMap } from 'pip-services3-commons-node';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../src/data/version1/FeedbackV1';
import { IFeedbacksPersistence } from '../../src/persistence/IFeedbacksPersistence';

let USER1 = <PartyReferenceV1>{
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
let USER2 = <PartyReferenceV1>{
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};
let FEEDBACK1 = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test',
    sent_time: new Date(),
    sender: USER1
};
let FEEDBACK2 = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test',
    sent_time: new Date(),
    sender: USER2
};

export class FeedbacksPersistenceFixture {
    private _persistence: IFeedbacksPersistence;
    
    constructor(persistence: IFeedbacksPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public testSendFeedback(done) {
        let feedback1;
        
        async.series([
        // Request a Feedback
            (callback) => {
                this._persistence.create(
                    null,
                    FEEDBACK1,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK1.category);
                        assert.equal(feedback.title, FEEDBACK1.title);
                        assert.equal(feedback.content, FEEDBACK1.content);
                        assert.equal(feedback.sender.id, USER1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.isDefined(feedback.sent_time);
                        assert.isUndefined(feedback.reply_time);;
                        
                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Check that feedback was written
            (callback) => {
                this._persistence.getOneById(
                    null,
                    feedback1.id,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK1.category);
                        assert.equal(feedback.title, FEEDBACK1.title);
                        assert.equal(feedback.content, FEEDBACK1.content);
                        assert.equal(feedback.sender.id, USER1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.isDefined(feedback.sent_time);
                        assert.isUndefined(feedback.reply_time);

                        callback();
                    });
            }
        ], done);
    }

    public testReplyFeedback(done) {
        let feedback1;
        
        async.series([
        // Request a Feedback
            (callback) => {
                this._persistence.create(
                    null,
                    FEEDBACK1, 
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
                this._persistence.updatePartially(
                    null,
                    feedback1.id,
                    AnyValueMap.fromTuples(
                        'reply', 'This is a test reply',
                        'replier', USER2,
                        'reply_time', new Date()
                    ),
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.reply, 'This is a test reply')
                        assert.isDefined(feedback.reply_time);

                        feedback1 = feedback;

                        callback(null, feedback);
                    }
                );
            },
        // Check that reply was written
            (callback) => {
                this._persistence.getOneById(
                    null,
                    feedback1.id,
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.equal(feedback.category, FEEDBACK1.category);

                        assert.isDefined(feedback.reply_time);
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

    public testGetFeedback(done) {
        let feedback1;
        
        async.series([
        // Request a Feedback
            (callback) => {
                this._persistence.create(
                    null,
                    FEEDBACK1,
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
                this._persistence.getOneById(
                    null,
                    feedback1.id, 
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.id, feedback1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.equal(feedback.sender.email, USER1.email);
                        assert.equal(feedback.category, FEEDBACK1.category);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetMultipleFeedbacks(done) {
        let feedback1, feedback2, feedback3;
        
        async.series([
        // Send feedback #1
            (callback) => {
                this._persistence.create(
                    null,
                    FEEDBACK1,
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
                this._persistence.create(
                    null,
                    FEEDBACK1,
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
                this._persistence.create(
                    null,
                    FEEDBACK2,
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
                this._persistence.updatePartially(
                    null,
                    feedback1.id,
                    AnyValueMap.fromTuples(
                        'reply', 'This is a reply',
                        'replier', USER2,
                        'reply_time', new Date()
                    ), 
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
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({ replied: false }),
                    new PagingParams(), 
                    (err, feedbacks) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedbacks);
                        assert.lengthOf(feedbacks.data, 2);

                        let feedback = feedbacks.data[0];
                        assert.isUndefined(feedback.reply_time);
                        assert.equal(feedback.category, FEEDBACK1.category);

                        callback(null);
                    }
                );
            }
        ], done);
    }

    public testDeleteFeedback(done) {
        let feedback1;
        
        async.series([
        // Request feedback
            (callback) => {
                 this._persistence.create(
                     null,
                     FEEDBACK1,
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
                this._persistence.getOneById(
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
                this._persistence.deleteById(
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
                this._persistence.getOneById(
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
