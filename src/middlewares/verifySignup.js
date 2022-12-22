const User = require('../models/v1/User')
const {error} = require('../../utils/responser')

const checkUserDuplicate = async (req,res, next)=>{
    const user = await User.findOne({
        where:{username:req.body.username}
    })

    if(user)
    {
        return res.status(409).json(error(409,"User already exists"))
    }
    next()
}

module.exports = {checkUserDuplicate}