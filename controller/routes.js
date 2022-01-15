const express = require('express');
const router = express.Router();
const User = require("../model/user.js");
const Admin = require("../model/admin.js");
const Flight = require("../model/flights.js");


router.route("/Userlogin")
    .post((req, res) => {
        const data = req.body;
        User.findOne({Email : data.email, Password : data.password}, (err, result) =>{
            if (result){
                // req.session.userid = result._id.toString();
                // res.cookie("sessionid", req.session.userid);
                res.send("success");
            }else {
                res.send("err")
            }
        });
    })
    

router.route("/Usersignup")
    .post((req, res) => {
        const {name, email, password, confirmpassword} = req.body;
        if (name && email && password && confirmpassword){
            User.findOne({Email : email}, async (err, result)=>{
                if (result){
                    console.log(result);
                    res.send("user already exits")
                }else{
                    const user = new User({Name : name, Email : email, Password : password});
                    await user.save();
                    User.findOne({Email : email}, (err1, result1)=>{
                        if(result1){
                            res.send("success");
                        }else{
                            res.send(`err1 ${err1}`);
                        }
                    })
                }
            })
        }
    });


router.route("/Adminsignup")
    .post((req, res) => {
        const data = req.body;
        if(data.name && data.email && (data.key === data.confirmkey)){
            Admin.findOne({Email : data.email}, async (err, result)=>{
                if (result){
                    res.send("Admin already exits")
                }else{
                    const admin = new Admin({Name : data.name, Email : data.email, Key : data.key});
                    await admin.save();
                    Admin.findOne({Email : data.email}, (err1, result1)=>{
                        if(result1){
                            res.send("success");
                        }else{
                            res.send(`err1 ${err1}`);
                        }
                    })
                }
            })
        }
    })


router.route("/Adminlogin")
    .post((req, res) => {
        const data = req.body;
        Admin.findOne({Email : data.email, Key : data.key}, (err, result) =>{
            if (result){
                req.session.userid = result._id.toString();
                res.cookie("sessionid", req.session.userid);
                res.send("success")
            }else {
                res.send("err")
            }
        });
    })


router.route("/Addflight")
    .post((req, res) => {
        const data = req.body;
        console.log(req);
        Flight.findOne({From : data.From, To : data.To, Date : data.Date, Departuretime : data.Departuretime}, async(err, result) => {
            if(result){
                res.send("fail");
            }else{
                const flight = new Flight({From : data.From, To : data.To, Date : data.Date, Departuretime : data.Departuretime,
                Arrivaltime : data.Arrivaltime, Flightcode : data.Flightcode, Cost : data.Flightcost});
                await flight.save();
                res.send("success");
            }
        })
    });


module.exports = router;