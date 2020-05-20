const { Schema } = require("mongoose");

const BoardSchema = new Schema({
    last_accessed_at:{
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: "Title is required to create a new board",
        trim: true,
    },
    owner:{
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    team: {
        index: true,
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    task_list:[{
        ref: "TaskList",
        type: Schema.Types.ObjectId
    }],
    meta: {
        type: Schema.Types.ObjectId,
        ref: "BoardMeta"
    }
},{ 
    timestamps: true
});


const updateLastAccessTimeStamp = async(board) => {
    try{
        await board.update({}, { $set: { last_accessed_at: Date.now() } });
    }catch(err){
        Logger.error(`[ERROR] Unable to update board last_accessed key \n ${err}`);
    }
}

const createBoardMeta = async(board) => {
    try{
        const boardMeta = BoardMeta.create({board: board._id});
        board.meta = boardMeta._id;
    }catch(err){
        Logger.error(`[ERROR] Unable to create board meta \n ${err}`);
    }
}

const addBoardInOrg = async(board) => {
    try{
        const userMeta = await UserMeta.findOne({user: board.owner});
        const org = await Organization.findById(userMeta.organization);
        org.board_list = org.board_list.concat([board._id]);
        await org.save();
    }catch(err){
        Logger.error(`[ERROR] Unable to update org for new board \n ${err}`);
    }
}

BoardSchema.pre('save', async function (next) {
    const board = this;

    if(this.isNew){
        await createBoardMeta(board);
        await addBoardInOrg(board);
    }
    await updateLastAccessTimeStamp(board);
    next();  
});

BoardSchema.pre('updateOne', async function (next){
    const board = this;
    await updateLastAccessTimeStamp(board);
    next();    
});

BoardSchema.pre('findOneAndUpdate', async function (next){
    const board = this;
    await updateLastAccessTimeStamp(board);
    next();    
});

BoardSchema.pre('findOne', async function(next) {
    const board = this;
    await updateLastAccessTimeStamp(board);
    // console.log(board.last_accessed_at);
    next();    
});
  
BoardSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['createdAt']
        delete ret['updatedAt']
        return ret
    }
});

module.exports = BoardSchema;