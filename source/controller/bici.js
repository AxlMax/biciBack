const biciModel = require('../models/bici')
const auto = require('../utils/auto/controller')

const Cbici = (body, res)     => auto.create(biciModel, body, res, "bici")
const Rbici = (id, res)       => auto.find(biciModel, id, res)
const Ubici = (id, body, res) => auto.Update(biciModel, body, id, res, "bici actualizado")

module.exports = {Cbici, Rbici, Ubici}