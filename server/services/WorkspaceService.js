const CrudService = require("./base/CrudService");

class WorkspaceService extends CrudService {
    beforeCreate = async (data) => {
        await this._userIsOrgMember(data);
    }
}

global.workspaceService = new WorkspaceService(Workspace);
