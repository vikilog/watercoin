# watercoin
web app #package 
1-express for server 
2-nodemon for automatic reloading of server when changes are made in file 
3-jsonwebtoken to generate token 
4-momgoose to connect mongodb 
5-card validator to verify card number 
6-bcrypt for hashing and password comperision 
7-multer for image uploading 
8-body-parser to parse the body of incoming request 
9-morgan for additional log on server

Here we go ...
This app contain following main feature now 
1 -- User can register and login into their profile 
2 -- User can update their profile detail 
3 -- User can add and delete card into their acoount
4--User can added their account,update account and delete

#Database 
Mongodb 
to connect localhost,pass your connection string in app.js 
for a cloud database,pass connection string in app.js and for security store your password inside env variable under DB_PASS key inside nodemon.js

#jsonwebtoken 
this app also use jsonwebtoken,to produce jwt token store your secret key inside nodemon.js

#port and host 
default is 80 and host is localhost

#to register
as a user you need following information
1 -email(required) 
2-password with one upper ,number ,special character and minimum length 8(required) 
3-first name 
4-last name 
5-mobile number-Number 
6-userProfile(have a default value)

#auth route
to register user make a post request to "/auth/register" and pass all the information of user into request body.
if user is register sucessfully it return a code 200 else 409.
Also only one email is assign to only one user.
if you try to register multiple user with same email then it will fail.Password is stored in hashed format

#to login 
make a post request to "<host>/auth/login" and pass email and password inside the body of request.
Once the request recived,first server will check email of user then compare the password with hased password.
if logedin,then server will return all the information of user like id,email,firstname,lastname,mobile and a token with expire time 1 hour

#profile update route
to update text data(except email and password) make a put request to "<host>/user/profile/update/<user's email as params>" and
all the information which you want to update inside the request body with properity and their value e.g {"firstname":"name"}.once email is varified then it update the data and return 200

to update profile image 
make a post request to "<host>/user/profile/update/image/" and send form data in which key is userProfile and value is your file.
server will save it into upload folder with name which is incoming file name.Once user is verified then it will update image of user

to view profile 
make post request to "<host>/user/profile" and email inside request body.
Once User is verified then it will return all the information of user

#card route
to add a card 
it will go through two security check.first it will validate user with email and password then it check for given card number that this card is present or not in database.
if it is then it will send 409.Once the card number is checked into database then it validate that number is valid or not.
if card is valid then card is added to database else 409 is returned . for that make post request to "<host>/card/add" and 
inside the body of request add following information 
1-email 
2-password 
3-cardnumber(Number) 
4-expiredate(String) 
5-cardholdername(String) 
Type of card is automatic validated by server and added to database

to view card 
make post request to "<host>/card/view" and email inside body.
In this route server first verify user after that it check card for that particular user and 
after validation return all the card associated with that user

to delete card
make delete request to "<host>/card/delete" and inside body pass email,password and cardnumber.
Again first user is verified than card verifed after that card is deleted

#account 
to view account
make post request to <host>/account/ and email inside request body.

to add a account
make post request to <host>/account/add and inside body or request pass
email,userId,accountnumber,alias,address.userId is given by server once user register 

to update account
make put request to <host>account/update/<email of user>/<accountnumber which you want to change>
and inside body of request pass all the updated value and properties e.g {"accountnumber:"new accountnumber","alias":"new"}

to delete account
make delete request to <host>/account/delete and in body of request pass email and accountnumber.




#Additional There are two middle ware which can be used for validation
1-check-auth - which can be used for verification of user's token 
2-check-image -whcih is used for incoming image to check their tpye and size 
for verification of token on any route just put check-auth inside that route where you want verification
