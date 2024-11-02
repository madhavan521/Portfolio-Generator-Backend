const About= require('../Schema/AboutSchema')
const User = require('../Schema/UserSchema')
const createdata= async(req,res)=>{
const {Aboutme} =req.body;
    try{

        const userId = req.user._id
        const userdata = await User.findById(userId)
        if(!userdata){
            return res.status(404).send("Invalid User")
        }
        const newAboutme = await About({Aboutme})
        await newAboutme.save()
        await userdata.Aboutme.push(newAboutme)
        await userdata.save()
        res.status(201).send(newAboutme)
     }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }

}
const getdata= async(req,res)=>{
    try{
        const userId = req.user._id
        const username = await User.findById(userId).populate("Aboutme")
        if(!username){
            return res.status(404).send("Invalid User")
        }
        const getdata = await About.findById(username.Aboutme)
       res.status(200).send(getdata)
    }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }

}
const updatedata= async(req,res)=>{
    const {Aboutme} = req.body   
     const { id }=req.params

    try{
        const userId = req.user._id
        const username = await User.findOne(userId)
        if(!username){
            return res.status(404).send("Invalid user")
        }
   const update ={ Aboutme }
   const updatedata = await About.findByIdAndUpdate(id , update , {
    new:"true",runValidator:"true"
   })

   res.status(200).send(updatedata)

    }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }

}

module.exports = {createdata,getdata,updatedata}