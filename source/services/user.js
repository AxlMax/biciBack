const controllerUser = require('../controller/user')
const request = require('../utils/request/service')

url = require("url")

const Cuser = (req, res, next) => {
    controllerUser.Cuser(req.body, res)
}

const Ruser = (req, res) => {
    controllerUser.Ruser(res)
}

const Uuser = (req, res) => {
    const query = url.parse(req.url, true).query
    controllerUser.Uuser(query.id, req.body, res)
}

const Duser = (req, res) => {
    const query = url.parse(req.url, true).query
    controllerUser.Duser(query.id, res)
}

module.exports = {
    Cuser, Ruser, Uuser, Duser
}
