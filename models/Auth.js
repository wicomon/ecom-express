// const Sequelize = require('sequelize');
const {db} = require('../config/db');

const logearUsuario = async(correo) => {
    const [results, metadata] = await db.query(`
        SELECT id, correo, password, estado FROM usuarios WHERE correo="${correo}";
    `);
    return ({
        results,
        metadata
    });
}


const cambiarPassword = async(id, correo, password) => {
    
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        UPDATE usuarios SET 
        password = "${password}"
        WHERE id=${id} AND correo="${correo}"
        ;
    `);
    return ({
        results,
        metadata
    });
}

 

module.exports = {
    logearUsuario,
    cambiarPassword,
}