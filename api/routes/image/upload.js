const express = require("express");
const route = express.Router()
const uploadContoller=require("../../controller/image/uploadcontroller");
const checkImage=require("../../middleware/check-upload");
route.post("/:email",checkImage.single("userProfile"),uploadContoller);
module.exports=route;