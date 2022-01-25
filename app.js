//Conexión a nuestra base de datos

const {sequelize} = require('./models');

async function main(){
    // mira los modelos (creación de tablas, según los modelos)
    await sequelize.sync({force: true});//forzas cambios en la base de datos
}

main();