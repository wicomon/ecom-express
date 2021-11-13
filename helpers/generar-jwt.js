const jwt = require('jsonwebtoken');

const generarJWT = async(id='') =>{

    const payload = {id}
    // crear JWT
    const token = jwt. sign(payload, process.env.SECRETORPRIVATEKEY, {
        expiresIn : '4h'
    });
    return token;
}

module.exports={
    generarJWT
}