// const Sequelize = require('sequelize');
const {db} = require('../config/db');

const obtenerProducto = async(id) => {
    const [results, metadata] = await db.query(`
        SELECT *
        FROM productos prod
        INNER JOIN categorias cat ON prod.id_categoria=cat.id
        WHERE prod.id=${id} AND prod.estado=1
        ;
    `);
    return ({
        results,
        metadata
    });
}

const listaProductos = async() => {
    const [results, metadata] = await db.query(`
        SELECT prod.id, prod.nombre, prod.descripcion, prod.precio, prod.imagen, prod.estado, prod.created, prod.updated, prod.id_categoria, cat.tipo, cat.subcategoria, cat.categoria
        FROM productos prod
        INNER JOIN categorias cat ON prod.id_categoria=cat.id
        WHERE prod.estado!=0 
        ORDER BY prod.created DESC
        ;
    `);
    // console.log('hola');
    return ({
        results,
        metadata
    });
}

const listaProductosXcategoria = async(cat) => {
    const [results, metadata] = await db.query(`
        SELECT *
        FROM productos 
        WHERE id_catgoria=${cat} AND estado=1
        ;
    `);
    // console.log('hola');
    return ({
        results,
        metadata
    });
}

const crearProducto = async(id_categoria, id_creador, nombre, descripcion, precio, imagen) => {
    const fecha = Date.now();
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        INSERT INTO productos (id_categoria,id_creador,nombre,descripcion,precio,imagen,created,updated) 
        VALUES ("${id_categoria}","${id_creador}","${nombre}","${descripcion}","${precio}","${imagen}",${fecha},${fecha})
        ;
    `);
    return ({
        results,
        metadata
    });
}

const modificarProducto = async(id, id_categoria, nombre, descripcion, precio, imagen, estado=1) => {
    const fecha = Date.now();
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        UPDATE productos 
        SET 
            nombre = "${nombre}", 
            id_categoria="${id_categoria}",
            descripcion="${descripcion}", 
            precio="${precio}",
            imagen="${imagen}",
            estado="${estado}",
            updated="${fecha}"
        WHERE id=${id}
        ;
    `);
    return ({
        results,
        metadata
    });
}

const eliminarProducto = async(id) => {
    
    // await sequelize.authenticate();
    const [results, metadata] = await db.query(`
        DELETE FROM productos WHERE id = ${id}
        ;
    `);
    return ({
        results,
        metadata
    });
}
 

module.exports = {
    obtenerProducto,
    listaProductos,
    listaProductosXcategoria,
    crearProducto,
    modificarProducto,
    eliminarProducto,
}