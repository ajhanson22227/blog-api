const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		min: 1,
		max: 255,
		required: true,
	},
	last_name: {
		type: String,
		min: 1,
		max: 255,
		required: true,
	},
	username: {
		type: String,
		min: 1,
		max: 255,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	status: {
		type: String,
		default: 'viewer',
	},
});

module.exports = mongoose.model('User', userSchema);
