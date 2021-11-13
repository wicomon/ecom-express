const {db} = require('../config/db');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const {obtenerProducto, listaProductos, listaProductosXcategoria, crearProducto, 
    modificarProducto, eliminarProducto} = require('../models/Producto')
;
const bcrypt = require('bcryptjs');

const getProducto = async(req, res) => {
    const {id} = req.params;
    const {results} = await obtenerProducto(id);
    // const {results, metadata} = usuarios;
    return res.json({
        results
    });
}

const getProductos = async(req, res) => {
    
    const {results} = await listaProductos();
    // const {results, metadata} = usuarios;
    return res.json({
        results
    });
}

const getProductosCat = async(req, res) => {

    const {categoria} = req.params;
    const {results} = await listaProductosXcategoria(categoria);
    // const {results, metadata} = usuarios;
    return res.json({
        results
    });
}

const postProducto = async(req, res) => {

    const {id_categoria, id_creador,  nombre, descripcion, precio, imagen} = req.body;
    // console.log({dni, nombres, apellidos, correo, password,categoria});
    // encriptar la contraseña
    console.log(req.body);

    try {
        // await sequelize.authenticate();
        const {results, metadata} = await crearProducto(id_categoria, id_creador,  nombre.trim(), descripcion, precio, imagen);
    
        return res.status(200).json({
            id_producto: results,
            msg : metadata
        });
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear el producto',
            error : error.errors[0].message
        });
    }
    
}

const putProducto = async(req, res) => {
    
    const {id} = req.params;
    console.log('el id es : ' +id);
    const {nombre,id_categoria, descripcion, precio, imagen, estado} = req.body;
    console.log({nombre, descripcion, precio, imagen, estado});

    try {
        // await sequelize.authenticate();
        const {results, metadata} = await modificarProducto(id, id_categoria, nombre.trim(), descripcion.trim(), precio, imagen, estado);
    
        return res.status(200).json({   
            estado : metadata.affectedRows,
            msg: 'Se modifico el producto'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0] ? error.errors[0].message : error
        });
    }
    
}

const deleteProducto = async(req, res) => {

    const {id} = req.params

    try {
        // await sequelize.authenticate();
        // const producto = await obtenerProducto(id);
        // const nombre_imagen = producto['results'][0].imagen;
        const {results, metadata} = await eliminarProducto(id);
        
        if (metadata.affectedRows==0) {
            return res.status(400).json({
                msg: 'No existe producto con ese id'
            });
        }
    
        return res.status(200).json({
            estado : metadata.affectedRows,
            msg: 'Se elimino el registro del producto'
        });
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se completo la operacion',
            error : error.errors[0].message
        });
    }
    
}


module.exports = {
    getProducto,
    getProductos,
    getProductosCat,
    postProducto,
    putProducto,
    deleteProducto,
}