const express=require("express");
const route=express.Router()
const addAccountController=require("../../controller/account/addaccountcontroller");
route.post("/",addAccountController);
module.exports=route;