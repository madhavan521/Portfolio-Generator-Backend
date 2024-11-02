const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({  
    username: {  
        type: String,  
        required: true  
    },  
    fullname: {  
        type: String,  
        required: true  
    },  
    email: {  
        type: String,  
        required: true  
    },  
    password: {  
        type: String,  
        required: true  
    },  
    myworks: {  
        type: String,  
        default: ''  
    },  
    Intro: [{  
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Introduction",  
        default: [],  
    }],  
    Aboutme: [{  
        type: mongoose.Schema.Types.ObjectId,  
        ref: "About",  
        default: [],  
    }],  
    Education: [{  
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Education",  
        default: [] 
    }],  
    Skill: [{  
        type: Object,
        default:[]  
    }],  
    Project: [{  
        type: Object,  
       default:[] 
    }]  
});

const User = mongoose.model("User" , UserSchema)

module.exports = User;

