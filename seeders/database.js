const {Sequelize} = require('sequelize')

require('dotenv').config()
const DATABASE = process.env.DATABASE;

const sequelize = new Sequelize('test-db', 'user', 'pass' , {
    dialect: "sqlite",
    // host: ":memory:"     // for storage in memory
    host: `./${DATABASE}.sqlite`    // for storage in file
})

module.exports = sequelize;