const express = require("express");
const route = express.Router();
const viewCardContoller = require("../../controller/card/viewcard");
route.post("/", viewCardContoller);


module.exports = route;