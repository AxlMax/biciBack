const userModel = require("../models/user")
const bcrypt = require('bcrypt')
const jose = require('jose')
const colors = require('colors')

require("dotenv").config() 

colors.enable()

const oauth = (body,res) => {

    userModel.findOne({
        email : body.email
        },(error, doc) => {
            const equal = bcrypt.compareSync(body.passwd, doc.passwd)

            if(equal){
                
                const secret = new TextEncoder().encode(
                    process.env.JWT_SECRET
                  );
                
                  const jwt =  new jose.SignJWT({doc})
                    .setProtectedHeader({ alg: "HS256" })
                    .setExpirationTime('8h')
                    .sign(secret);
                  
                  jwt.then((data) => {
                    if(Boolean(process.env.LOG)){
                        console.log(colors.green("[OK] user logged"))
                    }

                    res.send('Bearer ' + data)
                })
            }else{
                res.send("no puede ingresar")
                if(Boolean(process.env.LOG)){
                    console.log(colors.yellow("[WARNING] user incorrect"))
                }

            }
        })
}

module.exports = {oauth}

