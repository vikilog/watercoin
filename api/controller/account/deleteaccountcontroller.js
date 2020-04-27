const User = require("../../model/register");
const Account=require("../../model/account");
const mongoose=require("mongoose");

module.exports=(request,response,next)=>{
    User.find({email:request.body.email}).exec().then(user=>{
        if(user.length===1){
            Account.find({accountnumber:request.body.accountnumber}).exec().then(account=>{
                if(account.length===1){
                   Account.remove({accountnumber:request.body.accountnumber}).exec().then(result=>{
                    return response.status(200).json({
                        message:"Account deleted",
                        result:result
                    });
                   }).catch(error=>{
                       return response.status(500).json({
                        message:"Error while deleting card",
                        error:error
                       });
                   });                
                }
                else{
                    return response.status(500).json({
                        message:"Error.Try Again"
                    });
                }
            });
        }
        else{
           return response.status(409).json({
                message:"Auth Failed"
            });
        }
    }).catch(error=>{
        return response.status(404).json({
            message:"User not found",
            error:error
        })
    });
};