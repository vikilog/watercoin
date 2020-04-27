const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cardnumber: {
        type: Number,
        required: true
    },
    expiredate:{
        type:String,
        required:true
    },
    type:String,
    cardholdername:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Card', cardSchema);