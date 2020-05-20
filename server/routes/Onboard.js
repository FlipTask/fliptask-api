module.exports = [
    {
        type: "POST",
        path: "/invite",
        handlers: ["Auth.authenticate", "OnBoardController.invite"]
    }
];
