import {Schema} from "mongoose";

const TeamSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    organization: {
        index: true,
        type: Schema.Types.ObjectId,
        ref: "Organization"
        // required: "Organization is required for creating a team"
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: "Owner is required to create team"
    }],
    name: {
        index: true,
        type: String,
        required: "Name is required to create a team",
        default: "All"  
    },
    board_list:[{
        type: Schema.Types.ObjectId,
        ref: "Board",
        // required: "Board is required to create a team"
    }],
    member_list: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
},{ 
    timestamps: true
});
TeamSchema.index({createdBy: 1, organization: 1, name: 1},{index: true})

const updateUserMetaOnNewTeam = async(team) => {
    try{
        const userMeta = await UserMeta.findOne({user: team.createdBy});
        // console.log(team._id);
        userMeta.team_list = userMeta.team_list.concat([team._id]);
        await userMeta.save();
    }catch(e){
        Logger.error(`[ERROR] Unable to update user Meta for new team creation \n ${e}`);
    }
}
TeamSchema.pre("save", async function(next){
    const team = this;
    if(team.isNew){
        await updateUserMetaOnNewTeam(team);
    }
    next();
});

TeamSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['createdAt']
        delete ret['updatedAt']
        return ret
    }
});


export default TeamSchema;