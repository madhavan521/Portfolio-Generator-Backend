const Introduction = require('../Schema/IntroductionSchema')
const User = require('../Schema/UserSchema')

const createdata=async(req,res)=>{

  const {fullname,role,resume,github,twitter,linkedin,profileImg,phoneNo,email,location,dob} = req.body
  try{
    const UserId = req.user._id
     const userdata =await User.findOne(UserId).populate("Intro")
     if(!userdata){
      return res.status(404).send("No User Found Invalid Access")
     }

     const newCreate = await Introduction({fullname,role,resume,github,twitter,linkedin,profileImg,phoneNo,email,location,dob})
     await newCreate.save()
     await userdata.Intro.push(newCreate._id)
     await userdata.save()
     res.status(201).send(userdata)
  }
  catch(err){
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
}

const getdata=async(req,res)=>{
  try{
    const UserId = req.user._id
     const userdata =await User.findOne(UserId).populate('Intro')
     if(!userdata){
      return res.status(404).send("No User Found Invalid Access")
     }
     const getdata = await Introduction.findById(userdata.Intro)
     res.status(200).send(getdata)
  }
  catch(err){
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
}

const updatedata = async(req,res)=>{
 const {fullname,role,resume,github,twitter,linkedin,profileImg,phoneNo,email,location,dob} = req.body
 const {id}=req.params
  try{
    const UserId = req.user._id
     const userdata =await User.findOne(UserId).populate('Intro')
     if(!userdata){
      return res.status(404).send("No User Found Invalid Access")
     }
     const update = ({fullname,role,resume,github,twitter,linkedin,profileImg,phoneNo,email,location,dob})
     const updatedata = await Introduction.findByIdAndUpdate(id , update , {
      new:"true",runValidator:"true"
     })
     res.status(200).send(updatedata)
  }
  catch(err){
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
}

module.exports ={ createdata ,getdata , updatedata}
