const User = require("../../model/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports=(request, response, next) => {
    User.find({ email: request.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return response.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(request.body.password, user[0].password, (err, result) => {
          if (err) {
            return resonse.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return response.status(200).json({ 
              id:user[0]._id,             
              token: token,
              email:user[0].email,
              firstname:user[0].firstname,
              lastname:user[0].lastname,
              mobile:user[0].mobile_no,
              userProfile:user[0].userProfile
            });
          }
          response.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };