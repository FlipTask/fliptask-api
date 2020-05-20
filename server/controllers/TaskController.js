module.exports = {
    create: async (req, res) => {
        const {
            description,
            title,
            priority,
            due_date: dueDate,
            task_list: taskList
        } = req.body;
        const createdBy = req.user._id;
        try {
            // console.log(req.file)
            const task = await Task.create({
                title,
                createdBy,
                description,
                priority,
                due_date: dueDate,
                task_list: taskList
            });
            return res.status(200).send({
                error: false,
                data: task,
                message: "OK"
            });
        } catch (e) {
            Logger.error("[ERROR] Error in creating task", e);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    },
    uploadTaskImages: async (req, res) => {
        try {
            const { taskId } = req.query;
            const task = await Task.findById(taskId);
            if (task) {
                await Multer(req, res);
                // console.log("task.desc_images",req.files);
                const images = req.files.map((o) => ({
                    image_name: o.filename
                }));

                task.desc_images = task.desc_images.concat(images);
                const newTask = await task.save();
                return res.status(200).send({
                    error: false,
                    data: newTask,
                    message: "Images uploaded successfully"
                });
            }
            return res.status(400).send({
                error: true,
                data: null,
                message: "Unable to uploaded"
            });
        } catch (error) {
            Logger.error(`[ERROR] Error in uploading images ${error}`);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    },
    update: async (req, res) => {
        const {
            _id
        } = req.body;
        try {
            const task = await Task.findById(_id);
            if (task._id) {
                const omits = ["_id", "desc_images", "comments", "__v", "updatedAt", "createdAt"];
                const keys = Object.keys(req.body).filter((k) => omits.indexOf(k) < 0);
                for (let i = 0; i < keys.length; i++) {
                    task[keys[i]] = req.body[keys[i]];
                }
                const updatedTask = await task.save();
                return res.status(200).send({
                    error: false,
                    data: updatedTask,
                    message: "OK"
                });
            }
            return res.status(400).send({
                error: true,
                data: null,
                message: "Invalid task "
            });
        } catch (e) {
            Logger.error(`[ERROR] Error in updating task ${e}`);
            return res.status(500).send({
                error: true,
                data: null,
                message: "Something went wrong!"
            });
        }
    }
};
