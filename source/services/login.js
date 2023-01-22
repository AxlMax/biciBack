const loginController = require("../controller/login")

const oauth = (req, res) => {
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');

    console.log("oauth")
    
    loginController.oauth(req.body, res)
}


module.exports = {oauth}