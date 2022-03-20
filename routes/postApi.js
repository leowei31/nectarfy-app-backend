const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../models/post');

// @route   GET /post
// @desc.   Test route
// @access  Public 
router.get('/', (req, res) => res.send('post route working'));

// @route   GET /post/:postId
// @desc.   Retrieve post by id
// @access  Public 
router.get('/:postId', async (req, res) => {
    try {

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({msg: "Could not find post."});
        }

        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /post
// @desc.   Post a post
// @access  Public 
router.post('/', [
    check('user', 'User is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('datePosted', 'Date posted is required').not().isEmpty(),
], async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({errors: validationErrors.array()});
    }

    const newPost = Post({
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        datePosted: req.body.datePosted,
        likes: req.body.likes,
        comments: req.body.comments,
    })

    await newPost.save(function (err, newPost) {
        if (err) {
            res.json({success: false, msg: err})
        }
        else {
            res.json({success: true, msg: 'Successfully posed'})
        }
    })

    
})

// @route   DELETE /post/:postId
// @desc.   Delete post by id
// @access  Public 
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        await post.remove();
        res.json({msg: 'Post deleted!'})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;