const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.get_comments = async (req, res) => {
	const comments = await Comment.find({ post: req.params.postid });
	res.json(comments);
};

exports.create_comment = async (req, res) => {
	const comment = await new Comment({
		text: req.body.text,
		author: req.user._id,
		post: req.params.postid,
	});

	try {
		//save comment
		await comment.save();
		//update post with new comment Num
		return;
	} catch (err) {
		res.status(400).send(err);
	}
};

exports.delete_comment = async (req, res) => {
	try {
		await Comment.findByIdAndDelete(req.params.commentid);
		res.send('Deleted Comment');
	} catch (err) {
		res.status(400).send(err);
	}
};
