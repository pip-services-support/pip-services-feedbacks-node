import { YamlConfigReader } from 'pip-services-commons-node';

import { FeedbacksMongoDbPersistence } from '../../src/persistence/FeedbacksMongoDbPersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksMongoDbPersistence', ()=> {
    let persistence: FeedbacksMongoDbPersistence;
    let fixture: FeedbacksPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new FeedbacksMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new FeedbacksPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
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