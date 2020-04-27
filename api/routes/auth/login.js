const express = require("express");
const route = express.Router()
const loginController=require("../../controller/auth/logincontroller");
route.post("/",loginController);
module.exports = route;