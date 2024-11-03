const http = require("http")
const express=require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
//modules
const DatabaseConnection = require("./Database/DatabaseConnection")
const authrouter = require('./Router/AuthRouter')
const introductionrouter = require('./Router/IntroductionRouter')
const aboutmerouter = require("./Router/AboutmeRouter")
const educationrouter = require('./Router/EducationRouter')
const skillrouter = require("./Router/SkillRouter")
const projectrouter = require("./Router/ProjectRouter")

//MiddleWare
app.use(express.json())
app.use(cors({
    origin:"https://portfolio-generator-frontend-xi.vercel.app",
    credentials:true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use('/api/auth' , authrouter)
app.use("/api/user" , introductionrouter)
app.use("/api/user" , aboutmerouter)
app.use("/api/user" , educationrouter)
app.use("/api/user", skillrouter)
app.use("/api/user" , projectrouter)


// Database Connection

DatabaseConnection();

// Server Connection

const server = http.createServer(app)
server.listen(PORT ,()=>{
    console.log("Sever started listing")
})
