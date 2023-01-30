const estacionesModel = require('../models/estaciones')
const auto = require('../utils/auto/controller')

const Cestaciones = (body, res)     => auto.create(estacionesModel, body, res, "estaciones")
const Restaciones = (id, res)       => auto.find(estacionesModel, id, res)
const Uestaciones = (id, body, res) => auto.Update(estacionesModel, body, id, res, "estaciones actualizado")

const LinkBici    = (id, idi, res)  => auto.LinkA(estacionesModel, id, idi, "bicis", res, "ERROR LINK bici")


module.exports = {Cestaciones, Restaciones, Uestaciones, LinkBici}