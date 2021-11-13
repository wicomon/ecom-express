const {db} = require('../config/db');
const {obtenerUsuario, listaUsuarios, crearUsuario, modificarUsuario, eliminarUsuario}=require('../models/Usuario')
const bcrypt = require('bcryptjs');

const getUsuario = async(req, res) => {

    const {id} = req.params;
    const {results} = await obtenerUsuario(id);
    // const {results, metadata} = usuarios;
    return res.json({
        results
    });
}

const getUsuarios = async(req, res) => {
    
    const {results} = await listaUsuarios();
    // const {results, metadata} = usuarios;
    return res.json({
        results
    });
}

const postUsuario = async(req, res) => {

    const {dni, nombres, apellidos, correo, password,categoria} = req.body;
    // console.log({dni, nombres, apellidos, correo, password,categoria});
    // encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    const passwordHasheado = bcrypt.hashSync(password, salt);

    try {
        // await sequelize.authenticate();
        const {results, metadata} = await crearUsuario(dni.trim(), nombres.trim().toUpperCase(), apellidos.trim().toUpperCase(), correo, passwordHasheado, categoria);
    
        return res.status(200).json({
            results,
            metadata
        });
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0].message
        });
    }
    
}

const putUsuario = async(req, res) => {
    
    const {id} = req.params
    const {dni, nombres, apellidos, correo, categoria} = req.body;
    console.log({dni, nombres, apellidos, correo,categoria});

    try {
        // await sequelize.authenticate();
        const {results, metadata} = await modificarUsuario(id, dni.trim(), nombres.trim().toUpperCase(), apellidos.trim().toUpperCase(), correo, categoria);
    
        return res.status(200).json({
            results,
            metadata
        });
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0].message
        });
    }
    
}

const deleteUsuario = async(req, res) => {

    const {id} = req.params

    try {
        // await sequelize.authenticate();
        const {results, metadata} = await eliminarUsuario(id);
    
        return res.status(200).json({
            results,
            metadata
        });
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0].message
        });
    }
    
}

 
module.exports = {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}