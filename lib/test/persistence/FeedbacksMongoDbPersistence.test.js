/**
 * @file Feedbacks mongodb data access test
 * @copyright Digital Living Software Corp. 2014-2016
 */
"use strict";
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var FeedbacksMongoDbPersistence_1 = require('../../src/persistence/FeedbacksMongoDbPersistence');
var FeedbacksPersistenceFixture_1 = require('./FeedbacksPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('FeedbacksMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new FeedbacksPersistenceFixture_1.FeedbacksPersistenceFixture(db);
    var storage = new StorageNullClient(null);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage);
    suiteSetup(function (done) {
        db.link(components);
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
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
