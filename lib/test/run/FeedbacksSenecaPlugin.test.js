"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var FeedbacksSenecaPlugin_1 = require('../../src/run/FeedbacksSenecaPlugin');
var buildConfig = {
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
suite('FeedbacksSenecaPlugin', function () {
    var seneca;
    var plugin = new FeedbacksSenecaPlugin_1.FeedbacksSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'feedbacks',
            cmd: 'get_feedbacks'
        }, function (err, feedbacks) {
            assert.isNull(err);
            assert.isObject(feedbacks);
            done();
        });
    });
});
