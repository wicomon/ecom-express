// const Sequelize = require('sequelize');
const {db} = require('../config/db');

const obtenerUsuario = async(id) => {
    const [results, metadata] = await db.query(`
        SELECT id, dni, nombres, apellidos, correo, estado, categoria 
        FROM usuarios 
        WHERE id=${id};
    `);
    return ({
        results,
        metadata
    });
}

const listaUsuarios = async() => {
    const [results, metadata] = await db.query(`
        SELECT * FROM usuarios;
    `);
    console.log('hola');
    return ({
        results,
        metadata
    });
}

const crearUsuario = async(dni, nombres, apellidos, correo, password, categoria=3) => {
    
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        INSERT INTO usuarios (dni,nombres,apellidos,correo,password,categoria) 
        VALUES ("${dni}","${nombres}","${apellidos}","${correo}","${password}","${categoria}")
        ;
    `);
    return ({
        results,
        metadata
    });
}

const modificarUsuario = async(id, dni, nombres, apellidos, correo, categoria) => {
    
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        UPDATE usuarios SET 
        dni = "${dni}", 
        nombres="${nombres}", 
        apellidos="${apellidos}",
        correo="${correo}",
        categoria="${categoria}"
        WHERE id=${id}
        ;
    `);
    return ({
        results,
        metadata
    });
}

const eliminarUsuario = async(id) => {
    
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        DELETE FROM usuarios WHERE id = ${id}
        ;
    `);
    return ({
        results,
        metadata
    });
}
 

module.exports = {
    obtenerUsuario,
    listaUsuarios,
    crearUsuario,
    modificarUsuario,
    eliminarUsuario
}