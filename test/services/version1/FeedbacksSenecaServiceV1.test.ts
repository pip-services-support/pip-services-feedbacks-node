let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../../src/data/version1/FeedbackV1';
import { FeedbacksMemoryPersistence } from '../../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../../../src/logic/FeedbacksController';
import { FeedbacksSenecaServiceV1 } from '../../../src/services/version1/FeedbacksSenecaServiceV1';

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

suite('FeedbacksSenecaServiceV1', ()=> {
    let seneca: any;
    let service: FeedbacksSenecaServiceV1;
    let persistence: FeedbacksMemoryPersistence;
    let controller: FeedbacksController;

    suiteSetup((done) => {
        persistence = new FeedbacksMemoryPersistence();
        controller = new FeedbacksController();

        service = new FeedbacksSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-feedbacks', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        let feedback1, feedback2;

        async.series([
        // Send one feedback
            (callback) => {
                seneca.act(
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
                seneca.act(
                    {
                        role: 'feedbacks',
                        cmd: 'send_feedback',
                        feedback: FEEDBACK,
                        user: USER2
                    },
                    (err, feedback) => {
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
                seneca.act(
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
                seneca.act(
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
                seneca.act(
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
                seneca.act(
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