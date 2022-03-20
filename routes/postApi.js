const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

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

// @route   GET /post/category/:catId
// @desc.   Retrieve post by id
// @access  Public 
router.get('/category/:catId', async (req, res) => {
    try {

        // const posts = await Post.findById(req.params.catId);
        const posts = await Post.find({category: req.params.catId});

        if (!posts) {
            return res.status(404).json({msg: "Could not find post."});
        }

        for (const post of posts) {
            const user = await User.findById(post.user, '-password -_id');

            for (const comment of post.comments) {
                const commentUser = await User.findById(comment.userId, '-password -_id');
                comment._doc.username = commentUser.name;
            }

            post._doc.username = user.name;
        }

        console.log(posts);

        res.json(posts);

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
    check('category', 'Category is required').not().isEmpty(),
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
        category: req.body.category,
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