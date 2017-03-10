"use strict";
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var FeedbacksFilePersistence_1 = require('../../src/persistence/FeedbacksFilePersistence');
var FeedbacksPersistenceFixture_1 = require('./FeedbacksPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/feedbacks.test.json',
        data: []
    }
});
suite('FeedbacksFilePersistence', function () {
    var db, fixture, storage;
    setup(function (done) {
        db = new FeedbacksFilePersistence_1.FeedbacksFilePersistence();
        db.configure(config);
        fixture = new FeedbacksPersistenceFixture_1.FeedbacksPersistenceFixture(db);
        storage = new StorageNullClient();
        storage.configure(new pip_services_runtime_node_2.ComponentConfig());
        var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage);
        db.link(components);
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('Send Feedback', function (done) {
        fixture.testSendFeedback(done);
    });
    test('Reply Feedback', function (done) {
        fixture.testReplyFeedback(done);
    });
    test('Get Feedback', function (done) {
        fixture.testGetFeedback(done);
    });
    test('Get Multiple Feedbacks', function (done) {
        fixture.testGetMultipleFeedbacks(done);
    });
    test('Delete Feedback', function (done) {
        fixture.testDeleteFeedback(done);
    });
});
