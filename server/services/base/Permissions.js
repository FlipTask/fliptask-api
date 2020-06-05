class Permissions {
    _userIsOrgMember = async ({ createdBy, organisationId }) => {
        const organisation = await Organisation.findByPk(organisationId);
        if (!organisation) {
            throw "Missing or incorrect params";
        } else {
            const userOrganisationMap = await UserOrganisationMap.findOne({
                where: {
                    userId: createdBy,
                    organisationId,
                }
            });

            if (!userOrganisationMap) {
                throw "Not authorised."
            }
        }
    }
}

module.exports = Permissions;
