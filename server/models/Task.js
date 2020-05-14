import {Schema} from "mongoose";

const TaskSchema = new Schema({
    description:{
        type: String,
    },
    task_list: {
        index: true,
        required: true,
        ref: "TaskList",
        type: Schema.Types.ObjectId
    },
    priority: {
        type: Number
    },
    title: {
        type: String,
        required: "Title is required to create a new task",
        trim: true,
    },
    due_date: {
        type: Date
    },
    desc_images: [{
        image_name: {
            type: String,
            required: true
        }
    }],
    assignee:{
        index: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sequence:{
        type: Number,
        default: 0
    },
    createdBy:{
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        index: true,
        type: Schema.Types.ObjectId,
        ref: "TaskComment"
    }]
},{
    timestamps: true
});

const updateTaskIdInTaskList = async(task) => {
    if(task.isNew){
        const taskList = await TaskList.findById(task.task_list);
        taskList.tasks.push(task._id);
        await taskList.save();   
    }
}

const updateSequence = async(task) => {
    if(task.isModified("sequence")){
        console.log("task sequence been updated !!");
    }
    if(task.isNew){
        const allTasksOfList = await Task.find({task_list: task.task_list});
        if(allTasksOfList.length > 0){
            task.sequence = allTasksOfList.length + 1;
        }
    }
}


TaskSchema.pre("save", async function(next){
    const task = this;
    /**
     *  Update tasklist
     */
    await updateTaskIdInTaskList(task);
    await updateSequence(task);
    
    next();
});

export default TaskSchema;