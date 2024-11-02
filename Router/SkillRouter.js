const express = require("express")
const protectRoute = require("../Middleware/ProtectRouter")
const { createdata, getdata, updatedata, deletedata } = require("../Controller/SkillController")
const skillrouter = express.Router()

skillrouter.post('/skill',protectRoute,createdata)
skillrouter.get('/skill',protectRoute,getdata)
skillrouter.put('/skill/:id',protectRoute,updatedata)
skillrouter.delete('/skill/:id',protectRoute,deletedata)


module.exports = skillrouter