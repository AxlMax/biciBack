url = require("url")

const Query = (req, param) => {
    return  url.parse(req.url, true).query?.[param]
}

module.exports = {Query}