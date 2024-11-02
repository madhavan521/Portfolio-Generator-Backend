const express =require("express");
const protectRoute = require("../Middleware/ProtectRouter");
const { createdata, getdata, updatedata } = require("../Controller/EducationController");
const educationrouter = express.Router()


educationrouter.post('/education' , protectRoute ,createdata )
educationrouter.get('/education' , protectRoute ,getdata )
educationrouter.put('/education/:id' , protectRoute ,updatedata)





module.exports = educationrouter;