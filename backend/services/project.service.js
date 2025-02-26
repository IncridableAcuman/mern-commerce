const Project = require("../models/project.model");
const User=require('../models/user.model');
const ProjectDTO = require('../dtos/project.dto');
const BaseErrors = require("../errors/base.error");
class ProjectService{

    async createProject(title,description,picture,id){
        const user = await User.findById(id);
        if(!user){
            throw BaseErrors.NotFound("User not found");
        }
        const project = await Project.create({title,description,picture,owner:user.id});
        const projectDto = new ProjectDTO(project);
        return projectDto;
    }

    async getAllProjects(){
        return await Project.find().populate('owner',"username email");
    }

    async getProjectById(id){
        const project = await Project.findById(id).populate('owner','username email');
        if(!project){
            throw BaseErrors.NotFound("Project not found!");
        }
        return new ProjectDTO(project);
    }

    async updateProject(id,title,description,picture){
        const project = await Project.findByIdAndUpdate(id,{title,description,picture},{new:true});
        if(!project){
            throw BaseErrors.NotFound("Project not found!");
        }
        return new ProjectDTO(project);
    }

    async deleteProject(id){
        const project=await Project.findByIdAndDelete(id);
        if(!project){
            throw BaseErrors.NotFound("Project not found!");
        }
        return "Project deleted Sucessfully"
    }
}
module.exports=new ProjectService();