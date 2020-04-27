const express=require("express");
const route=express.Router()
const viewAccountController=require("../../controller/account/viewaccountController");
route.post("/",viewAccountController);
module.exports=route;