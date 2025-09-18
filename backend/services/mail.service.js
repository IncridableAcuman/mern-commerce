const nodemailer=require('nodemailer');
class MailService{
    constructor(){
        this.transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS
            }
        });
    }
    async sendMail(email){
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:email,
            subject:"Your registration is successful",
            text:"Welcome to website"
        });
    }

    async sendForgotPassword(email,link){
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:email,
            subject:"Reset Password",
            text:`To reset your password, fallow this link: ${link}`
        });
    }
}
module.exports=new MailService();