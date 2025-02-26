const BaseErrors = require("../errors/base.error");
const tokenService = require("../services/token.service");

module.exports=(req,res,next)=>{
    try {
        const authorization=req.headers;
        const {refreshToken}=req.cookies;
        if(!authorization){
            return next(BaseErrors.BadAuthorization());
        }
        const accessToken=authorization.split(" ")[1];
        if(!accessToken){
            return next(BaseErrors.BadAuthorization());
        }
        const userData=tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(BaseErrors.BadAuthorization());
        }
        req.user=userData;
        req.tokens={
            accessToken:accessToken,
            refreshToken:refreshToken
        }
        next();
    } catch (error) {
       return next(BaseErrors.BadAuthorization());
    }
}