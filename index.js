const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const authRouter = require('./src/routes/v1/auth')
const postRouter = require('./src/routes/v1/post')
const notFoundRouter = require('./src/routes/v1/notFound')
const {verifyToken} = require('./src/middlewares/verifyJWT')
const sequelize = require('./seeders/database')


require('dotenv').config()
const URL = process.env.URL;
const APP_PORT = process.env.APP_PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
console.log('Starting...')


// Connecting to sqlite
if(ENVIRONMENT == 'development'){
    // use this if need use exist database 
    sequelize.sync().then(() => console.log('db is ready'));
    // use this if need run app every time database from zero
    // sequelize.sync({force:true}).then(() => console.log('db is ready'));
}else{
    console.log("This Is Production & Testing , Coming Soon ... ")
}


// middleware
app.use(express.json())
app.use(express.static('public'))
app.use(cors())


// for parsing application/json
app.use(bodyParser.json()); 


// for testing
app.get('/', function (req, res) {
  res.send('<h1>This is Test Restful API Use Postman</h1>')
})


// call routers
app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/posts`,[verifyToken], postRouter);
app.use(`${URL}/*`, notFoundRouter);
app.use('*', notFoundRouter);


app.listen(APP_PORT)