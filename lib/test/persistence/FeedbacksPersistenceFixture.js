"use strict";
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var FEEDBACK = {
    // sender_id: '1',
    // sender_email: 'test@digitallivingsoftware.com',
    // sender_name: 'Test User',
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
var USER1 = {
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
var USER2 = {
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};
var FeedbacksPersistenceFixture = (function () {
    function FeedbacksPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    FeedbacksPersistenceFixture.prototype.testSendFeedback = function (done) {
        var _this = this;
        var feedback1;
        async.series([
            // Request a Feedback
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.category, FEEDBACK.category);
                    assert.equal(feedback.title, FEEDBACK.title);
                    assert.equal(feedback.content, FEEDBACK.content);
                    assert.equal(feedback.sender.id, USER1.id);
                    assert.equal(feedback.sender.name, USER1.name);
                    assert.equal(feedback.sender.email, USER1.email);
                    assert.isDefined(feedback.sent);
                    assert.isUndefined(feedback.replied);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Check that feedback was written
            function (callback) {
                _this._db.getFeedbackById(null, feedback1.id, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.category, FEEDBACK.category);
                    assert.equal(feedback.title, FEEDBACK.title);
                    assert.equal(feedback.content, FEEDBACK.content);
                    assert.equal(feedback.sender.id, USER1.id);
                    assert.equal(feedback.sender.name, USER1.name);
                    assert.equal(feedback.sender.email, USER1.email);
                    assert.isDefined(feedback.sent);
                    assert.isUndefined(feedback.replied);
                    callback();
                });
            }
        ], done);
    };
    FeedbacksPersistenceFixture.prototype.testReplyFeedback = function (done) {
        var _this = this;
        var feedback1;
        async.series([
            // Request a Feedback
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Reply a Feedback
            function (callback) {
                _this._db.replyFeedback(null, feedback1.id, 'This is a test reply', USER2, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.reply, 'This is a test reply');
                    assert.isDefined(feedback.replied);
                    feedback1 = feedback;
                    callback(null, feedback);
                });
            },
            // Check that reply was written
            function (callback) {
                _this._db.getFeedbackById(null, feedback1.id, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.sender.name, USER1.name);
                    assert.equal(feedback.sender.email, USER1.email);
                    assert.equal(feedback.category, FEEDBACK.category);
                    assert.isDefined(feedback.replied);
                    assert.equal(feedback.replier.id, USER2.id);
                    assert.equal(feedback.replier.name, USER2.name);
                    assert.equal(feedback.replier.email, USER2.email);
                    assert.equal(feedback.reply, 'This is a test reply');
                    callback();
                });
            }
        ], done);
    };
    FeedbacksPersistenceFixture.prototype.testGetFeedback = function (done) {
        var _this = this;
        var feedback1;
        async.series([
            // Request a Feedback
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Get a Feedback
            function (callback) {
                _this._db.getFeedbackById(null, feedback1.id, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    assert.equal(feedback.id, feedback1.id);
                    assert.equal(feedback.sender.name, USER1.name);
                    assert.equal(feedback.sender.email, USER1.email);
                    assert.equal(feedback.category, FEEDBACK.category);
                    callback();
                });
            }
        ], done);
    };
    FeedbacksPersistenceFixture.prototype.testGetMultipleFeedbacks = function (done) {
        var _this = this;
        var feedback1, feedback2, feedback3;
        async.series([
            // Send feedback #1
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Send feedback #2
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback2 = feedback;
                    callback();
                });
            },
            // Send feedback #3
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER2, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback3 = feedback;
                    callback();
                });
            },
            // Reply a feedback
            function (callback) {
                _this._db.replyFeedback(null, feedback1.id, 'This is a reply', USER2, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Get feedback
            function (callback) {
                _this._db.getFeedbacks(null, pip_services_runtime_node_1.FilterParams.fromValue({ replied: false }), new pip_services_runtime_node_2.PagingParams(), function (err, feedbacks) {
                    assert.isNull(err);
                    assert.isObject(feedbacks);
                    assert.lengthOf(feedbacks.data, 2);
                    var feedback = feedbacks.data[0];
                    assert.isUndefined(feedback.replied);
                    assert.equal(feedback.category, FEEDBACK.category);
                    callback(null);
                });
            }
        ], done);
    };
    FeedbacksPersistenceFixture.prototype.testDeleteFeedback = function (done) {
        var _this = this;
        var feedback1;
        async.series([
            // Request feedback
            function (callback) {
                _this._db.sendFeedback(null, FEEDBACK, USER1, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    feedback1 = feedback;
                    callback();
                });
            },
            // Get feedback
            function (callback) {
                _this._db.getFeedbackById(null, feedback1.id, function (err, feedback) {
                    assert.isNull(err);
                    assert.isObject(feedback);
                    callback();
                });
            },
            // Delete feedback
            function (callback) {
                _this._db.deleteFeedback(null, feedback1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Get nothing
            function (callback) {
                _this._db.getFeedbackById(null, feedback1.id, function (err, feedback) {
                    assert.isNull(err);
                    assert.isNull(feedback || null);
                    callback();
                });
            },
        ], done);
    };
    return FeedbacksPersistenceFixture;
}());
exports.FeedbacksPersistenceFixture = FeedbacksPersistenceFixture;
