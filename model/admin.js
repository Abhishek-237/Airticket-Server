const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Key : {
        type : Number,
        required : true
    }
});

const admin = mongoose.model("admin", adminschema);

module.exports = admin;