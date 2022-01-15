const express =  require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongostore = require("connect-mongo");
const routes = require("./controller/routes")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

mongoose.connect("mongodb://127.0.0.1:27017/Airticket");

app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false,
    store : mongostore.create({mongoUrl : "mongodb://localhost:27017/Airticket"})
}))


app.use("", routes);

app.listen( port, () => {
    console.log(`Server is listening to port ${port}`); 
});