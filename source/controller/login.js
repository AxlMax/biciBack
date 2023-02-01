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

            if(doc !== null){
                const equal = bcrypt.compareSync(body.passwd, doc.passwd)

                if(equal){
                    
                    const secret = new TextEncoder().encode(
                        process.env.JWT_SECRET
                      );
                    
                      const jwt =  new jose.SignJWT({doc})
                        .setProtectedHeader({ alg: "HS256" })
                        .setExpirationTime('8h')
                        .sign(secret);
                      
                      jwt.then((data) => res.send('Bearer ' + data))
                }else{
                    res.send("no puede ingresar")
                }
            }else{
                res.send("No existe el usuario")
            }
        })
}

module.exports = {oauth}

