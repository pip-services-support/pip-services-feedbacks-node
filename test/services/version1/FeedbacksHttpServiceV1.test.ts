let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../../src/data/version1/FeedbackV1';
import { FeedbacksMemoryPersistence } from '../../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../../../src/logic/FeedbacksController';
import { FeedbacksHttpServiceV1 } from '../../../src/services/version1/FeedbacksHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('FeedbacksHttpServiceV1', ()=> {
    let service: FeedbacksHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        service = new FeedbacksHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-feedbacks', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let feedback1, feedback2;

        async.series([
        // Send one feedback
            (callback) => {
                rest.post('/feedbacks/send_feedback',
                    {
                        feedback: FEEDBACK,
                        user: USER1
                    },
                    (err, req, res, feedback) => {
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
                rest.post('/feedbacks/send_feedback',
                    {
                        feedback: FEEDBACK,
                        user: USER2
                    },
                    (err, req, res, feedback) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedback);
                        assert.equal(feedback.category, FEEDBACK.category);
                        assert.equal(feedback.content, FEEDBACK.content);
                        assert.equal(feedback.sender.id, USER2.id);
                        assert.equal(feedback.sender.name, USER2.name);
                        assert.isDefined(feedback.sent_time);
                        assert.isUndefined(feedback.reply_time);

                        feedback2 = feedback;

                        callback();
                    }
                );
            },
        // Get all feedbacks
            (callback) => {
                rest.post('/feedbacks/get_feedbacks',
                    { },
                    (err, req, res, feedbacks) => {
                        assert.isNull(err);
                        
                        assert.isObject(feedbacks);
                        assert.lengthOf(feedbacks.data, 2);

                        callback();
                    }
                );
            },
        // Reply the feedback
            (callback) => {
                rest.post('/feedbacks/reply_feedback',
                    {
                        feedback_id: feedback1.id,
                        reply: 'This is a reply',
                        user: USER2
                    },
                    (err, req, res, feedback) => {
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
                rest.post('/feedbacks/delete_feedback_by_id',
                    {
                        feedback_id: feedback1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete feedback
            (callback) => {
                rest.post('/feedbacks/get_feedback_by_id',
                    {
                        feedback_id: feedback1.id
                    },
                    (err, req, res, feedback) => {
                        assert.isNull(err);
                        
                        //assert.isNull(feedback || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});