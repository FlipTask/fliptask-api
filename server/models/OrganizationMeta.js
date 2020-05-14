import {Schema} from "mongoose";

const OrganizationMetaSchema = new Schema({
    organization: {
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Organization" 
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{ 
    timestamps: true
});

OrganizationMetaSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['createdAt']
        delete ret['updatedAt']
        return ret
    }
});

export default OrganizationMetaSchema;