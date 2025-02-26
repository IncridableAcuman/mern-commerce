const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const User=require('../models/user.model');
const tokenService=require('../services/token.service');
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:"/api/auth/google/callback"
        },
        async (accessToken,refreshToken,profile,done)=>{
            try {
                let user=await User.findOne({googleId:profile.id});
                if(!user){
                    user=new User({
                        googleId:profile.id,
                        username:profile.displayName,
                        email:profile.emails[0].value,
                        profilePic:profile.photos[0].value
                    });
                   const tokens=tokenService.generateTokens({...user});
                   await tokenService.saveToken(user.id,tokens.refreshToken);
                   return done(null,{user,tokens});
                }
                   const tokens=tokenService.generateTokens({...user});
                   await tokenService.saveToken(user.id,tokens.refreshToken);
                   return done(null,{user,tokens});
            } catch (error) {
                return done(error,null);
            }
        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
});
passport.deserializeUser(async (done,id)=>{
    const user=await User.findById(id);
    done(null,user);
})