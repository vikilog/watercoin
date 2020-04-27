const User=require("../../model/register");
module.exports=(request,response,next)=>{     
    User.update({email:request.params.email},{$set:{userProfile:request.file.originalname}}).exec().then(result=>{
     response.status(200).json({
         result:result
     });
    }); 
 }