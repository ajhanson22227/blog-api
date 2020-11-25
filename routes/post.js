var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const verify = require('./verifytoken');

router.get('/', postController.get_posts);

router.get('/published', postController.get_published_posts);

router.get('/:id', postController.get_post_selected);

router.post(
	'/create',
	verify.verifyAdmin,
	postController.create_post,
);

router.delete(
	'/:postid/delete',
	verify.verifyAdmin,
	postController.delete_post,
);

module.exports = router;
