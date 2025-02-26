const authServices = require("../services/auth.service");

class AuthController{

    async signUp(req,res,next){
        try {
          const {username,email,password} = req.body;
          const user=await authServices.signUp(username,email,password);
          res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30 * 24 * 60 * 60 * 1000});
          return res.json(user);  
        } catch (error) {
            next(error);
        }
    }

    async signIn(req,res,next){
        try {
            const {email,password} = req.body;
            const user=await authServices.signIn(email,password);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30 * 24 * 60 * 60 * 1000});
            return res.json(user);  
          } catch (error) {
              next(error);
          }
    }

    async logOut(req,res,next){
        const {refreshToken} = req.cookies;
        await authServices.logOut(refreshToken);
        res.clearCookie("refreshToken");
        return res.json({success:true,message:"User soccessfully logout"});
    }

    async refresh(req,res,next){
        try {
            const  {refreshToken} = req.cookies;
            const user=await authServices.refresh(refreshToken);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30 * 24 * 60 * 60 * 1000});
            return res.json(user); 
        } catch (error) {
            next(error);
            console.log(error)
        }
    }

    async forgotPassword(req,res,next){
        try {
            const {email} = req.body;
            const user=await authServices.forgotPassword(email);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req,res,next){
        try {
            const {password,token} = req.body;
            const user=await authServices.resetPassword(password,token);
            return res.json(user);   
        } catch (error) {
            next(error);
        }
    }

    async googleAuth(req,res,next){
        try {
            const {user,tokens}=req.user;
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30 * 24 * 60 * 60 * 1000});
            return res.json({user,tokens});
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new AuthController();