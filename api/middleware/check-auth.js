const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
    try{
        const token=request.header.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_KEY);
        request.userData=decoded;
        next()
    }
    catch(error){
        return response.status(409).json({
            message:"Auth Failed"
        });
    }
}


