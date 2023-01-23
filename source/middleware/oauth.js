const jose = require('jose')
const colors = require('colors')

colors.enable()

const OAuth = (req, res, next) => {


    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET
        );

        jose.jwtVerify(token, secret)
            .then(data => next())
            .catch((error) => {

                if(Boolean(process.env.LOG)){
                    console.log(colors.red("[ERROR] invalid or expired token"))
                }

                res.status(400).send("token invalido")
            })

    }catch(e){
        if(req.header("Authorization") == undefined){

            if(Boolean(process.env.LOG)){
                console.log(colors.red("[ERROR] token not showing"))
            }
            
            res.status(400).send("Token no presentado")
        }else{
            res.status(500).send("error en el servidor")
        }
    }
}

module.exports = {OAuth}