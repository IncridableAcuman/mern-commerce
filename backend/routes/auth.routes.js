const {Router}=require('express');
const authController = require('../controllers/auth.controller');
const {body} =require('express-validator');
const passport=require('passport');

const router=Router();

router.post('/signup',body('email').isEmail(),body('password').isLength({min:8,max:1024}),authController.signUp);
router.post('/signin',body('email').isEmail(),body('password').isLength({min:8,max:1024}),authController.signIn);
router.post('/logout',authController.logOut);
router.get('/refresh',authController.refresh);
router.post('/forgot-password',body('email').isEmail(),body('password').isLength({min:8,max:1024}),authController.forgotPassword);
router.put('/reset-password',body('email').isEmail(),body('password').isLength({min:8,max:1024}),authController.resetPassword);
module.exports=router;