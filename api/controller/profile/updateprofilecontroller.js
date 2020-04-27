const User=require("../../model/register");
module.exports= (request,response,next)=>{
    User.update({email:request.params.email},{$set:request.body}).exec().then(result=>{     
        response.status(200).json({
            message:"Updated Sucessfully",
            result:result
        });
    }
  
    ).catch(error=>{
        response.status(500).json({
          error:error
        });
    });
  }