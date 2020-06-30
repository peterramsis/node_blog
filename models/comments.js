const mongoose = require("mongoose");
const commentSchame = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    body: {
        type: String
    }
});

const Comment = mongoose.model("post", commentSchame);
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/blogger';

exports.addComment = (name, email, body) => {

    return new Promise((reslove, reject) => {
        mongoose.connect(mongoDB).then(() => {
            let comment = Comment({
                name: name,
                email: email,
                body: body
            });
            return comment.save();
        }).then(() => {
            mongoose.disconnect();
            reslove();
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });

}

exports.AllComments = (name, email, body) => {

    return new Promise((reslove, reject) => {
        mongoose.connect(mongoDB).then(() => {
            return Comment.find({});
        }).then((comments) => {
            mongoose.disconnect();
            reslove(comments);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });

}