const auto = require('../utils/auto/controller')

const Cbici = (body, res)     => auto.create("bici", body, res, "bici")
const Rbici = (id, res)       => auto.find  ("bici", id, res)
const Ubici = (id, body, res) => auto.Update("bici", body, id, res, "bici actualizado")

module.exports = {Cbici, Rbici, Ubici}