var express = require('express');
var {OAuth} = require("../../middleware/oauth")
var Expections = require("./expectionsOauth")
var router = express.Router();
var colors = require('colors');
colors.enable();




const autoRouter = (indexer, services, middleware) => {



    indexer.indexer.forEach((value, _) => {

        if(value.path == undefined){
            value.path = value.service
        }

        const path = `/api/${indexer.path}/${value.path}`

        if(Expections.includes(value.service)){

            if(Boolean(process.env.LOG)){
                console.log(colors.cyan(`[${value.method.toUpperCase()}]\t\t${path} expection to Oauth`))
            }

            router?.[value.method]( value.path ,(req, res) => services?.[value.service](req,res))

        }else{

            if(Boolean(process.env.LOG)){
                if(value.method == "delete"){
                    console.log(colors.red(`[${value.method.toUpperCase()}]\t${path}`))
                }
    
                if(value.method == "put"){
                    console.log(colors.yellow(`[${value.method.toUpperCase()}]\t \t${path}`))
                }
    
                if(value.method == "get"){
                    console.log(colors.magenta(`[${value.method.toUpperCase()}]\t \t${path}`))
                }
                if(value.method == "post"){
                    console.log(colors.green(`[${value.method.toUpperCase()}]\t \t${path}`))
                }

                if(value.method == "patch"){
                    console.log(colors.gray(`[${value.method.toUpperCase()}]\t \t${path}`))
                }
            }

            if (Object.keys(value).length == 3 && value.service != "oauth"){
                router?.[value.method]("/" + value.path, OAuth ,(req, res) => services?.[value.service](req,res))
            }else if(Object.keys(value).length == 4){
                router?.[value.method]("/" + value.path,  [OAuth, middleware?.[value.middleware]] ,(req, res) => services?.[value.service](req,res))
            }else{
                router?.[value.method]("/" + value.path ,(req, res) => services?.[value.service](req,res))
            }
        }
    })

    return router
}
module.exports = autoRouter