const express = require("express");
const router = express.Router();


router.get("/", (req, res)=>{
    // res.send("<h1>HEllo Ram Welcome Back<h1>");
    res.render("login")
})


router.get("/register", (req, res)=>{
    res.render("register")
})


router.get("/profile", (req, res)=>{
    res.render("profile")
})


router.get("/home", (req, res)=>{
    res.render("home")
})

module.exports = router;