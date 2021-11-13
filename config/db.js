const Sequelize = require('sequelize');

const db = new Sequelize('gestion', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

const conectarDB = async() => {
    try {
        // const sequealize = new Sequelize('gestion', 'root', '', {
        //     host: 'localhost',
        //     dialect: 'mysql',
        //     port: '3306', //-------------> change port here
        //     // logging: false,
        // });
        // await sequealize.authenticate();
        await db.authenticate();
        // const db ={};
        // db.Sequelize = Sequelize;
        // db.sequealize = sequealize;
        // sequealize.query(`
        // INSERT INTO usuarios (dni,nombres,apellidos,correo) 
        // VALUES ("71833971","williams","cordova villalva","wcv.94@hotmail.com");
        // `)
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }  
}



module.exports={conectarDB, db};
