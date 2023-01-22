const userRules = {
    "name":{
        "any.empty"   : "Nombre es requerido",
        "string.min"  : "Nombre debe tener un minimo de 6 caracteres",
        "string.base" : "Nombre debe ser una cadena de carateres"
    },
    "passwd":{
        "any.required"  : "constraseña es requerida",
        "string.min"    : "constraseña debe tener un minimo de 6 caracteres",
        "string.base"   : "contraseña debe de ser una cadena de caracteres"
    },
    "age":{
        "number.base"   : "edad debe ser un numero entero",
        "number.min"    : "edad debe ser mayor a 0",
        "number.max"    : "edad no puede ser mayor a 170"
    },
    "email":{
        "string.email"  : "email debe tener la estructura de un email"
    }
}

module.exports = {userRules}