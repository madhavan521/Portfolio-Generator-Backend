const express = require("express");
const protectRoute = require("../Middleware/ProtectRouter");
const { createdata, getdata, updatedata } = require("../Controller/AboutmeController");
const aboutmerouter = express.Router()

//
aboutmerouter.post('/aboutme',protectRoute, createdata)
aboutmerouter.get('/aboutme',protectRoute, getdata)
aboutmerouter.put('/aboutme/:id',protectRoute, updatedata)

module.exports = aboutmerouter;