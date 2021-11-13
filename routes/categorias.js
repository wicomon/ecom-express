const express = require('express');
const { check } = require('express-validator');
const {getCategorias} = require('../controllers/categoriasController');
const {validarJWT} = require('../middlewares');

const router = express.Router();

router.get('/',
    [
        validarJWT
    ],
    getCategorias
);


module.exports = router;