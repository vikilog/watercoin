const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const registerRoute = require("./api/routes/auth/register");
const loginRoute = require("./api/routes/auth/login");
const showProfileRoute = require("./api/routes/profile/showprofile");
const uploadRoute = require("./api/routes/image/upload");
const addCardRoute=require("./api/routes/card/addcard");
const viewCardRoute=require("./api/routes/card/viewcard");
const deleteCardRoute=require("./api/routes/card/deletecard");
const updateProfileRoute=require("./api/routes/profile/updateprofile");
const addAccountRoute=require("./api/routes/account/addaccount");
const deleteAccountRoute=require("./api/routes/account/deleteaccount");
const updateAccountRoute=require("./api/routes/account/updateaccount");
const viewAccountRoute=require("./api/routes/account/viewaccount");
const app = express();

mongoose.connect("<host>/<db>", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("uploads"));

app.use("/auth/register", registerRoute);
app.use("/auth/login", loginRoute);

app.use("/user/profile", showProfileRoute);
app.use("/user/profile/update", updateProfileRoute);
app.use("/user/profile/update/image", uploadRoute);

app.use("/card/add",addCardRoute);
app.use("/card/view",viewCardRoute);
app.use("/card/delete",deleteCardRoute);

app.use("/account/add",addAccountRoute);
app.use("/account/delete",deleteAccountRoute);
app.use("/account/update",updateAccountRoute);
app.use("/account/view",viewAccountRoute);
//main
app.use("/",(request,response,next)=>{
    response.status(200).json({
        message:"Welcome to water coin"
    });
});







module.exports = app;