const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},

	text: {
		type: String,
		max: 500,
		required: true,
	},

	date: {
		type: String,
		default: DateTime.fromJSDate(new Date()).toLocaleString(
			DateTime.DATETIME_MED,
		),
	},

	comments: {
		type: Number,
		default: 0,
	},

	published: {
		type: Boolean,
		default: false,
	},
});

postSchema.virtual('date_formatted').get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(
		DateTime.DATETIME_MED,
	);
});
module.exports = mongoose.model('Post', postSchema);
