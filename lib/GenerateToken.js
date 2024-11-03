const jwt = require("jsonwebtoken");  

const generateTokenAndSetCookies = (userId, res) => {  
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  
        expiresIn: '15d',  
    });  
    res.cookie("jwt", token, {  
        maxAge: 15 * 24 * 60 * 60 * 1000,  
         httpOnly: true, // Prevents client-side JavaScript from accessing the cookie  
    secure: true,
      sameSite: 'none'  
    });  
}  


module.exports = { generateTokenAndSetCookies };  
