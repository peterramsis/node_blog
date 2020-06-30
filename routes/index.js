var express = require('express');
var router = express.Router();
const postController = require("../controller/post.controller.js");
const catController = require("../controller/category.controller.js");
/* GET home page. */
router.get('/', postController.AllPost)
router.get('/addPost', postController.formPost)
router.post("/addpost", postController.addPost)

router.get('/addCat', catController.formCat)
router.post("/addcat", catController.addCat)
module.exports = router;