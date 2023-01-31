const mongoose = require('mongoose')
const colors = require("colors")
const Error = require('../error/errorHandler')
const models = require('../../models/index')

const ERRORMSG = "error CONTROLADOR"

colors.enable()
/**
 * 
 * @param {string} model modelo con el que se crea el registro
 * @param {object} body informacion que se ingresa
 * @param {string} res respuesta
 * @param {string} logInfo informacion de mas para el log
 */

const create = (model, body, res, logInfo) => {

    if(process.env.LOG == 'true'){
        console.log(`Create ${logInfo} ${body}`)
    }

    const document = new models[model](body)
    Error.errorSaving(document, res)

}
/**
 * 
 * @param {string} model modelo con que se busca el registro
 * @param {string} id id con el que se registro en la db 
 * @param {*} res respuesta
 */
const find = (model, id, res) => {
    
    models[model].findById(id,(err, doc) => {Error.errorHandler(err, res, ERRORMSG, doc)})
}

/**
 * @param {string} model modelo con que se busca el registro
 * @param {string} id id con el que se registro en la db 
 * @param {*} res respuesta
 * @param {object} body informacion que se ingresa
 * @param {*} msg mensaje de actuliazacion en la respuesta
 */

const Update = (model, body, id, res , msg) => {
    
    models[model].findByIdAndUpdate(id, {$set : body}, (error, doc) => {
        if(res){
            Error.errorHandler(error, res, ERRORMSG, msg)
        }
        if(doc ==  null){
            res.status(400).send("No found id")
        }
    })
}
/**
 * 
 * @param {*} args
 * @param {mongoose.Schema.model} model es el modelo que realizara las operaciones a la base de datos
 * @param {string} id es el id del registro dentro de la base de datos
 * @param {string} key como se encuentra regsitrada la id en los registros relacionados ejemplo id_gps para gps dentro de user
 * @param {string} msg mensaje de finalizacion   
 */

const Delete = (args) => {
    const {model, id, res, key,msg} = args

    if(process.env.LOG == 'true'){
        console.log(`Delete ${id} ${key}`)
    }

    model.findById(id, (error, doc) => {
        doc['relation'].map((value, index) => {
            const relationModel = require(`../../models/${value}`)
            
            const filter = {}
            filter[key] = id

            relationModel.find(filter, (error, docR) => {
                if(docR.length > 0){
                    docR.map((value, index) => {

                        let auxid = [] 

                        value[key].map((v,i) => {
                            if(v != id){
                                auxid.push(v)
                            }
                        })

                        value[key] = auxid

                        let valueUpdate = {}
                        let idU

                        Object.keys(value['_doc']).map((vu,iu) => {
                            if(vu != "_id"){
                                valueUpdate[vu] = value['_doc'][vu]
                            }else{
                                idU = value['_doc']["_id"].toString() 
                            }

                        })

                        Update({
                            "model" : relationModel,
                            "body"  : valueUpdate,
                            "id"    : idU
                        })
                    })   
                }
            })
        })

    model.findByIdAndDelete(id, (err, doc) => Error.errorHandler(err, res, ERRORMSG, msg))
    
    })
}

/**
 * @param {string} model modelo con que se busca el registro
 * @param {string} id  id con el que se registro en la db 
 * @param {string} idi id a ser ingresado en la relacion
 * @param {string} space nombre del espacio en base de datos donde se ingresara el id 
 * @param {*} res respuesta
 * @description funcion para ingresar id dentro de un documento
 */

const Link = (model, id, idi, space ,res) => {

    if(process.env.LOG == 'true'){
        console.log(colors.yellow(`[QUERY] Link ${id}`))
    }

    let body = {}
    body[space] = mongoose.Types.ObjectId(idi)
    
    models[model].findByIdAndUpdate(id, {$set : body}, (error, doc) => {
        if(res){
            Error.errorHandler(error, res, ERRORMSG, "LINK OK")
        }

        if(doc ==  null){
            res.status(400).send("No found id")
        }
    })
}


/**
 * @param {string} model modelo con que se busca el registro
 * @param {string} id  id con el que se registro en la db 
 * @param {string} idi id a ser ingresado en la relacion
 * @param {string} space nombre del espacio en base de datos donde se ingresara el id 
 * @param {*} res respuesta
 * @description funcion para ingresar id a un array de ids dentro de un documento
 */

const LinkA = (model, id, idi, space ,res) => {

    if(process.env.LOG == 'true'){
        console.log(colors.yellow(`[QUERY] LinkA ${id}`))
    }

    let body = {}
    body[space] = mongoose.Types.ObjectId(idi)

    if(id != null && idi != null){
        models[model].findByIdAndUpdate(id, {$addToSet : body}, (error, doc) => {
            if(res){
                Error.errorHandler(error, res, ERRORMSG, "LINK OK")
            }
    
            if(doc ==  null){
                res.status(400).send("No found id")
            }
        })
    }else{
        res.status(400).send("id o idi no presentados")
    }
}

/**
 * esta funcion es para obtener la informacion que se encuentre linkiada a un registro
 * 
 * @param  id   este es el id que se va ha consultar
 * @param  model este es el modelo que se utiliza para buscar la id
 * @param  key   la llave del array de ids
 * @param  res    response
 */

const Rlink = (model,id, key, res) => {

    if(process.env.LOG == 'true'){
        console.log(colors.yellow(`[QUERY] Rlink ${id}`))
    }

    if(id != null) {
        models[model].findById(id).
        populate(key).
        exec(function(err, doc){
    
            if(doc !== null){
                if(doc[key] !== null){
                    res.status(200).send(doc[key])
                }else{
                    res.status(500).send("no tiene registro")
                }
            }else{
                res.status(400).send("documento no encontrado")
            }
        })
    }else{
        res.status(400).send("id no presentado")
    }
}

module.exports = {create, find, Update, Delete, Link, LinkA, Rlink}