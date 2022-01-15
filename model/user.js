const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
});

const User = mongoose.model("user", userschema);

module.exports =  User;