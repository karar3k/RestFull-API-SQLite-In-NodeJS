const {success, error} = require('../../../../utils/responser')

const notFound = async (req, res)=>{ 
    return res.status(404).json(error(404,"Not Found API"))
}

module.exports = {
    notFound,
}