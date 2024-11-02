const mongoose = require("mongoose")

const introductionSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:"true"
    },
    role:{
        type:String,
        required:"true"
    },
    resume:{
        type:String,
        required:"true"
    },
    github:{
        type:String,
        required:"true"
    },
    twitter:{
        type:String,
    },
    linkedin:{
        type:String,
        required:"true"
    },
    profileImg:{
        type:String,
        required:"true"
    },
    phoneNo:{
        type:String,
        required:"true"
    },
    email:{
        type:String,
        required:"true"
    },
    location:{
        type:String,
        required:"true"
    },
    dob:{
        type:String,
        required:"true"
    },

})

const Introduction = mongoose.model("Introduction" , introductionSchema);

module.exports = Introduction