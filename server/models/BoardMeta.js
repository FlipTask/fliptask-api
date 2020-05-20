const {Schema} = require("mongoose");

const BoardMetaSchema = new Schema({
    board:{
        index: true,
        type: Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    team:{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }
},{ 
    timestamps: true
});


BoardMetaSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['createdAt']
        delete ret['updatedAt']
        return ret
    }
});

module.exports = BoardMetaSchema;