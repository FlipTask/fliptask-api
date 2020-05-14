export default [
    {
        path: "/create",
        type: "POST",
        handlers: ["Auth.authenticate", "TaskListController.create"]
    },{
        path: "/get/:boardId/:taskListId?",
        type: "GET",
        handlers: ["Auth.authenticate", "TaskListController.get"]
    }
];
