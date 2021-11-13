const express = require('express');
const { subirArchivo, descargarArchivo, eliminarArchivo} = require('../controllers/archivoController');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validarCampos');



const router = express.Router();

router.post('/',
    [
        validarJWT
    ],
    subirArchivo
);

// router.get('/:archivo',
//     // descargarArchivo,
//     eliminarArchivo
// );

router.delete('/:archivo',
    [
        validarJWT
    ],
    // descargarArchivo,
    eliminarArchivo
);

module.exports = router;