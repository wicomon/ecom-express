const { db } = require('../config/db');
const { logearUsuario, cambiarPassword } = require('../models/Auth')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res) => {

    const { correo, password } = req.body;

    try {
        const { results, metadata } = await logearUsuario(correo);
        // console.log(results[0]);
        if (!results[0]) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }
        usuario = results[0];
        // Si el usuario esta activo
        if (usuario.estado !== 1) {
            return res.status(400).json({
                msg: 'El usuario esta inactivo contacte al administrador'
            })
        }
        // verificar la contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);

        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password',

            })
        }

        // generar el JWT
        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            token
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0].message
        });
    }
}

const putAuth = async (req, res) => {
    // console.log(req.usuario);
    const {id} = req.params;
    const { correo, password } = req.body;
    if (req.usuario.correo !== correo) {
        return res.status(400).json({
            msg: 'Solo se peude cambiar su propio password'
        });
    }
    try {
        // encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        const nuevoPassword = bcrypt.hashSync(password, salt);

        const {results, metadata} = await cambiarPassword(id, correo, nuevoPassword);
        return res.json({
            results, metadata
        });

    } catch (error) {
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0].message
        });
    }
}

const usuarioLogeado = (req, res) => {
    return res.json({usuario : req.usuario});
}


module.exports = {
    login,
    putAuth,
    usuarioLogeado
}