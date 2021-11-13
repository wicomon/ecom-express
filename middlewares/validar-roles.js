const {response} = require('express');

const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const {categoria} = req.usuario;
    if (Number(categoria) > 2) {
        return res.status(401).json({
            msg: 'No estas autorizado para realizar esta acción'
        });
    }
    next();
    // console.log(req.usuario)
}
const esMismoUsuario = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    if (req.usuario.id == req.params.id) {
        next();
    }else{
        return res.status(401).json({
            msg: 'No estas autorizado para realizar esta acción'
        });
        
    }
    
}

module.exports = {
    esAdminRole,
    esMismoUsuario
}