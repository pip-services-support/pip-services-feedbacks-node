"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var FeedbacksLambdaFunction_1 = require('../../src/run/FeedbacksLambdaFunction');
var buildConfig = pip_services_runtime_node_1.MicroserviceConfig.fromValue({
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
suite('FeedbacksLambdaFunction', function () {
    var lambda = new FeedbacksLambdaFunction_1.FeedbacksLambdaFunction();
    suiteSetup(function (done) {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    suiteTeardown(function (done) {
        lambda.stop(done);
    });
    test('Ping', function (done) {
        lambda.getHandler()({
            cmd: 'get_feedbacks'
        }, {
            done: function (err, feedbacks) {
                assert.isNull(err);
                assert.isObject(feedbacks);
                done();
            }
        });
    });
});
