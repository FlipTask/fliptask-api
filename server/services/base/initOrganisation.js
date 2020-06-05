module.exports = async (organisation) => {

    const { createdBy } = organisation;

    const workspace = await WorkspaceService.create({
        name: `${organisation.name} Workspace`,
        createdBy,
        organisationId: organisation.id
    });

    const taskList = await TaskListService.create({
        name: "To Do",
        workspaceId: workspace.id,
        createdBy
    });

    const task = await TaskService.create({
        name: "Setup fliptask",
        description: "Explore and customize your fliptask as required.",
        createdBy,
        sequence: 1,
        priority: 100,
        assignee: createdBy,
        dueDate: Date.now(),
        weight: 10,
        taskListId: taskList.id
    });
};
