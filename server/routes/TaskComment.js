module.exports = [
    {
        type: "GET",
        path: "/",
        handlers: ["TaskCommentController.list"]
    },
    {
        type: "POST",
        path: "/",
        handlers: ["TaskCommentController.create"]
    },
    {
        type: "GET",
        path: "/:id",
        handlers: ["TaskCommentController.get"]
    },
    {
        type: "DELETE",
        path: "/:id",
        handlers: ["TaskCommentController.delete"]
    },
    {
        type: "PATCH",
        path: "/:id",
        handlers: ["TaskCommentController.update"]
    }
];
