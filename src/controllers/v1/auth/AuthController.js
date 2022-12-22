const User = require('../../../models/v1/User')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const {success, error} = require('../../../../utils/responser')

require('dotenv').config()
const SALT_HASH = process.env.SALT_HASH
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION


const signup = async (req, res)=>{
    let errors = validationResult(req).array();
    if(errors && errors.length>0)
    {
        return res.status(400).json(error(400,errors))
    }

    try { 
        // const salt = bcrypt.genSaltSync(10);
        const salt = bcrypt.genSaltSync(SALT_HASH);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const returnObject = await User.create({
            username:req.body.username,
            password:hash
            // password:req.body.password
            })
        // res.send("signup");
        if(returnObject){
            return res.status(200).json(success(200,{
                // returnObject                     // Print All Object
                id:returnObject.id,
                username:returnObject.username,
                password:returnObject.password,     // Remove it in future
            },"Register Successfully"))
        }else{
            return res.status(404).json(error(404,"No Data"))
        }            
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}

const signin = async (req, res)=>{
    let errors = validationResult(req).array();
    if(errors && errors.length>0)
    {
        return res.status(400).json(error(400,errors))
    }


    try {
        const login_username = req.body.username;
        const login_password = req.body.password;
        const user = await User.findOne({where:{ username:login_username}})
        if(user){
            const comparePassword = bcrypt.compareSync(login_password, user.password); // true or false
            if(comparePassword == true){
                let token = jwt.sign({
                    id:user.id
                },JWT_SECRET_KEY,{
                    // expiresIn:3600 // 1 hour
                    expiresIn:Number(TOKEN_EXPIRATION) // 3 hour get from .env
                })
                // res.send(token);            
                // res.send(user);
                // res.send("signin"); 
                return res.status(200).json(success(200,{
                    id:user.id,
                    username:user.username,
                    token:token
                },"Login Successfully"))
            }else{
                return res.status(404).json(error(404,"Password Error"))
            }
            
        }else{
            return res.status(404).json(error(404,"Username Not Found"))
        }       
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}


module.exports = {
    signup,
    signin,
}