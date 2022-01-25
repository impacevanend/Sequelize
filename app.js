const express = require('express');



//Conexión a nuestra base de datos

const {sequelize, User} = require('./models');

const app = express();
app.use(express.json());

//Crear usuario en la base de datos
app.post('/users', async(req, res)=>{
    const {name, email, role} = req.body;

    try {

        const user = await User.create({name, email, role})
        return res.json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

//Obtener todos los usuarios
app.get('/users', async(req, res)=>{

    try {

        const users = await User.findAll();
        return res.json(users);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Somenthing went wrong'});
    }

});


//Obtener sólo uno de los usuarios
app.get('/users/:uuid', async(req, res)=>{

    const uuid = req.params.uuid;

    try {

        const users = await User.findOne({
            where: {uuid},
        });
        return res.json(users);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Somenthing went wrong'});
    }

});

    app.listen({port: 5000}, async()=>{
        console.log(`Server is running on port http://localhost:5000`);
        // mira los modelos (creación de tablas, según los modelos)
       // await sequelize.sync({force: true});//forzas cambios en la base de datos
       await sequelize.authenticate();
        console.log('Database connected!');
    })


