const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.get_posts = async (req, res) => {
	const posts = await Post.find({});
	res.json(posts);
};

exports.get_published_posts = async (req, res) => {
	const posts = await Post.find({ published: true });
	res.json(posts);
};

exports.get_post_selected = (req, res, next) => {
	Post.findById(req.params.id, function (err, item) {
		if (err) return next(err);
		res.json(item);
	});
};

exports.create_post = async (req, res) => {
	const post = new Post({
		title: req.body.title,
		text: req.body.text,
		published: req.body.published,
	});
	try {
		await post.save();
		res.send(post);
	} catch (err) {
		res.status(400).send(err);
	}
};

// eslint-disable-next-line no-unused-vars
exports.delete_post = async (req, res) => {
	await Comment.deleteMany({ post: req.params.postid });
	await Post.findByIdAndDelete(req.params.postid);
	return;
};
