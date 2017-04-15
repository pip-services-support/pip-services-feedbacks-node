import { FeedbacksMemoryPersistence } from '../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksMemoryPersistence', ()=> {
    let persistence: FeedbacksMemoryPersistence;
    let fixture: FeedbacksPersistenceFixture;
    
    setup((done) => {
        persistence = new FeedbacksMemoryPersistence();
        fixture = new FeedbacksPersistenceFixture(persistence);
        
        persistence.open(null, done);
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