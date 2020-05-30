const { Schema } = require("mongoose");

const TaskListSchema = new Schema({
    title: {
        type: String,
        required: "Title is required to create a new board",
        trim: true
    },
    board: {
        index: true,
        required: true,
        ref: "Board",
        type: Schema.Types.ObjectId
    },
    tasks: [{
        index: true,
        ref: "Task",
        type: Schema.Types.ObjectId
    }],
    createdBy: {
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

TaskListSchema.pre("save", async function (next) {
    const tasklist = this;
    if (this.isNew) {
        const board = await Board.findById(tasklist.board);
        board.task_list.push(tasklist._id);
        await board.save();
    }
    next();
});

TaskListSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});


module.exports = TaskListSchema;
