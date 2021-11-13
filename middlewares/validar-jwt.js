const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { obtenerUsuario } = require('../models/Usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            msg : 'Es obligatorio enviar el token'
        });
    }
    
    try {

        const {id} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        // obtener el usuario logeado
        const {results} = await obtenerUsuario(id);
        // console.log(results[0]);
        if (!results[0]) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos 1 '
            })
        }
        usuario = results[0];
        // Verificar si el uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado False 2'
            });
        }

        req.usuario=usuario;

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({
            msg: 'Token no válido, por favor inicie sesión nuevamente!'
        });
    }
}


module.exports = {
    validarJWT
}