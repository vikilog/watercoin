const User=require("../../model/register");
const Account=require("../../model/account");

module.exports=(request,response,next)=>{
    User.find({email:request.body.email}).exec().then(user=>{
        if(user.length===1){
            Account.find({email:request.body.email}).exec().then(accounts=>{
                if(accounts.length >=1){
                    return response.status(200).json({
                        message:"Ok",
                        accounts:accounts
                    });
                }
                else{
                    return response.status(500).json({
                        message:"Account not found"
                    });
                }
            }).catch(error=>{
                return response.status(500).json({
                    message:"Account verification fail",
                    error:error
                });
            });
        }
        else{
            return response.status(409).json({
                message:"User Validation fail"
            });
        }
    }).catch(error=>{
        return response.status(409).json({
            message:"User not found",
            error:error
        });
    });
};