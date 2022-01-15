const mongoose = require("mongoose");

const flightschema = new mongoose.Schema({
    From : {
        type : String,
        required : true
    },
    To : {
        type : String,
        required : true
    },
    Date : {
        type : String,
        required : true
    },
    Departuretime : {
        type : String,
        required : true
    },
    Arrivaltime : {
        type : String,
        required : true
    },
    Flightcode : {
        type : String,
        required : true
    },
    Cost : {
        type : Number,
        required : true
    }
});

const Flight = mongoose.model("Flight", flightschema);

module.exports =  Flight;