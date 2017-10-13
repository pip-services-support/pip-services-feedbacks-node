import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let FeedbacksMongoDbSchema = function(collection?: string) {
    collection = collection || 'feedbacks';

    let attachmentSchema = new Schema({
        id: { type: String, required: false },
        uri: { type: String, required: false },
        name: { type: String, required: false }
    });

    attachmentSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let partyReferenceSchema = new Schema({
        id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false }
    });

    partyReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String },
            category: { type: String, required: true, index: true },
            app: { type: String, required: false, index: true },

            /* Generic request properties */
            sender: { type: partyReferenceSchema, required: false },
            sent_time: { type: Date, required: true, 'default': Date.now, index: true },

            /* Common properties */
            title: { type: String, required: false },
            content: { type: String, required: false },
            pics: { type: [attachmentSchema], required: false },
            docs: { type: [attachmentSchema], required: false },

            /* Copyright/Trademark Violation */
            company_name: { type: String, required: false },
            company_addr: { type: String, required: false },
            copyright_holder: { type: String, required: false },
            original_loc: { type: String, required: false },
            copyrighted_work: { type: String, required: false },
            unauth_loc: { type: String, required: false },

            /* Generic reply properties */
            reply_time: { type: Date, required: false },
            replier: { type: partyReferenceSchema, required: false },
            reply: { type: String, required: false },

            /* Custom fields */
            custom_hdr: { type: Mixed, required: false },
            custom_dat: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}