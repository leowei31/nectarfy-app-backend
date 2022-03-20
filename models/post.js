const mongoose = require('mongoose');

/** 
 * final User user;
 * final String title;
 * final String description;
 * final DateTime datePosted;
 * final num numOfLikes;
 * final List<Comment> comments;
 */

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        // type: String,
        ref: 'User',
        required: true,
    },
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
    datePosted: {
        type: Date,
        required: true,
    },
    likes: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'User'
                }
            }
        ],
    },
    comments: {
        type: [
            {
                comment: {
                    type: String,
                    required: true
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                datePosted: {
                    type: Date,
                    required: true
                }
            }
        ],
    },
});

module.exports = POST = mongoose.model('Post', postSchema)