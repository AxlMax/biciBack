const auto = require('../utils/auto/controller')

const Cestaciones = (body, res)     => auto.create("estaciones", body, res, "estaciones")
const Restaciones = (id, res)       => auto.find  ("estaciones", id, res)
const Uestaciones = (id, body, res) => auto.Update("estaciones", body, id, res, "estaciones actualizado")

const LinkBici    = (id, idi, res)  => auto.LinkA("estaciones", id, idi, "bicis", res, "ERROR LINK bici")
const GetBici     = (id, res)       => auto.Rlink("estaciones", id, "bicis", res)

module.exports = {Cestaciones, Restaciones, Uestaciones, LinkBici, GetBici}