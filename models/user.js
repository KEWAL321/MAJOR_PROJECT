const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");// automatically defines username and password in the schema so, we dont need to define explicitly in schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose);;

module.exports = mongoose.model("User", userSchema);