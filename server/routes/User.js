module.exports = [
    {
        path: "/signup",
        type: "POST",
        handlers: "UserController.create"
    },
    {
        path: "/login",
        type: "POST",
        handlers: "UserController.login"
    },
    {
        path: "/me",
        type: "GET",
        handlers: ["Auth.authenticate", "UserController.get"]
    },
    {
        path: "/me/meta",
        type: "GET",
        handlers: ["Auth.authenticate", "UserController.getMeta"]
    },
    {
        path: "/logout",
        type: "GET",
        handlers: ["Auth.authenticate", "UserController.logout"]
    }
];
