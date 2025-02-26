const BaseErrors = require("../errors/base.error");
const tokenService = require("../services/token.service");

module.exports=(req,res,next)=>{
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken){
            return next(BaseErrors.BadAuthorization());  
        }
        const userData=tokenService.validateRefreshToken(refreshToken);
        if(!userData){
            return next(BaseErrors.BadAuthorization());
        }
        req.user=userData;
        next();
    } catch (error) {
        return next(BaseErrors.BadAuthorization());
    }
}