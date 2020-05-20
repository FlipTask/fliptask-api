const {Schema} = require("mongoose");

const UserMetaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    team_list: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }],
    organization:{
        type: Schema.Types.ObjectId,
        ref: "Organization"
    },
    is_org_verified:{
        type: Boolean,
        default: false,
    },
    designation:{
        type: String,
        trim: true
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_email_verified:{
        type: Boolean,
        default: false,
    },
    is_phone_verified:{
        type: Boolean,
        default: false,
    },
},{ 
    timestamps: true
});

UserMetaSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['createdAt']
        delete ret['updatedAt']
        return ret
    }
});


module.exports = UserMetaSchema;