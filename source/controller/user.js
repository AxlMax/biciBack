const userModel = require('../models/user')
const color = require('colors')
const hash = require("../utils/bcrypt/hashPasswd")
const auto = require('../utils/auto/controller')

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
        .catch((e) => {
            
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
            (error, data) => {

                if(data == null) {
                   res.status(400).send("No user in DB") 
                }else{
                    res.send("user UPDATE")
                }
            }
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

const LinkBici = (id, idi, res) => auto.Link(userModel, id, idi, "bici", res, "ERROR LINK bici")

const GetBici = (id, res) => auto.Rlink(id, userModel, "biciId", res)

module.exports = {
    Cuser, Ruser, Uuser, Duser, LinkBici, GetBici
}
