const controllerbici = require('../controller/bici')
const request = require('../utils/request/service')

const Cbici = (req, res) => controllerbici.Cbici(req.body, res)
const Rbici = (req, res) => controllerbici.Rbici(request.Query(req,'id'), res)
const Ubici = (req, res) => controllerbici.Ubici(request.Query(req,'id'), req.body, res)

module.exports = {Cbici, Rbici, Ubici}