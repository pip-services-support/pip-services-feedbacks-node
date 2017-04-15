import { ConfigParams } from 'pip-services-commons-node';

import { FeedbacksFilePersistence } from '../../src/persistence/FeedbacksFilePersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksFilePersistence', ()=> {
    let persistence: FeedbacksFilePersistence;
    let fixture: FeedbacksPersistenceFixture;
    
    setup((done) => {
        persistence = new FeedbacksFilePersistence('./data/feedbacks.test.json');

        fixture = new FeedbacksPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
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