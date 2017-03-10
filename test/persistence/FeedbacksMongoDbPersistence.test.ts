import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { FeedbacksMongoDbPersistence } from '../../src/persistence/FeedbacksMongoDbPersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

let options = new DynamicMap(require('../../../config/config'));
let dbOptions = ComponentConfig.fromValue(options.getNullableMap('persistence'));

suite('FeedbacksMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new FeedbacksMongoDbPersistence();
    db.configure(dbOptions);

    let fixture = new FeedbacksPersistenceFixture(db);

    let storage = new StorageNullClient(null);
    let components = ComponentSet.fromComponents(db, storage);

    suiteSetup((done) => {       
        db.link(components);
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Send Feedback', (done) => {
        fixture.testSendFeedback(done);
    });

    test('Reply Feedback', (done) => {
        fixture.testReplyFeedback(done);
    });

    test('Get Feedback', (done) => {
        fixture.testGetFeedback(done);
    });

    test('Get Multiple Feedbacks', (done) => {
        fixture.testGetMultipleFeedbacks(done);
    });

    test('Delete Feedback', (done) => {
        fixture.testDeleteFeedback(done);
    });

});