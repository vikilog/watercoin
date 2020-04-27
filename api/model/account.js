const mongoose=require("mongoose");

const accountSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    accountnumber:{type:String,required:true},
    alias:{type:String,required:true},
    address:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    email:{type:String,required:true}
});

module.exports=mongoose.model("Account",accountSchema);