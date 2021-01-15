import mongoose, { set } from 'mongoose';
const { Schema } = mongoose;
const crypto = require('crypto');
import { v1 as uuidv1 } from 'uuid';

var userSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    lastname: {
        type: String,
        required: false,
        maxlength: 23,
        trim: true
    },

    email: {
        type: String,
        required: true,
        maxlength: 64,
        trim: true,
        unique: true
    },

    userinfo: {
        type:String,
        trim:true
    },

    encry_password: {
       type: String,
       required:true
    },

    salt: String,
    
    role: {  // Previlages
        type:Number,
        default: 0
    },

    purchases: {
        type: Array,
        default:[]
    }

},
{timestamps: true}
);

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword
    })
    .get(function(){
        return this._password
    })



userSchema.method = {


    autheticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    
    securePassword: function(plainpassword){
        if(!password) return"";
        try{
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }
        catch(err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)
