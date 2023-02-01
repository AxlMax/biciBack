const express = require("express") // libreria para realizar backend
const getFileNames = require("../utils/file/getFileNames")
const colors = require('colors')

const router = express.Router()
colors.enable()

getFileNames(process.env.PROJECT_DIR + '/indexers').forEach(name => { 
    router.use(`/${name}`,require(`./${name}.js`))
    
})

module.exports = router