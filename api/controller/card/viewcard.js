const Card=require("../../model/card");
const User=require("../../model/register");
module.exports=(request,response,next)=>{
  User.find({email:request.body.email}).select(" cardnumber expiredate cardholdername").exec().then(user=>{
    if(user.length===1){
        Card.find({email:request.body.email}).exec().then(card=>{
            if(card.length===0){
               return response.status(404).json({
                    message:"No card found.Please add first"
                });
            }
            else{
            //  const cards={}
            //   for(let i=0;i<card.length;i++){
            //     cards.new(card[i]);
            //   }
               return response.status(200).json({
                    card:card
                });
            }
        });
    }
  })
}