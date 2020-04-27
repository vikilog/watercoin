const express=require("express");
const route=express.Router()
const updateAccountController=require("../../controller/account/updateaccountcontroller");
route.put("/:email/:accountnumber",updateAccountController);
module.exports=route;