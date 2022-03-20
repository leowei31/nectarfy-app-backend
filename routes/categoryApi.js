const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../models/post');
const Category = require('../models/category');

// @route   GET /category
// @desc.   get all categories in database
// @access  Public 
router.get('/', async (req, res) => {

    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({msg: 'Could not find any categories'});
        }

        res.json(categories);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});

// @route   PUT /category
// @desc.   Create a new category
// @access  Public
router.put('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
], async (req, res) => {
    
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({errors: validationErrors.array()});
    }

    const newCategory = Category({
        title: req.body.title,
        description: req.body.description,
        comments: req.body.posts,
    })

    await newCategory.save(function (err, newCategory) {
        if (err) {
            res.json({success: false, msg: err})
        }
        else {
            res.json({success: true, msg: 'Successfully posed'})
        }
    })

});

// @route   GET /category/:catId
// @desc.   Get category by Id
// @access  Public
router.get('/:catId', async (req, res) => {

    try {
        const cat = await Category.findById(req.params.catId);

        if (!cat) {
            return res.status(404).json({msg: "Could not find cate"});
        }

        res.json(cat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});

// @route   DELETE /category/:catId
// @desc.   Delete category by Id
// @access  Public
router.delete('/:catId', async (req, res) => {
    try {
        const cat = await Category.findById(req.params.catId);
        await cat.remove();
        res.json({msg: 'Cat deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }

});


module.exports = router;