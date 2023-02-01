const auto = require('../utils/auto/controller')

const Cbici = (body, res)     => auto.create("bici", body, res, "bici")
const Rbici = (id, res)       => auto.find  ("bici", id, res)
const Ubici = (id, body, res) => auto.Update("bici", body, id, res, "bici actualizado")
const Dbici = (id, res)       => auto.Delete({
                                    modelR : "bici",
                                    modelO : [{
                                            model : "estaciones",
                                            key   :  "bicis"
                                        },
                                        {
                                            model : "user",
                                            key   :  "biciId"
                                        }
                                    ]
                                },id,res)

module.exports = {Cbici, Rbici, Ubici, Dbici}