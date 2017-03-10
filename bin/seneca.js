/**
 * @file Feedbacks seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var FeedbacksSenecaPlugin = require('../lib/src/run/FeedbacksSenecaPlugin').FeedbacksSenecaPlugin;
var plugin = new FeedbacksSenecaPlugin();

module.exports = plugin.entry();