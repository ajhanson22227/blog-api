const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
	registerValidation,
	loginValidation,
} = require('../validation');

exports.register = async (req, res) => {
	//validate user data
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).json(error.details[0].message);
	//check if username exists
	const usernameExist = await User.findOne({
		username: req.body.username,
	});
	if (usernameExist) {
		return res.status(400).json('Username Already Exists');
	}
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		password: hashPassword,
		status: 'viewer',
	});
	//create and sign jwt token to be automatically logged in
	const token = jwt.sign(
		{ _id: user._id },
		process.env.TOKEN_SECRET,
	);

	try {
		await user.save();
		res.send({
			user: {
				username: user.username,
				status: user.status,
				token: token,
			},
		});
	} catch (err) {
		res.status(400).json(err);
	}
};

exports.login = async (req, res) => {
	//validate user data
	let count = 1;
	console.log(`step ${count}`);
	count += 1;
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).json(error.details[0].message);
	console.log(`step ${count}`);
	count += 1;

	//check for username in db
	const user = await User.findOne({ username: req.body.username });
	console.log(`step ${count}`);
	count += 1;
	if (!user) {
		return res.status(400).json('Invalid Email');
	}
	console.log(`step ${count}`);
	count += 1;

	//check if password is correct
	const validPass = await bcrypt.compare(
		req.body.password,
		user.password,
	);
	if (!validPass) {
		return res.status(400).json('Invalid Password');
	}

	//create and sign user token
	const token = jwt.sign(
		{ _id: user._id },
		process.env.TOKEN_SECRET,
	);
	res.send({
		user: {
			username: user.username,
			status: user.status,
			token: token,
		},
	});
};
