const {Model, DataTypes} = require('sequelize');
const sequelize = require('../../../seeders/database');

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'post',
    timestamps: false,
    tableName: 'Posts'
})

module.exports = Post;