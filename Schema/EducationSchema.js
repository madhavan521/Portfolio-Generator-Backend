const mongoose = require("mongoose")

const educationSchema = mongoose.Schema({
    sslcYear:{
        type:String,
        required:true
    },
    sslcSchool:{
        type:String,
        required:true
    },
    sslcPercentage:{
        type:String,
        required:true
    },
    hscYear:{
        type:String,
        required:true
    },
    hscSchool:{
        type:String,
        required:true
    },
    hscPercentage:{
        type:String,
        required:true
    },
    ugStream:{
        type:String,
        required:true
    },
    clgName:{
        type:String,
        required:true
    },
    ugCgpa:{
        type:String,
        required:true
    },

})

const Education = mongoose.model("Education",educationSchema);

module.exports = Education;