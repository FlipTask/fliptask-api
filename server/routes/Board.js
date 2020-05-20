module.exports = [
    {
        path: "/create",
        type: "POST",
        handlers: ["Auth.authenticate", "BoardController.create"]
    },
    {
        path: "/get/:boardId?",
        type: "GET",
        handlers: ["Auth.authenticate", "BoardController.get"]
    },
    {
        path: "/update/:boardId",
        type: "POST",
        handlers: ["Auth.authenticate", "BoardController.updateListOrder"]
    }
];
