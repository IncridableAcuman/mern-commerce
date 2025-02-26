const projectService = require("../services/project.service");

class ProjectController{

    async createProject(req,res,next){
        try {
            const {title,description,picture} = req.body;
            const {id} = req.user;
            const project=await projectService.createProject(title,description,picture,id);
            return res.json(project);
        } catch (error) {
            next(error);
            console.log(error)
        }
    }

    async getAllProjects(req,res,next){
        try {
            const project = await projectService.getAllProjects();
            return res.json(project);
        } catch (error) {
            next(error);
        }
    }

    async getProjectById(req,res,next){
        try {
            const {id} = req.params;
            const project=await projectService.getProjectById(id);
            return res.json(project);
        } catch (error) {
            next(error);
        }
    }

    async updateProject(req,res,next){
        try {
            const {id} = req.params;
            const {title,description,picture} = req.body;
            const project = await projectService.updateProject(id,title,description,picture);
            return res.json(project);
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req,res,next){
        try {
            const {id} = req.params;
            const project=await projectService.deleteProject(id);
            return res.json(project);
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new ProjectController();