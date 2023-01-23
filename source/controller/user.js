const userModel = require('../models/user')
const color = require('colors')
const hash = require("../utils/bcrypt/hashPasswd")

color.enable()

const Cuser = (body, res) => {

    console.log(color.yellow(`[QUERY] Create user ${body.email}`))

    const user = new userModel(body)
    var err = user.joiValidate(body)
     
    if(err.hasOwnProperty('error')){
        res.status(400).send(err.error.details) 
    }else{
        user.save()
        .then (() => {
            res.status(200).send(user)
            if(Boolean(process.env.LOG)){
                console.log(color.green("[OK] user created"))
            }   
        })
        .catch(() => {
            res.status(500).send("usuario ya existe")

            if(Boolean(process.env.LOG)){
                console.log(color.red("[ERROR] user already exist"))
            }  
        })
    }
}

const Ruser = (res) => {
    userModel.find({}, (error, data) => {
        if(!error){
            res.status(200).send(data)
        }else{
            res.status(500).send(" error al buscar los usuarios")
        }
    })
}

const Uuser = async (id, body, res) => {

    if(Boolean(process.env.LOG)){
        console.log(color.yellow("[QUERY] update user"))
    }
    
    if(body.passwd != undefined){
        hash.hashPasswd(body.passwd).then((data) => {
            userModel.findByIdAndUpdate(
                id,
                {$set:{
                    passwd:data
                }}, 
                (error, data) => res.send(data)
            )
        })
    }else{
        userModel.findByIdAndUpdate(
            id,
            {$set:body}, 
            (error, data) => res.send(data)
        )
    }
}

const Duser = (id, res) => {

    if(Boolean(process.env.LOG)){
        console.log(color.yellow("[QUERY] delete user"))
    }

    userModel.findByIdAndDelete(
        id,
        (error, data) => res.send(data)
    )
}



module.exports = {
    Cuser, Ruser, Uuser, Duser
}
