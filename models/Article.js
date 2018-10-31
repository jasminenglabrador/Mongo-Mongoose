var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    link: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    preview: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        trim: true
    }
})

var Article = mongoose.model("Article", ArticleSchema)
module.exports = Article