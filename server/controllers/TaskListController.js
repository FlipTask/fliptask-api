export default {
    create: async(req,res,next) => {
        const {
            title,
            board
        } = req.body;
        const createdBy = req.user._id
        try{
            const taskList = await TaskList.findOne({
                title,
                board,
                createdBy
            });
            if(!taskList){
                const newTaskList = await TaskList.create({
                    title,
                    board,
                    createdBy
                });
                return res.status(200).send({
                    error: false,
                    data: newTaskList,
                    message: "OK"
                });
            }else{
                return res.status(409).send({
                    error: false,
                    data: newTaskList,
                    message: "TaskList already exists !"
                });
            }
        }catch(e){
            console.log(e);
            Logger.error(`[ERROR] Error in creating taskList \n ${e}`);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    },
    get: async(req,res,next) => {
        try{
            const {
                taskListId,
                boardId
            } = req.params;
            const user = req.user;
            const extras = req.query.extras;
            let populate = [];
            if(extras){
                populate = extras.split(",").map((key) => {
                    return {
                        path: key
                    }
                });
            }
            let findObj = {
                createdBy: user._id,
                board: boardId
            }
            let funcName = "find";
            if(taskListId){
                findObj._id = taskListId
                funcName = "findOne";
            }
            const taskList = await TaskList[funcName](findObj).populate(populate);
            return res.status(200).send({
                error: false,
                data: taskList,
                message: "OK"
            });
        }catch(e){
            Logger.error(`[ERROR] Error in getting taskList \n${e}`);
            console.log(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    },
    update: async(req,res,next) => {
        try{
            const {
                board,
                sequence,
                title,
                id, //tasklist id     
            } = req.body;
            const taskList = await TaskList.findOne({_id: id,board});
            if(taskList){
                if(sequence){
                    taskList.sequence = sequence;   
                }
                if(title){
                    taskList.title = title;  
                }
                const updatedTaskList = await taskList.save();
                return res.status(200).send({
                    error: false,
                    data: updatedTaskList,
                    message: "OK"
                });
            }else{
                return res.status(400).send({
                    error: false,
                    data: newTaskList,
                    message: "TaskList not found"
                });
            }
        }catch(e){
            Logger.error(`[ERROR] Error in updating taskList \n${e}`);
            console.log(e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    }
}