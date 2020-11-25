const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verify = function (req, res, next) {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		//verified is an object with user id
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid token');
	}
};

exports.verifyAdmin = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = await jwt.verify(
			token,
			process.env.TOKEN_SECRET,
		);
		const user = await User.findById(verified._id);

		//verify user is admin
		if (user.status !== 'admin') {
			return res.status(400).send('Access Not Allowed');
		}
		//verified is an object with user id
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid token');
	}
};
