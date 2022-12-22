const express = require('express')
const router = express.Router()
const {getAllPosts, getPostByID, createPost, updatePostByID, deletePostByID} = require('../../controllers/v1/posts/PostController')
const {notFound} = require('../../controllers/v1/notFound/NotFoundController')
const {param, check, body} = require('express-validator')

router.get('/', getAllPosts);
router.post('/', 
    // check("value").isLength({max:2}).withMessage('data enter is not required'),      // error code , just for test reject other input
    // .isLength({max:3}).withMessage('miss data required most enter'),                 // error code , just for test reject other input
    check('title').not().isEmpty().withMessage('title is required'), 
    check('text').not().isEmpty().withMessage('text is required'),
    body('title').isLength({min:3}).withMessage('title is small the min is 3')
    .isLength({max:20}).withMessage('title is large the max is 20'),                
    body('text').isLength({min:3}).withMessage('text is small the min is 3')
    .isLength({max:20}).withMessage('text is large the max is 20'),
createPost);
router.get('/:id', param('id').isInt(), getPostByID);
router.put('/:id', param('id').isInt(), updatePostByID);
router.delete('/:id', param('id').isInt(), deletePostByID);
router.all('/:id/*', notFound);
router.all('*', notFound);

module.exports = router;