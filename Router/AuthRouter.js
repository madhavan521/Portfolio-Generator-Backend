const express = require("express")
const authrouter = express.Router()
const{ signup ,login ,logout, getMe }= require("../Controller/AuthController")
const protectRoute = require("../Middleware/ProtectRouter")

authrouter.post('/signup', signup)
authrouter.post('/login', login)
authrouter.post('/logout', logout)
authrouter.get('/me',protectRoute , getMe)

module.exports = authrouter
