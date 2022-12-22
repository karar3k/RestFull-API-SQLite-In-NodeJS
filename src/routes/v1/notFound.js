const express = require('express')
const router = express.Router()
const {notFound} = require('../../controllers/v1/notFound/NotFoundController')

router.all('*', notFound);

module.exports = router;