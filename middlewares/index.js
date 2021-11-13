const validaCampos  = require('./validarCampos');
const validaJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');
// const  validarArchivoSubir  = require('./validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    // ...validarArchivoSubir
}