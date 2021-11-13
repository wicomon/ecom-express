// const Sequelize = require('sequelize');
const {db} = require('../config/db');


const listarCategorias = async() => {
    const [results, metadata] = await db.query(`
        SELECT * FROM categorias;
    `);
    // console.log('hola');
    return ({
        results,
        metadata
    });
}

module.exports = {
    listarCategorias,
}