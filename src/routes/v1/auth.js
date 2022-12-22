const express = require('express')
const router = express.Router()
const {signup , signin} = require('../../controllers/v1/auth/AuthController')
const {notFound} = require('../../controllers/v1/notFound/NotFoundController')
const {check, body} = require('express-validator')
const {checkUserDuplicate} = require('../../middlewares/verifySignup')

// router.post('/signup', signup);
// router.post('/signin', signin);
// app.use(`${URL}/auth`, [checkUserDuplicate], authRouter);
router.post('/signup', [checkUserDuplicate],
                check('username').not().isEmpty().withMessage('username is required'), 
                check('password').not().isEmpty().withMessage('password is required'),
                body('username').isLength({min:5}).withMessage('username is small the min is 5')
                .isLength({max:8}).withMessage('username is large the max is 8'),                
                body('password').isLength({min:5}).withMessage('password is small the min is 5')
                .isLength({max:8}).withMessage('password is large the max is 8')
            ,signup)

router.post('/signin', 
                check('username').not().isEmpty().withMessage('username is required'), 
                check('password').not().isEmpty().withMessage('password is required')
            ,signin)

router.all('/*', notFound);
router.all('*', notFound);

module.exports = router;