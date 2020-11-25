var express = require('express');
var router = express.Router();
const commentController = require('../controllers/commentController');
const verify = require('./verifytoken');

router.get('/:postid', commentController.get_comments);

router.post(
	'/:postid/create',
	verify.verify,
	commentController.create_comment,
);

router.delete(
	'/:commentid/delete',
	verify.verifyAdmin,
	commentController.delete_comment,
);

module.exports = router;
