module.exports = [
    {
        path: "/create",
        type: "POST",
        handlers: ["Auth.authenticate", "TeamController.create"]
    },
    {
        path: "/:teamId",
        type: "GET",
        handlers: ["Auth.authenticate", "TeamController.get"]
    }
];
