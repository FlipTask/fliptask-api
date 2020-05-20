const {Schema} = require("mongoose");

const TaskCommentSchema = new Schema({
    task: {
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Task" 
    },
    creator: {
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User" 
    },
    message: {
        type: String,
        trim: true,
        required: "Comment can not be created without a message."
    }
},{ 
    timestamps: true
});

module.exports = TaskCommentSchema;