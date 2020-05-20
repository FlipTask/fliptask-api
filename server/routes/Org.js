module.exports = [
    {
        path: "/create",
        type: "POST",
        handlers : ["Auth.authenticate", "OrganizationController.create"]
    },
    {
        path: "/get/:orgId",
        type: "GET",
        handlers : ["Auth.authenticate", "OrganizationController.get"]
    },
    {
        path: "/search",
        type: "GET",
        handlers : ["Auth.authenticate", "OrganizationController.search"]
    }
]