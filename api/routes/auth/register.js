const express = require("express");
const route = express.Router();
const signUpController=require("../../controller/auth/signupcontroller");
route.post("/",signUpController);
module.exports = route;