require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {conectarDB} = require('./config/db');
// const global = require('./middlewares/global');

//crear el servidor
const app = express();

//usar middleware global
// app.use( global );

// conectar db
const db = conectarDB();

// Puerto
const port = process.env.PORT || 8081;

// Habilitar cors
// const opcionesCors = {
//     origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL2, process.env.FRONTEND_URL3]
// }
// app.use(cors(opcionesCors));
app.use(cors());

//Habilitar leer los valores
app.use( express.json() );

//habilitar carpetra publica
app.use(express.static('public'));

// Routas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/archivos', require('./routes/archivos'));
app.use('/api/categorias', require('./routes/categorias'));
// app.use('/api/archivos', require('./routes/archivos'));





//arrancar la app
app.listen(port,  () =>{
    console.log(`EL servidor esta corriendo en el puerto ${port}`);
});