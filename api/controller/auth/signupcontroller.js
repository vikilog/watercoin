const mongoose = require("mongoose");
const User = require("../../model/register");
const bcrypt = require("bcrypt");

module.exports=(request, response, next) => {
    User.find({ email: request.body.email }).exec().then(user => {        
        if (user.length >= 1) {
            return response.status(409).json({
                message: "A User with this email already exits.Please try with different email"
            });
        }
        else {
            bcrypt.hash(request.body.password, 10, (error, hash) => {
                if (error) {
                   return response.status(500).json({
                        message: "Failed to create user.Please try again later"
                    });
                }
                else {

                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        firstname: request.body.firstname,
                        lastname: request.body.lastname,
                        email: request.body.email,
                        password: hash,
                        mobile_no: request.body.mobile_no,                        
                    });
                    user.save().then(result => {
                        response.status(200).json({
                            message: "User created suceesfully"
                        });
                    }).catch(error => {
                        response.status(500).json({
                            message: error,

                        });
                    })
                }
            });
        }
    }).catch(error => {
        response.status(409).json({
            message: "Failed to create user.Please try again",
            error: error
        });
    });

};