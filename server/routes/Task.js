module.exports = [
    {
        path: "/create",
        type: "POST",
        handlers: ["Auth.authenticate", "TaskController.create"]
    },
    {
        path: "/update",
        type: "PUT",
        handlers: ["Auth.authenticate", "TaskController.update"]
    },
    {
        path: "/get/:taskId?",
        type: "POST",
        handlers: ["Auth.authenticate"]
    },
    {
        path: "/upload/images",
        type: "POST",
        handlers: ["Auth.authenticate", "TaskController.uploadTaskImages"]
    }
];
