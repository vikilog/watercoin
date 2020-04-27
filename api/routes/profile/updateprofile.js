const express = require("express");
const route = express.Router()
const updateController=require("../../controller/profile/updateprofilecontroller");
route.put("/:email",updateController);
module.exports = route;