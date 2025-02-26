const BaseError = require('../errors/base.error');
const User=require('../models/user.model');
const bcrypt=require('bcrypt')
const UserDTO=require('../dtos/user.dto');
const tokenService=require('./token.service');
const mailService = require('./mail.service');
class AuthService{

    async signUp(username,email,password){
        if(!username || !email || !password){
            throw BaseError.BadRequest("All fields are required");
        }
        const existUser=await User.findOne({email});
        if(existUser){
            throw BaseError.BadRequest("User already exist");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user=await User.create({username,email,password:hashedPassword});
        const userDto=new UserDTO(user);
        await mailService.sendMail(userDto.email);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {userDto,...tokens};
    }

    async signIn(email,password){
        if(!email || !password){
            throw BaseError.BadRequest("All fields are required");
        }
        const user=await User.findOne({email});
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            throw BaseError.BadRequest("Password incorrect");
        }
        const userDto=new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {userDto,...tokens};
    }
    async logOut(refreshToken){
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw BaseError.BadAuthorization();
        }
        const userPayload=tokenService.validateRefreshToken(refreshToken);
        const tokenDb=await tokenService.findToken(refreshToken);
        if(!userPayload || !tokenDb){
            throw BaseError.BadAuthorization();
        }
        const user=await User.findById(userPayload.id);
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const userDto=new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {userDto,...tokens};
    }

    async forgotPassword(email){
        if(!email){
            throw BaseError.BadRequest("Email is required");
        }
        const user=await User.findOne({email});
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const userDto=new UserDTO(user);
        const token=tokenService.generateTokens({...userDto});
        await mailService.sendForgotPassword(email,`${process.env.CLIENT_URL}/reset-password?token=${token.accessToken}`);
        return {success:true,message:"Reset password link sent to your email"};
    }

    async resetPassword(password,token){
        if(!password || !token){
            throw BaseError.BadRequest("All fields are required");
        } 
        const userPayload=tokenService.validateAccessToken(token);
        if(!userPayload){
            throw BaseError.BadRequest("Invalid token");
        }
        const user=await User.findById(userPayload.id);
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        if(password.length<8){
            throw BaseError.BadRequest("Password must be at least 8 characters long");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        user.password=hashedPassword;
        await user.save();
        await tokenService.removeToken(token);
        return {success:true,message:"Password Reset Successfully"};
    }
}
module.exports=new AuthService();