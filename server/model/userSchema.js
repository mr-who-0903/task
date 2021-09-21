const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// creating Schema
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    ph:{
        type:Number,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
            },
            ph:{
                type:Number,
                required:true,
            },
            msg:{
                type:String,
                required:true
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ]
})

const dataSchema = new mongoose.Schema({

    userId:{
        type:String
    },
    id:{
        type:String
    },
    title:{
        type:String
    },
    body:{
        type:String
    }
})


// password hashing     // this is a middleware function
userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

// generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let generatedToken = jwt.sign({ _id : this._id}, process.env.SECRET_KEY);   // jwt.sign(payload, secret key)
        this.tokens = this.tokens.concat({ token : generatedToken });
        this.save();
        return generatedToken;
    }
    catch(err){
        console.log(err);
    }
}

// store msg to db
userSchema.methods.addMsg = async function(name, email, ph, msg){

    try{
        this.messages = this.messages.concat({name, email, ph, msg});
        this.save();
        return this.messages;
        
    }catch(err){
        console.log(err);
    }
}

// creating collection (collection means table)
const User = mongoose.model('user', userSchema);    
const Data = mongoose.model('data', dataSchema);
module.exports = {User, Data};