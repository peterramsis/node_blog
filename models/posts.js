const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const postSchame = mongoose.Schema({
    name: {
        type: String
    },
    des: {
        type: String
    },
    author: {
        type: String
    },
    category: {
        type: String
    },
    comments: [{
        name: String,
        body: String,
        email: String
    }]
});
postSchame.plugin(mongoosePaginate);
const Post = mongoose.model("post", postSchame);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/blogger';



exports.addPost = (name, des, author, category) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

            return Post.findOne({ name: name });

        }).then((post) => {

            if (!post) {
                let newPost = Post({
                    name: name,
                    author: author,
                    des: des,
                    category: category
                });
                return newPost.save();
            } else {
                mongoose.disconnect();
                reject("this post is exist before");
            }

        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });

    })


}

exports.allPost = () => {
    return new Promise((resolve, reject) => {

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Post.find({});

        }).then((posts) => {
            mongoose.disconnect();
            resolve(posts);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })

    });
}


exports.getPost = (id) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Post.findById(id);
        }).then((post) => {
            mongoose.disconnect();
            resolve(post);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })

    });
}

exports.addComment = (id, name, email, body) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Post.updateOne({ _id: id }, {
                "$push": {
                    comments: {
                        name: name,
                        body: body,
                        email: email
                    }
                }
            });
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })

    });
}