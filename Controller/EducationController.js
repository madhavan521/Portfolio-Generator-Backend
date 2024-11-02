const Education =require('../Schema/EducationSchema')
const User = require('../Schema/UserSchema')
const createdata = async(req,res)=>{
    const { sslcYear,sslcSchool,sslcPercentage,
         hscYear,hscSchool,hscPercentage,
         ugStream,clgName,ugCgpa}=req.body
    try{

        const userId = req.user._id
        console.log(userId)
        const userdata = await User.findOne(userId)
        console.log(userdata)
        if(!userdata)
        {
            return res.status(404).send("Invalid User")
        }
        const newEducation  = await Education(
            { sslcYear,sslcSchool,sslcPercentage,
            hscYear,hscSchool,hscPercentage,
            ugStream,clgName,ugCgpa})
        await newEducation.save()
        await userdata.Education.push(newEducation)
        await userdata.save()
        res.status(201).send(newEducation)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}
const getdata = async(req,res)=>{
    try{
        const userId = req.user._id
        const userdata = await User.findById(userId).populate('Education')
        if(!userdata)
        {
            return res.status(404).send("Invalid User")
        }
        const getdata = await Education.findById(userdata.Education)
        res.status(200).send(getdata)

    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}
const updatedata = async(req,res)=>{
    const { sslcYear,sslcSchool,sslcPercentage,
        hscYear,hscSchool,hscPercentage,
        ugStream,clgName,ugCgpa}=req.body
    try{    
        const {id}=req.params

        const userId = req.user._id
        const userdata = await User.findById(userId).populate('Education')
        if(!userdata)
        {
            return res.status(404).send("Invalid User")
        }
        const update =({ sslcYear,sslcSchool,sslcPercentage,
            hscYear,hscSchool,hscPercentage,
            ugStream,clgName,ugCgpa})
        const updatedata = await Education.findByIdAndUpdate(id, update ,{
            new:"true" , runValidator:"true"
        })
        res.status(201).send(updatedata)

    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {createdata , getdata ,updatedata}