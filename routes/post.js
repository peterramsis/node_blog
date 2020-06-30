var express = require('express');
var router = express.Router();
var postController = require("../controller/post.controller");

/* GET users listing. */
router.get('/:id', postController.getPost);
router.post('/addComment', postController.addComments);
module.exports = router;