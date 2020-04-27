const express = require("express");
const route = express.Router();
const addCardContoller = require("../../controller/card/addcardcontroller");
route.post("/", addCardContoller);
module.exports = route;