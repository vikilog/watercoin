const express=require("express");
const route=express.Router()
const deleteAccountController=require("../../controller/account/deleteaccountcontroller");
route.delete("/",deleteAccountController);
module.exports=route;