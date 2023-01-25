const mongoose = require('mongoose');

const estacionesSchemma =  new mongoose.Schema({
    nombre : {
        type  : String,
        unique: true,
        required : true
    },
    ubicacion : {
        lat:Number,
        lon:Number
    }
},{ versionKey: false });

module.exports = mongoose.model('Estacion', estacionesSchemma)
