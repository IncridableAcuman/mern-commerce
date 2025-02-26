const {Router} = require('express');
const projectController = require('../controllers/project.controller');
const authMiddleware =require('../middlewares/auth.middleware');
const userAuthMiddleware = require('../middlewares/userAuth.middleware');
const router=Router();

router.post('/create',userAuthMiddleware,projectController.createProject);
router.get('/all-projects',userAuthMiddleware,projectController.getAllProjects);
router.get('/project-one/:id',userAuthMiddleware,projectController.getProjectById);
router.delete('/delete-project',userAuthMiddleware,projectController.deleteProject);
router.put('/update-project/:id',userAuthMiddleware,projectController.updateProject);

module.exports=router;