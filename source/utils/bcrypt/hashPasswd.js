var bcrypt= require('bcrypt');

var hashPasswd = async function(password){
    
    var hashPwd = await bcrypt.hash(password,10);
    return hashPwd
}

module.exports = {hashPasswd}