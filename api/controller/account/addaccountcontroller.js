const User = require("../../model/register");
const Account=require("../../model/account");
const mongoose=require("mongoose");

module.exports=(request,response,next)=>{
    User.find({email:request.body.email}).exec().then(user=>{
        if(user.length===1){
            Account.find({accountnumber:request.body.accountnumber}).exec().then(account=>{
                if(account.length===0){
                    const account=new Account({
                        _id:new mongoose.Types.ObjectId,
                        accountnumber:request.body.accountnumber,
                        alias:request.body.alias,
                        address:request.body.address,
                        email:request.body.email,
                        userId:request.body.userId,
                    });
                    account.save().then(result=>{
                        return response.status(200).json({
                            message:"Account added sucessfully",
                            result:result
                        })
                    }).catch(error=>{
                        return response.status(500).json({
                            message:"Failed to add Card.Try Again",
                            error:error
                        });
                    });
                }
                else{
                    return response.status(404).json({
                        message:"Duplicate account"
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