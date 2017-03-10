let _ = require('lodash');
let assert = require('chai').assert;

import { FeedbacksSenecaPlugin } from '../../src/run/FeedbacksSenecaPlugin';

let buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    clients: {
        descriptor: {
            group: 'pip-services-storage',
            type: 'null',
            version: '1.0'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};


suite('FeedbacksSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new FeedbacksSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'feedbacks',
                cmd: 'get_feedbacks' 
            },
            (err, feedbacks) => {
                assert.isNull(err);
                assert.isObject(feedbacks);                
                done();
            }
        );
    });
});