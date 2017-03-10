let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { FeedbacksLambdaFunction } from '../../src/run/FeedbacksLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    clients: {
        descriptor: {
            group: 'pip-services-storage',
            type: 'null',
            version: '1.0'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});

suite('FeedbacksLambdaFunction', ()=> {    
    let lambda = new FeedbacksLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_feedbacks' 
            },
            {
                done: (err, feedbacks) => {
                    assert.isNull(err);
                    assert.isObject(feedbacks);                
                    done();
                }
            }
        );
    });
});