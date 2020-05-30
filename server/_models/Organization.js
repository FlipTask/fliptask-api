const { Schema } = require("mongoose");

const OrganizationSchema = new Schema({
    board_list: [{
        type: Schema.Types.ObjectId,
        ref: "Board"
    }],
    createdBy: {
        unique: true,
        index: true,
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required to create a organization"]
    },
    name: {
        index: true,
        unique: true,
        type: String,
        required: [true, "Organization name is required."]
    },
    team_list: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }],
    admin_list: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    meta: {
        type: Schema.Types.ObjectId,
        ref: "OrganizationMeta"
    }
}, {
    timestamps: true
});

const createOrganizationMeta = async (org) => {
    try {
        const meta = await OrganizationMeta.create({ organization: org._id });
        org.meta = meta._id;
    } catch (err) {
        Logger.error(`[ERROR] Unable to create Meta on new organization creation \n ${err}`);
    }
};

const createDefaultTeam = async (org) => {
    try {
        const team = await Team.create({
            createdBy: org.createdBy,
            organization: org._id,
            name: "All",
            owners: [org.createdBy],
            member_list: [org.createdBy]
        });
        org.team_list = org.team_list.push(team._id);
    } catch (err) {
        Logger.error(`[ERROR] Unable to create default Team on new organization creation \n ${err}`);
    }
};
const insertCreatorInFields = async (org) => {
    const userId = org.createdBy;
    org.admin_list = [
        ...org.admin_list,
        userId
    ];
};

const updateCreatorMetaOnNewOrg = async (org) => {
    try {
        const userMeta = await UserMeta.findOne({ user: org.createdBy, is_org_verified: false });
        userMeta.is_org_verified = true;
        userMeta.organization = org._id;
        await userMeta.save();
    } catch (err) {
        Logger.error(`[ERROR] Unable to update user Meta for new organization creation \n ${err}`);
    }
};

OrganizationSchema.pre("save", async function (next) {
    const org = this;
    if (org.isNew) {
        await createOrganizationMeta(org);
        await insertCreatorInFields(org);
        await updateCreatorMetaOnNewOrg(org);
        await createDefaultTeam(org);
    }
    next();
});

OrganizationSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = OrganizationSchema;
