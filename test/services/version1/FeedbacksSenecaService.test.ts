let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { FeedbacksMemoryPersistence } from '../../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../../../src/logic/FeedbacksController';
import { FeedbacksSenecaService } from '../../../src/services/version1/FeedbacksSenecaService';

let FEEDBACK = {
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

suite('FeedbacksSenecaService', ()=> {        
    let db = new FeedbacksMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new FeedbacksController();
    ctrl.configure(new ComponentConfig());

    let service = new FeedbacksSenecaService();
    service.configure(new ComponentConfig());

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, storage, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        let feedback1, feedback2;

        async.series([
        // Send one feedback
            (callback) => {
                seneca.getSeneca().act(
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
                        assert.isDefined(feedback.sent);
                        assert.isUndefined(feedback.replied);

                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Send another feedback
            (callback) => {
                seneca.getSeneca().act(
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
                        assert.isDefined(feedback.sent);
                        assert.isUndefined(feedback.replied);

                        feedback2 = feedback;

                        callback();
                    }
                );
            },
        // Get all feedbacks
            (callback) => {
                seneca.getSeneca().act(
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
                seneca.getSeneca().act(
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
                        assert.isDefined(feedback.replied);

                        feedback1 = feedback;

                        callback();
                    }
                );
            },
        // Delete feedback
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'feedbacks',
                        cmd: 'delete_feedback',
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
                seneca.getSeneca().act(
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