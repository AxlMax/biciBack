const controllerestaciones = require('../controller/estaciones')
const request = require('../utils/request/service')

const Cestaciones = (req, res) => controllerestaciones.Cestaciones(req.body, res)
const Restaciones = (req, res) => controllerestaciones.Restaciones(request.Query(req,'id'), res)
const Uestaciones = (req, res) => controllerestaciones.Uestaciones(request.Query(req,'id'), req.body, res)
const LinkBici    = (req, res) => controllerestaciones.LinkBici(request.Query(req,'id'), request.Query(req,'idi') , res)
const GetBici     = (req, res) => controllerestaciones.GetBici(request.Query(req,'id'), res)

module.exports = {Cestaciones, Restaciones, Uestaciones, LinkBici, GetBici}