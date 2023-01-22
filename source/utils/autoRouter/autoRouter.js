var express = require('express');
var {OAuth} = require("../../middleware/oauth")
var Expections = require("./expectionsOauth")
var router = express.Router();
var colors = require('colors');
colors.enable();

const autoRouter = (indexer, services, middleware) => {
    console.log("*****************")
    indexer.forEach((value, index) => {

        if(Expections.includes(value.service)){
            console.log(colors.cyan(`${value.method}:\t ${value.service} expection to Oauth`))
            router?.[value.method]("/" + value.service ,(req, res) => services?.[value.service](req,res))
        }else{
            console.log(colors.green(`${value.method}:\t ${value.service}`))

            if (Object.keys(value).length == 2 && value.service != "oauth"){
                router?.[value.method]("/" + value.service, OAuth ,(req, res) => services?.[value.service](req,res))
            }else if(Object.keys(value).length == 3){
                router?.[value.method]("/" + value.service,  [OAuth, middleware?.[value.middleware]] ,(req, res) => services?.[value.service](req,res))
            }else{
                router?.[value.method]("/" + value.service ,(req, res) => services?.[value.service](req,res))
            }
        }
    })
    console.log("*****************")

    return router
}
module.exports = autoRouter