const Category = require("../models/category");

exports.AllCat = (req, res) => {
    return Category.allCategory();
}

exports.formCat = (req, res) => {
    res.render("./category/add", {
        title: "Add category"
    });
}

exports.addCat = (req, res) => {

    Category.addCategory(req.body.name).then(() => {
        res.redirect("/");
    });
}