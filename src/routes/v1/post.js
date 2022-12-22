const express = require('express')
const router = express.Router()
const {getAllPosts, getPostByID, createPost, updatePostByID, deletePostByID} = require('../../controllers/v1/posts/PostController')
const {notFound} = require('../../controllers/v1/notFound/NotFoundController')

router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/:id', getPostByID);
router.put('/:id', updatePostByID);
router.delete('/:id', deletePostByID);
router.all('*', notFound);

module.exports = router;