import {Schema} from "mongoose";
import {validateEmail} from "../helpers/Validators";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true,"First name is required"],
        trim: true
    },
    last_name: {
        type: String,
        required: [true,"Last Name is required"],
        trim: true
    },
    email: {
        index: true,
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true,'Email address is required'],
        validate: [
            validateEmail, 'Please fill a valid email address'
        ],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    boards: [
        {
            ref: "Board",
            type: Schema.Types.ObjectId
        }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    meta: {
        type: Schema.Types.ObjectId,
        ref: "UserMeta"
    }
},{
    timestamps: true
});

/**
 * 
 * @param {Object} user 
 */
const createDefaultBoardForNewUser = async(user) => {
    try{
        const board = await Board.create({title: "My Board",owner: user._id});
        user.boards = user.boards.push(board._id);
    }catch(err){
        Logger.error(`[ERROR] Unable to create board on new user creation \n ${err}`);
    }
}

/**
 * 
 * @param {Object} user 
 */
const createMetaForUser = async(user) => {
    try{
        const meta = await UserMeta.create({user: user._id});
        user.meta = meta._id
    }catch(err){
        Logger.error(`[ERROR] Unable to create Meta for new user creation \n ${err}`);
    }
}

/**
 * 
 * @param {Object} user 
 */
const generateHashForPassword = async(user) => {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    // console.log(salt);
    const hash =  await bcrypt.hash(user.password,salt);
    user.password = hash;
}


UserSchema.pre('save', async function(next) {
    var user = this;
    if (user.isNew) {
        await createMetaForUser(user);
    }
    
    if (user.isModified('password')){
        await generateHashForPassword(user)
    } 
    return next();
});


UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) 
            return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email}).populate({path: "meta"})
    if (!user) {
        return { 
            error: true,
            message: 'Wrong Email or Password' 
        }
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
        return {
            error: true,
            message: 'Wrong Email or Password'
        }
    }
    return {
        error: false,
        user: user
    };
}


UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password']
        delete ret['tokens']
        delete ret['createdAt']
        delete ret['updatedAt']
        return ret
    }
});

export default UserSchema;