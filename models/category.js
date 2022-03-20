const mongoose = require('mongoose');

/** 
 * final String title;
 * final String description;
 * final List<Post> posts;
 */

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
    likes: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Post'
                }
            }
        ],
    }
});

module.exports = CATEGORY = mongoose.model('Category', categorySchema)