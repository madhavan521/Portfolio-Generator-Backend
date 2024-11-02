const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({
    projectName:{
        type:String
    },
    projectDetail:{
        type:String
    },
    projectImg:{
        type:String
    },
    weblink:{
        type:String
    },
    gitlink:{
        type:String
    }
})

const Project = mongoose.model("Project",projectSchema);

module.exports = Project