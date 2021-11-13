const express = require('express');
const { check } = require('express-validator');
const { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarioController');
const {validarCampos, validarJWT, esAdminRole, esMismoUsuario} = require('../middlewares');

const router = express.Router();

router.get('/:id',
    [
        validarJWT,
        check('id', 'El id es obligatorio').not().isEmpty(),
    ],
    getUsuario
);
router.get('/',
    [
        validarJWT
    ],
    getUsuarios
);
router.post('/',
    [
        check('dni', 'El nombre es obligatorio').not().isEmpty(),
        check('nombres', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').isEmail(),
        check('password', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    postUsuario
);

router.put('/:id',
    [
        validarJWT,
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('dni', 'El nombre es obligatorio').not().isEmpty(),
        check('nombres', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El nombre es obligatorio').isEmail(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        validarCampos,
        esMismoUsuario
    ],
    putUsuario
);

router.delete('/:id',
    [
        validarJWT,
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
        esAdminRole
    ],
    deleteUsuario
);

module.exports = router;