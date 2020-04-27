const bcrypt = require("bcrypt");
const mongooes = require("mongoose");
const Card = require("../../model/card");
const User = require("../../model/register");
const validator=require("card-validator");

module.exports=(request,response,next)=>{

    User.find({ email: request.body.email }).exec().then(user => {
        if (user.length > 1) {
            return response.status(409).json({
                message: "Failed to add card"
            });
        }
        bcrypt.compare(request.body.password, user[0].password, (err, result) => {
            if (result===false) {
               console.log("Wrong password");
               return response.status(409).json({
                message:"Wrong password",
                result:result
               });
            }

            if (result) {
                var validnumber=validator.number(request.body.cardnumber)
                if(validnumber.card){
                    Card.find({cardnumber:request.body.cardnumber}).exec().then(card=>{
                        if(card.length>=1){
                            return response.status(409).json({
                                message:"Card Already Exists.Please try with different card"
                            });
                        }
                        const mycard = new Card({
                            _id: new mongooes.Types.ObjectId,
                            cardnumber: request.body.cardnumber,
                            expiredate: request.body.expiredate,
                            cardholdername: request.body.cardholdername,
                            userId: request.body.userId,
                            email: request.body.email,
                            type:validnumber.card.type
                        });
                        mycard.save().then(card=>{
                            response.status(200).json({                          
                                message:"Card added Sucessfully"
                            });
                        }).catch(error=>{
                            response.status(500).json({
                                message:"Failed to add card.Try Again",
                                error:error
                            });
                        });
    
                    }).catch(error=>{
                        return response.status(500).json({
                            error:error
                        });
                    });
                }
                else{
                    return response.status(404).json({
                        message:"Invalid card"
                    });
                }
              
                
                
            }
        });


    }).catch(error => {
        response.status(409).json({
            error: error,
            message: "User not found"
        });
    });
};