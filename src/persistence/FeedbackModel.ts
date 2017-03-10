let 
    mongoose = require('mongoose'),
    
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,

    ReferenceSchema = new Schema({
        id: { type: String, required: true },
        name: { type: String, required: true }
    });

    ReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

let
    PartyReferenceSchema = new Schema({
        id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false }
    });

    PartyReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

let
    FeedbackSchema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },
            category: { type: String, required: true, index: true },
            app: { type: String, required: false, index: true },

            /* Generic request properties */
            sender: { type: PartyReferenceSchema, required: false },
            sent: { type: Date, required: true, 'default': Date.now, index: true },

            /* Common properties */
            title: { type: String, required: false },
            content: { type: String, required: false },
            pic_ids: { type: [String], required: false },
            docs: { type: [ReferenceSchema], required: false },

            /* Copyright/Trademark Violation */
            company_name: { type: String, required: false },
            company_addr: { type: String, required: false },
            copyright_holder: { type: String, required: false },
            original_loc: { type: String, required: false },
            copyrighted_work: { type: String, required: false },
            unauth_loc: { type: String, required: false },

            /* Generic reply properties */
            replied: { type: Date, required: false },
            replier: { type: PartyReferenceSchema, required: false },
            reply: { type: String, required: false },

            /* Custom fields */
            custom_hdr: { type: Mixed, required: false },
            custom_dat: { type: Mixed, required: false }
        },
        {
            collection: 'feedbacks',
            autoIndex: true,
            strict: true
        }
    );

    FeedbackSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

module.exports = function(connection) {
    return connection.model('Feedback', FeedbackSchema);
};
