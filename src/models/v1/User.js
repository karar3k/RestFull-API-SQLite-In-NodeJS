const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../../seeders/database');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'user',
    timestamps: false,
    tableName: 'Users'
})

module.exports = User;