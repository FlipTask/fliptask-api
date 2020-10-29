class Modifier {
    static paramIdIsOrgId(req, res, next) {
        req.organisationId = req.headers.organisationid;
        next();
    }

    static createdByUser(req, res, next) {
        req.query.createdBy = req.user.id;
        next();
    }
}

global.Modifier = Modifier;