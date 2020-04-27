const User = require("../../model/register")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports=(request,response,next)=>{
    User.find({email:request.body.email}).select("firstname lastname email mobile_no userProfile").exec().then(user=>{
        response.status(200).json({
           email:user[0].email,
           firstname:user[0].firstname,
           lastname:user[0].lastname,
           mobile:user[0].mobile_no,
           userProfile:user[0].userProfile
        });
    }).catch(error=>{
        response.status(409).json({
            error:error
        });
    });
};