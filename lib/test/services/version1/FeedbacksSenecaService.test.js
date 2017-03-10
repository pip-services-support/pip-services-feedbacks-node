"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var FeedbacksMemoryPersistence_1 = require('../../../src/persistence/FeedbacksMemoryPersistence');
var FeedbacksController_1 = require('../../../src/logic/FeedbacksController');
var FeedbacksSenecaService_1 = require('../../../src/services/version1/FeedbacksSenecaService');
var FEEDBACK = {
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
var USER1 = {
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
var USER2 = {
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};
suite('FeedbacksSenecaService', function () {
    var db = new FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new FeedbacksController_1.FeedbacksController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new FeedbacksSenecaService_1.FeedbacksSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var feedback1, feedback2;
        async.series([
            // Send one feedback
            function (callback) {
                seneca.getSeneca().act({
                    role: 'feedbacks',
                    cmd: 'send_feedback',
                    feedback: FEEDBACK,
                    user: USER1
                }, function (err, feedback) {
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
                });
            },
            // Send another feedback
            function (callback) {
                seneca.getSeneca().act({
                    role: 'feedbacks',
                    cmd: 'send_feedback',
                    feedback: FEEDBACK,
                    user: USER2
                }, function (err, feedback) {
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
                });
            },
            // Get all feedbacks
            function (callback) {
                seneca.getSeneca().act({
                    role: 'feedbacks',
                    cmd: 'get_feedbacks'
                }, function (err, feedbacks) {
                    assert.isNull(err);
                    assert.isObject(feedbacks);
                    assert.lengthOf(feedbacks.data, 2);
                    callback();
                });
            },
            // Reply the feedback
            function (callback) {
                seneca.getSeneca().act({
                    role: 'feedbacks',
                    cmd: 'reply_feedback',
                    feedback_id: feedback1.id,
                    reply: 'This is a reply',
                    user: USER2
                }, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.reply, 'This is a reply');
                    assert.equal(feedback.replier.id, USER2.id);
                    assert.equal(feedback.replier.name, USER2.name);
                    assert.isDefined(feedback.replied);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Delete feedback
            function (callback) {
                seneca.getSeneca().act({
                    role: 'feedbacks',
                    cmd: 'delete_feedback',
                    feedback_id: feedback1.id
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete feedback
            function (callback) {
                seneca.getSeneca().act({
                    role: 'feedbacks',
                    cmd: 'get_feedback_by_id',
                    feedback_id: feedback1.id
                }, function (err, feedback) {
                    assert.isNull(err);
                    assert.isNull(feedback || null);
                    callback();
                });
            }
        ], done);
    });
});
