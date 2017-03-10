import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { FeedbacksMemoryPersistence } from '../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksFilePersistence', ()=> {
    let db, fixture, storage;
    
    setup((done) => {
        db = new FeedbacksMemoryPersistence();
        db.configure(new ComponentConfig());

        fixture = new FeedbacksPersistenceFixture(db);

        storage = new StorageNullClient();
        storage.configure(new ComponentConfig());

        let components = ComponentSet.fromComponents(db, storage);

        db.link(components);
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
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