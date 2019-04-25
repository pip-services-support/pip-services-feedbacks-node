let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../src/data/version1/FeedbackV1';
import { FeedbacksMemoryPersistence } from '../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../../src/logic/FeedbacksController';
import { FeedbacksLambdaFunction } from '../../src/container/FeedbacksLambdaFunction';

let FEEDBACK = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
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

suite('FeedbacksLambdaFunction', ()=> {
    let lambda: FeedbacksLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-feedbacks:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-feedbacks:controller:default:default:1.0'
        );

        lambda = new FeedbacksLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let feedback1, feedback2;

        async.series([
        // Send one feedback
            (callback) => {
                lambda.act(
                    {
                        role: 'feedbacks',
                        cmd: 'send_feedback',
                        feedback: FEEDBACK,
                        user: USER1
                    },
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK.category);
                        assert.equal(feedback.content, FEEDBACK.content);
                        assert.equal(feedback.sender.id, USER1.id);
                        assert.equal(feedback.sender.name, USER1.name);
                        assert.isDefined(feedback.sent_time);
                        assert.isUndefined(feedback.reply_time);

                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Send another feedback
            (callback) => {
                lambda.act(
                    {
                        role: 'feedbacks',
                        cmd: 'send_feedback',
                        feedback: FEEDBACK,
                        user: null //USER2
                    },
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK.category);
                        assert.equal(feedback.content, FEEDBACK.content);
                        // assert.equal(feedback.sender.id, USER2.id);
                        // assert.equal(feedback.sender.name, USER2.name);
                        assert.isDefined(feedback.sent_time);
                        assert.isUndefined(feedback.reply_time);

                        feedback2 = feedback;

                        callback();
                    }
                );
            },
        // Get all feedbacks
            (callback) => {
                lambda.act(
                    {
                        role: 'feedbacks',
                        cmd: 'get_feedbacks' 
                    },
                    (err, feedbacks) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedbacks);
                        assert.lengthOf(feedbacks.data, 2);

                        callback();
                    }
                );
            },
        // Reply the feedback
            (callback) => {
                lambda.act(
                    {
                        role: 'feedbacks',
                        cmd: 'reply_feedback',
                        feedback_id: feedback1.id,
                        reply: 'This is a reply',
                        user: USER2
                    },
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.reply, 'This is a reply');
                        assert.equal(feedback.replier.id, USER2.id);
                        assert.equal(feedback.replier.name, USER2.name);
                        assert.isDefined(feedback.reply_time);

                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Delete feedback
            (callback) => {
                lambda.act(
                    {
                        role: 'feedbacks',
                        cmd: 'delete_feedback_by_id',
                        feedback_id: feedback1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete feedback
            (callback) => {
                lambda.act(
                    {
                        role: 'feedbacks',
                        cmd: 'get_feedback_by_id',
                        feedback_id: feedback1.id
                    },
                    (err, feedback) => {
                        assert.isNull(err);
                        
                        assert.isNull(feedback || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});