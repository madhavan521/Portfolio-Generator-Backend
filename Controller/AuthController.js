let generateTokenAndSetCookies = require('../lib/GenerateToken');
const User = require("../Schema/UserSchema")
const bcrypt = require('bcryptjs');
const signup = async(req,res)=>{   
    const {email, username, fullname, password} = req.body;
     try{  
        
// Username validation
     const verifyusername = await User.findOne({username})
     if(verifyusername){
        return res.status(400).send("Username is Already exist")
     }
//Email validation    
     const validateEmailRegex = /^\S+@\S+\.\S+$/;
     if(!validateEmailRegex.test(email)){
        return res.status(400).send("Inavlid Email")
     }
     const verifyEmail = await User.findOne({email})
     if(verifyEmail){
        return res.status(400).send("Email is Already exist")
     }
//Password validation
    if(password.length < 6)
        {
            return res.status(400).send("Password atleast have 6 characters")
         }
//hashPassword
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password , salt)


const newUser =  User({
    email,
    fullname,
    username,
    password:hashedPassword});

if(newUser){
  generateTokenAndSetCookies=(newUser._id , res)
  await newUser.save()
   res.status(200).send({
    _id:newUser._id,
    email:newUser.email,
    fullname:newUser.fullname,
    username:newUser.username,
    password:newUser.password,
    myworks:newUser.myworks,
    Intro:newUser.Intro
   })
}
else {
    res.status(200).send("Invalid User data")

}


         
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}
const login = async(req,res)=>{
    const { username ,password} = req.body
    try{  
        const userdata= await User.findOne({username})
         if(!userdata)
         {
            return res.status(400).send("Invalid username")
         }
         const isPasswordValid = await bcrypt.compare(password , userdata.password)
         if(!isPasswordValid){
             return res.status(400).send("Invalid  Password")
         }
         generateTokenAndSetCookies(userdata._id , res)
         res.status(200).json(     
            {    
                _id: userdata._id,      
                fullname:userdata.fullname,
                username:userdata.username,
                email: userdata.email,
                myworks:userdata.myworks,
                Intro:userdata.Intro
            })
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}
//LOGOUT
const logout = async(req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'Strict'
        });
        res.status(200).send("Logout Successfully");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};

const getMe = async (req, res) => {  
    try {  
        const user = await User.findById(req.user._id);  
        
        if (!user) {  
            return res.status(404).json({ message: "User not found" });  
        }  
        
        return res.status(200).json(user)
    } catch (err) {  
        console.error(err); 
        return res.status(500).json({ message: "Internal Server Error" });  
    }  
};
module.exports ={ signup,login,logout,getMe}