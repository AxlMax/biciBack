const fs = require("fs")

const removeExtension = (filename) => {
    return filename.split('.').shift();
}

const getFileNames = (path) => {

    var names = []

    fs.readdirSync(path).filter((file) => {
        names.push(removeExtension(file))
    })

    return names
}

module.exports = getFileNames