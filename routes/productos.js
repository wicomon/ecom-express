const express = require('express');
const { check } = require('express-validator');
const {getProducto, getProductos, getProductosCat, postProducto, putProducto, deleteProducto} = require('../controllers/productoController');
const {validarCampos, validarJWT, esMismoUsuario} = require('../middlewares');

const router = express.Router();

router.get('/',
    [
        validarJWT
    ],
    getProductos
);

router.get('/:id',
    [
        validarJWT
    ],
    getProducto
);

router.post('/',
    [
        validarJWT,
        // check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'descripcion es obligatorio').not().isEmpty(),
        check('precio', 'precio es obligatorio').not().isEmpty(),
        check('precio', 'precio debe ser un numero mayor a Cero').isFloat({ gt: 0.0 }),
        check('imagen', 'imagen es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postProducto
);

router.put('/:id',
    [
        validarJWT,
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'descripcion es obligatorio').not().isEmpty(),
        check('precio', 'precio es obligatorio').not().isEmpty(),
        check('precio', 'precio debe ser un numero mayor a Cero').isFloat({ gt: 0.0 }),
        check('imagen', 'imagen es obligatorio').not().isEmpty(),
        check('estado', 'estado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    putProducto
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteProducto
);


module.exports = router;