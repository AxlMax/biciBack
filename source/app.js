require("dotenv").config()

var express    = require("express");
var bodyParser = require("body-parser");
const dbConnect = require("./config/mongo");
const cors = require('cors')

var app = express();

dbConnect()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors({origin:true,credentials: true}))

app.use("/api", require("./routes"))

app.listen(process.env.PORT, () => {
    console.log("app running on port " + process.env.PORT)
})
