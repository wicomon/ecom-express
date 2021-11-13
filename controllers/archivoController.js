const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const subirArchivo = async (req, res) => {
    const configuracionMulter = {
        limits : { fileSize : 1024*1024*10},
        storage : filestorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../public/images/productos')
            },
            filename: (req, file, cb) =>{
                const extension = file.originalname.split('.').pop();
                console.log(file.mimetype.split('/'));
                cb(null, `${shortid.generate()}.${extension}`)
            },  
            // para bloquear algun tipo de archivo
            // fileFilter: (req, file, cb) =>{
            //     if (file.mimetype === "application/pdf") {
            //         return cb(null, true);   
            //     }
            // }
        })
    }
    
    const upload = multer(configuracionMulter).single('archivo');
    upload(req, res, async(error) => {
        if (!error) {
            return res.json({archivo: req.file.filename});
            // console.log(req.file);
        }else{
            return res.json({error})
        }
    });

}

const eliminarArchivo = async (req, res) => {
    const {archivo} = req.params;
    try {
        fs.unlinkSync(__dirname+`/../public/images/productos/${archivo}`);
        console.log('archivo eliminado');
        return res.json({msg: 'archivo eliminado'});
    } catch (error) {
        return res.json({error})
    }
}

const descargarArchivo = async(req, res, next) =>{
    const {archivo} = req.params;
    // obtiene el enlace
    const enlace = await Enlace.findOne({nombre : archivo});

    const archivoDescarga = __dirname + '/../uploads/' + archivo;
    res.download(archivoDescarga);

    const {descargas, nombre} = enlace;
    if (descargas === 1) {
        // si las descargas son igual a 1 borrar el archivo
        // req.archivo = nombre
        // console.log(enlace.id);
        // await Enlace.findByIdAndRemove(enlace.id);
        // next();
        
    }else{
        // si las descargas son mayor a 1 reducir la cantidad
        enlace.descargas--;
        await enlace.save();
    }

}

module.exports = {
    subirArchivo,
    eliminarArchivo,
    descargarArchivo,
}