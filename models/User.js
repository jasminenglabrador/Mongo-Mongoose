var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: "Article"
    }],

})

var User = mongoose.model("User", UserSchema)
module.exports = User