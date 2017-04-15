let FeedbacksProcess = require('../obj/src/container/FeedbacksProcess').FeedbacksProcess;

try {
    new FeedbacksProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
