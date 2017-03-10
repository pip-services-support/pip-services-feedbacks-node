/**
 * @file Feedbacks process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var FeedbacksProcessRunner = require('../lib/src/run/FeedbacksProcessRunner').FeedbacksProcessRunner;

var runner = new FeedbacksProcessRunner();
runner.startWithDefaultConfig('../config/config.json');