const mongoose = require('mongoose');
const { Schema } = mongoose;

const biciSchemma =  new mongoose.Schema({
  estacion : { 
        type: Schema.Types.ObjectId, 
        ref: 'Estacion' 
    },

    uso : {
        estado : Boolean,
        user   : {
            type : Schema.Types.ObjectId,
            ref  : 'user'
        }
    },

    placa : {
        type     : String,
        required : true
    },

},{ versionKey: false });


module.exports = mongoose.model('Bici', biciSchemma)
