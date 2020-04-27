const express=require("express");
const route=express.Router();
const deleteContoller=require("../../controller/card/deletecardcontroller");
route.delete("/",deleteContoller);
module.exports=route;