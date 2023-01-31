const getFileNames = require("../utils/file/getFileNames")

let models = {}

getFileNames(process.env.PROJECT_DIR + '/models').forEach(name => {
    if(name != 'index'){
        models[name] = require(`./${name}.js`) 
    } 
})

module.exports = models