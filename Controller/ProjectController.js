const User = require('../Schema/UserSchema');
const Project = require("../Schema/ProjectSchema");

const createdata = async (req, res) => {
    const { projectName, projectDetail, projectImg, weblink, gitlink } = req.body;

    try {
        const userId = req.user._id;
        const userdata = await User.findById(userId);

        if (!userdata) {
            return res.status(404).send("Invalid User");
        }

        const newProject = new Project({
            projectName,
            projectDetail,
            projectImg,
            weblink,
            gitlink
        });

        await newProject.save();  
        userdata.Project.push(newProject);  
        await userdata.save(); 

        res.status(201).send(userdata); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

const getdata = async (req, res) => {
    try {
        const userId = req.user._id;
        const userdata = await User.findById(userId).populate('Project');  

        if (!userdata) {
            return res.status(404).send("Invalid User");
        }

        res.status(200).send(userdata.Project);  
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

const getdataById = async (req, res) => {
    const { id } = req.params;

    try {
        const userId = req.user._id;
        const userdata = await User.findById(userId);

        if (!userdata) {
            return res.status(404).send("Invalid User");
        }

        const getprojectdata = await Project.findById(id);
        if (!getprojectdata) {
            return res.status(404).send("Project not found");
        }

        res.status(200).send(getprojectdata);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

const updatedata = async (req, res) => {
    const { projectName, projectDetail, projectImg, weblink, gitlink } = req.body;

    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userdata = await User.findById(userId);

        if (!userdata) {
            return res.status(404).send("Invalid User");
        }

        const update = {
            projectName,
            projectDetail,
            projectImg,
            weblink,
            gitlink
        };

        const updatedProject = await Project.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });

        if (!updatedProject) {
            return res.status(404).send("Project not found");
        }

        const projectIndex = userdata.Project.findIndex(item => item._id.toString() === id);
        if (projectIndex !== -1) {
            userdata.Project[projectIndex] = updatedProject;
            await userdata.save();  
        }

        res.status(200).send(updatedProject);  
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

const deletedata = async (req, res) => {
    const { id } = req.params;

    try {
        const userId = req.user._id;
        const userdata = await User.findById(userId);

        if (!userdata) {
            return res.status(404).send("Invalid User");
        }

        await Project.findByIdAndDelete(id)
  userdata.Project = userdata.Project.filter(project => project._id.toString() !== id);  
  await userdata.save(); 
  res.status(200).send("Deleted Successufully")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { createdata, getdata, updatedata, deletedata, getdataById };
