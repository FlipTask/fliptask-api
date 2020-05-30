const { Schema } = require("mongoose");

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
}, {
    timestamps: true
});

OrganizationMetaSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

module.exports = OrganizationMetaSchema;
