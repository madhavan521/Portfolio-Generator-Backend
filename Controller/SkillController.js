const Skill = require("../Schema/SkillSchema")
const User = require("../Schema/UserSchema")


const createdata = async (req, res) => {  
    const { name, image} = req.body;  
    try {  
        const userId = req.user._id;  
        console.log(userId);  
        const userdata = await User.findById(userId).populate("Skill")  
        
        if (!userdata) {  
            return res.status(404).send("Invalid User");  
        }  

        const newSkill = new Skill({ name, image} ); 
        await newSkill.save()
        await userdata.Skill.push(newSkill)
        await userdata.save()
        res.status(201).send(newSkill)

    } catch (err) {  
        console.error(err.message);  
        res.status(500).send("Internal Server Error");  
    }  
}
const getdata = async(req,res)=>{  
         try{
        const userId = req.user._id 
        const userdata = await User.findById(userId).populate("Skill")
        if(!userdata){
            return res.status(404).send("Invalid User")
        }
        const getdata = await Skill.find({})
        res.status(200).send(getdata)

    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}
const updatedata = async(req,res)=>{
    const { name, image} = req.body;  
  try{
        const userId = req.user._id 
        const {id}=req.params
        const userdata = await User.findById(userId).populate("Skill")
        if(!userdata){
            return res.status(404).send("Invalid User")
        }
        const update = ({ name, image} )
        const updatedata = await Skill.findByIdAndUpdate(id ,update ,{
            new:"true" , runValidator:"true"
        })
        res.status(201).send(updatedata)
        const userSkillIndex = userdata.Skill.findIndex(skill => skill._id.toString() === id);  
            userdata.Skill[userSkillIndex] = updatedata; 
            await userdata.save();
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
}

const deletedata= async(req,res)=>{  
    try{
        const {id}=req.params
   const userId = req.user._id 
   const userdata = await User.findById(userId).populate("Skill")
   if(!userdata){
       return res.status(404).send("Invalid User")
   }
  await Skill.findByIdAndDelete(id)
  userdata.Skill = userdata.Skill.filter(skill => skill._id.toString() !== id);  
  await userdata.save(); 
  res.status(200).send("Deleted Successufully")

}
catch(err){
   console.error(err.message)
   res.status(500).send("Internal Server Error")
}
}
module.exports={createdata , getdata ,updatedata,deletedata}