const Post = require('../../../models/v1/Post')
const { validationResult } = require('express-validator');
const {success, error} = require('../../../../utils/responser')


const getAllPosts = async (req, res)=>{
    try {
        const posts = await Post.findAll();
        // res.send(posts);
        if(posts && posts.length==0){
            return res.status(404).json(error(404,"No Data"))
        }else{
            return res.status(200).json(success(200,posts,"Success Get All Posts"))
        }
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}

const getPostByID = async (req, res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findOne({where:{id:postId}})
        // res.send(post);
        if(post){
            return res.status(200).json(success(200,post,`Success Get Post Id : ${postId}`))
        }else{
            return res.status(404).json(error(404,"No Data"))
        }
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}

const createPost = async (req, res)=>{
    try {
        const returnObject = await Post.create(req.body)
        // res.send('post is insert')
        return res.status(201).json(success(201, returnObject,"Success Create New Post"))
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}

const updatePostByID = async (req, res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findOne({where:{id:postId}})
        if(!post){
            return res.status(404).json(error(404,"No Data"))
        }
        if(req.body.title){post.title = req.body.title}
        if(req.body.text){post.text = req.body.text}
        const returnObject = await post.save();
        // res.send('updated');        
        if(returnObject){
            return res.status(200).json(success(200,returnObject,`Success Update Post Id : ${postId}`))
        }
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}

const deletePostByID = async (req, res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.destroy({where:{id:postId}})
        // res.send("deleted");
        if(post){
            return res.status(200).json(success(200,post,`Success Delete Post Id : ${postId}`))
        }else{
            return res.status(404).json(error(404,"No Data"))
        }
    } catch (err) {
        return res.status(500).json(error(500,"Something went wrong"))
    }
}


module.exports = {
    getAllPosts,
    getPostByID,
    createPost,
    updatePostByID,
    deletePostByID
}