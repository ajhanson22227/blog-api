const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		max: 500,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	Date: {
		type: Date,
		default: Date.now,
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
