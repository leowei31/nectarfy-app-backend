const mongoose = require('mongoose');

/** 
 * final User user;
 * final String comment;
 * final DateTime datePosted;
 */

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
	comment: {
		type: String,
		required: true,
	},
    datePosted: {
        type: Date,
        required: true,
    },
});

module.exports = COMMENT = mongoose.model('Comment', commentSchema)