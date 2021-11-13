const express = require('express');
const { check } = require('express-validator');
const { putAuth, login, usuarioLogeado } = require('../controllers/authController');
const {validarCampos, validarJWT, esMismoUsuario} = require('../middlewares');

const router = express.Router();

router.get('/',
    [
        validarJWT
    ],
    usuarioLogeado
);

router.post('/',
    [
        check('correo', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').isEmail(),
        check('password', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.put('/:id',
    [
        validarJWT,
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos,
        esMismoUsuario
    ],
    putAuth
);


module.exports = router;