const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const validator = require("validator")
dotenv.config({path:'.././config.env'})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Name Field is Required."]
    },
    email:{
        type:String,
        validate:{
            validator:validator.isEmail,
            meesage:"Enter a valid email"
        },
        required:[true,"Email Field is Required."],
        unique:true
    },
    password:{
        type:String,
        minLength:[4,"Password Should Contain Atleast 4 characters."],
        required:[true,"Password Field is Required."],
        select:false
    } 
},{timestamps:true})


userSchema.methods.comparePasswords= async function(pass,passDB){
    return await bcrypt.compare(pass,passDB)
}

userSchema.methods.changedPassword=async function(jwtTime){
    if(this.updatedAt){
    const passwordTime = this.updatedAt.getTime()/1000
    return passwordTime < jwtTime
    }
    return false
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    this.passwordCreatedAt = Date.now()
    this.confirmPassword = undefined
})


const User = mongoose.model("User",userSchema)

module.exports = User