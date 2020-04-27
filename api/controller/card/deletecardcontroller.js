const User=require("../../model/register");
const Card=require("../../model/card");
const bcrypt=require("bcrypt");

module.exports=(request,response,next)=>{
    User.find({email:request.body.email}).then(user=>{
        if(user.length > 1 && user,this.length<1){
            return response.status(409).json({
                message:"Auth Failed",
                            
            });
        }
        else{
           bcrypt.compare(request.body.password,user[0].password,(error,result)=>{
               if(result===false){
                return response.status(500).json({
                    message:"Wrong Password"
                });
               }
            if(result){
                Card.find({cardnumber:request.body.cardnumber}).exec().then(card=>{
                    if(card.length===1){
                        Card.remove({cardnumber:request.body.cardnumber}).exec().then(result=>{
                            return response.status(200).json({
                                message:"card deleted",
                                result:result
                            });
                        });
                    }
                    else{
                        return response.status(500).json({
                            message:"Fail to verify card"
                        });
                    }
                    
                });
            }
           });
        }

    }).catch(error=>{
        response.status(409).json({
            message:"User not found",
            error:error
        });
    });
}