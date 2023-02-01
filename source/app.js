require("dotenv").config()

var express    = require("express");
var bodyParser = require("body-parser");
const dbConnect = require("./config/mongo");
const cors = require('cors')
const colors = require('colors')

console.log()

colors.enable()

var app = express();

dbConnect()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors({origin:true,credentials: true}))

app.use("/api", require("./routes"))

app.listen(process.env.PORT, () => {
    console.log()
    console.log(colors.green(`[OK] app running on ${process.env.PORT}`))
})
