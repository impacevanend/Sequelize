const express = require('express');
const { user } = require('pg/lib/defaults');



//Conexión a nuestra base de datos

const { sequelize, User, Post } = require('./models')  

const app = express();
app.use(express.json());

//USUARIO:
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
            include: 'posts',
        });
        return res.json(users);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Somenthing went wrong'});
    }

});

//Eliminar usuario
app.delete('/users/:uuid', async(req, res)=>{

    const uuid = req.params.uuid;

    try {

        const users = await User.findOne({where: {uuid},});
        await users.destroy();

        return res.json({message:'User deleted!'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Somenthing went wrong'});
    }

});

//Actualizar usuario
app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, role } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
      user.name = name
      user.email = email
      user.role = role
  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

//POST:
//Crear usuario en la base de datos
app.post('/posts', async (req, res) => {
    const { userUuid, body } = req.body
  
    try {
      const user = await User.findOne({ where: { uuid: userUuid } })
  
      const post = await Post.create({ body, userId: user.id })
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  //Obtener todos los posts los

  app.get('/posts', async (req, res) => {
  
    try {

        const posts = await Post.findAll({include: ['user']});
   
      return res.json(posts)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })



  //Final de enpoints

    app.listen({port: 5000}, async()=>{
        console.log(`Server is running on port http://localhost:5000`);
        // mira los modelos (creación de tablas, según los modelos)
       // await sequelize.sync({force: true});//forzas cambios en la base de datos
       await sequelize.authenticate();
        console.log('Database connected!');
    })



