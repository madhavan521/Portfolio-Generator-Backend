const express = require("express");
const protectRoute = require("../Middleware/ProtectRouter");
const { createdata, getdata, updatedata } = require("../Controller/IntroductionController");
const introductionrouter = express.Router()

//
introductionrouter.post('/intro',protectRoute, createdata)
introductionrouter.get('/intro',protectRoute, getdata)
introductionrouter.put('/intro/:id',protectRoute, updatedata)

module.exports = introductionrouter;