'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts'})
    }

    toJSON(){
      //Ocultar el id
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      uuid:{
        //Oculta el identificador asignado, para el registro.
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'El usuario debe tener name' },
          notEmpty: { msg: 'Name no debe estar vacio' },
        },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El usuario debe tener email' },
        notEmpty: { msg: 'email no debe estar vacio' },
        isEmail: { msg: 'Ingrese un email correcto' },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El usuario debe tener role' },
        notEmpty: { msg: 'role no debe estar vacio' },
      },
    },
  }, {

    //Opciones 
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};