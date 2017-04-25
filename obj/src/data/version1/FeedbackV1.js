"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeedbackV1 {
    constructor(id, category, app, sender, title, content) {
        this.id = id;
        this.category = category;
        this.app = app;
        this.sender = sender;
        this.title = title;
        this.content = content;
        this.pics = [];
        this.docs = [];
        this.sent_time = new Date();
    }
}
exports.FeedbackV1 = FeedbackV1;
//# sourceMappingURL=FeedbackV1.js.map