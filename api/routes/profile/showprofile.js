const express = require("express");
const route = express.Router()
const profileController=require("../../controller/profile/showprofilecontroller");
route.post("/",profileController);
module.exports = route;