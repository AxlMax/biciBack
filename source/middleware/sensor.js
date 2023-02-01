
const printNumber = (req, res, next) =>{
    console.log("number")
    next()
}

module.exports = {printNumber}