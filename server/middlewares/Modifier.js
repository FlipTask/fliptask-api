class Modifier {
    static paramIdIsOrgId(req, res, next) {
        res.locals.orgId = req.params.id;
        next();
    }

    static createdByUser(req, res, next) {
        req.query.createdBy = req.user.id;
        next();
    }
}

global.Modifier = Modifier;