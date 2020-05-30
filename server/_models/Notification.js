const { Schema } = require("mongoose");

// ToDO

// need to write cron job to check mentions and chat and assign every 5 min : REJECTED

const NotificationSchema = new Schema({
    type: {
        type: String,
        enum: ["chat", "mention", "assign", "duetask", "taskupdates"]
    },
    additional_info: {
        type: Schema.Types.Mixed
    },
    seen_by: [{ // NTT
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    notifier: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
});

NotificationSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.createdAt;
        return ret;
    }
});


module.exports = NotificationSchema;
