const controllerestaciones = require('../controller/estaciones')
const request = require('../utils/request/service')

const Cestaciones = (req, res) => controllerestaciones.Cestaciones(req.body, res)
const Restaciones = (req, res) => controllerestaciones.Restaciones(request.Query(req,'id'), res)
const Uestaciones = (req, res) => controllerestaciones.Uestaciones(request.Query(req,'id'), req.body, res)

module.exports = {Cestaciones, Restaciones, Uestaciones}