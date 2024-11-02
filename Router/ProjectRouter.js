const express= require("express")
const protectRoute = require("../Middleware/ProtectRouter")
const { createdata, updatedata, getdata, deletedata ,getdataById } = require("../Controller/ProjectController")
const projectrouter = express.Router()

projectrouter.post('/project' , protectRoute ,createdata)
projectrouter.get('/project' , protectRoute ,getdata)
projectrouter.get('/project/:id' , protectRoute ,getdataById)
projectrouter.put('/project/:id' , protectRoute ,updatedata)
projectrouter.delete('/project/:id' , protectRoute ,deletedata)



module.exports = projectrouter