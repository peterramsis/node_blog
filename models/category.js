const mongoose = require("mongoose");
const categorySchame = mongoose.Schema({
    name: {
        type: String
    }
});

const Category = mongoose.model("category", categorySchame);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/blogger';



exports.addCategory = (name) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

            return Category.findOne({ name: name });

        }).then((category) => {

            if (!category) {
                let newCategory = Category({
                    name: name
                });
                return newCategory.save();
            } else {
                mongoose.disconnect();
                reject("this catgeory is exist before");
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

exports.allCategory = () => {
    return new Promise((resolve, reject) => {

        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Category.find({});

        }).then((cat) => {
            mongoose.disconnect();
            resolve(cat);
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        })

    });
}