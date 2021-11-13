
const {listarCategorias} = require('../models/Categoria')
;

const getCategorias = async(req, res) => {
    
    const {results} = await listarCategorias();
    // const {results, metadata} = usuarios;
    return res.json({
        results
    });
}



module.exports = {
    getCategorias
}