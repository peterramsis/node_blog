const Post = require("../models/posts");
const categories = require('../controller/category.controller');
const { use } = require("../routes");
exports.AllPost = (req, res) => {

    Post.allPost().then((posts) => {
        res.render("index", {
            title: "home",
            posts: posts,
        });
    })

}

exports.formPost = (req, res) => {



    categories.AllCat().then((category) => {
        res.render("./post/add", {
            title: "Add",
            category: category
        });
    });


}

exports.addPost = (req, res) => {

    Post.addPost(req.body.name, req.body.des, req.body.author, req.body.category).then(() => {
        res.redirect("/");
    });
}


exports.getPost = (req, res) => {
    Post.getPost(req.params.id).then((post) => {
        res.render("post/post", {
            title: "post",
            "post": post,
            "postId": req.params.id
        })
    })

}

exports.addComments = (req, res) => {

    Post.addComment(req.body.postId, req.body.name, req.body.email, req.body.body).then(() => {
        res.redirect("/post/" + req.body.postId);
    }).catch((err) => {
        console.log(err);
        console.log(err);
    });
}