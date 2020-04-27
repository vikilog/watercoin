const User = require("../../model/register");
const Account=require("../../model/account");
module.exports=(request,response,next)=>{
    User.find({email:request.params.email}).exec().then(user=>{
        if(user.length===1){
            Account.find({accountnumber:request.params.accountnumber}).exec().then(account=>{
        if(account.length===1){
             Account.update({accountnumber:request.params.accountnumber},{$set:request.body}).exec().then(result=>{
                return response.status(200).json({
                    message:"Updated",
                    result:result
                });
                    }).catch(error=>{
                        return response.status(500).json({
                            message:"Update fail",
                            result:result
                        });
                    });
                   
                }
                else{
                    return response.status(500).json({
                        message:"No account found",
                        
                    });
                }
               
            }).catch(error=>{
                return response.status(500).json({
                    message:"Error while updating",
                    error:error
                });
            });
        }
        else{
            return response.status(409).json({
                message:"User verification fail"
            });
        }
    }).catch(error=>{
        return response.status(409).json({
            message:"User not found"
        });
    });
};