const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt-nodejs')

const {userRules} = require("../rules/user");
const { ruleError } = require('../utils/error/ruleError');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number

    },
    email:{
        type     : String,
        unique   : true
    },
    passwd:{
        type     : String,
    },
    rol:{
        type    : String,
        default : "unassigned"
    },

    id_ambulancia : {
        type: Array,
        default : []
    },
    id_gps :{
        type : Array,
        default : []
    },
    created: { 
        type: Date, 
        default: Date.now 
    }
}, { versionKey: false })

userSchema.pre('save',function(next){
    const user = this
    

    if(!user.isModified("passwd")){
        return next()
    }

    bcrypt.genSalt(10, (error, salt) => {
        if(error){
            next(error)
        }

        bcrypt.hash(user.passwd, salt , null, (error, hash) => {
            if(error){
                next(error)
            }

            user.passwd = hash
        })
    })

    return next()
})


userSchema.methods.joiValidate = (obj) => {
	
    const schema = joi.object({ 
        name  : joi.string()
                .min(6)
                .required()
                .error(errs => ruleError(errs, userRules,'name')),
        
        email : joi.string()
                .min(6)
                .required()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .error(errs => ruleError(errs, userRules, 'email')),

        passwd: joi.string()
                  .min(6)
                  .required()
                  .error(errs => ruleError(errs, userRules, 'passwd')),

        age: joi.number().integer()
             .min(0)
             .max(170)
             .error(errs => ruleError(errs, userRules, 'age')),
    })


	return schema.validate(obj);
}

module.exports = mongoose.model('user', userSchema)